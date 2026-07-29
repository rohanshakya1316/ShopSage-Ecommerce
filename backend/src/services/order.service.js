import mongoose from "mongoose";
import {
  ORDER_STATUS_CANCELLED,
  ORDER_STATUS_CONFIRMED,
} from "../constants/orderStatus.js";
import {
  PAYMENT_METHOD_CASH,
  PAYMENT_METHOD_ONLINE,
  PAYMENT_STATUS_FAILED,
  PAYMENT_STATUS_SUCCESS,
} from "../constants/payment.js";
import Order from "../models/Order.js";
import Payment from "../models/Payment.js";
import { payViaKhalti } from "../utils/payment.js";
import userService from "./user.service.js";
import Product from "../models/Product.js";

const getOrders = async () => {
  const orders = await Order.find()
    .sort({ createdDate: -1 })
    .populate("user", "name email phone")
    .populate("orderItems.product", "name brand category price imageUrls");

  return orders.map((order) => ({
    _id: order._id,
    orderNumber: order.orderNumber,
    status: order.status,
    totalPrice: order.totalPrice,
    payment: order.payment || null,

    shippingAddress: {
      city: order.shippingAddress?.city,
      province: order.shippingAddress?.province,
      country: order.shippingAddress?.country,
    },

    createdDate: order.createdDate,

    orderUser: {
      _id: order.user?._id,
      name: order.user?.name,
      phone: order.user?.phone,
    },

    orderedProducts: order.orderItems.map((item) => ({
      _id: item.product?._id,
      name: item.product?.name,
      price: item.product?.price,
      brand: item.product?.brand,
      category: item.product?.category,
      imageUrls: item.product?.imageUrls,
      quantity: item.quantity,
    })),
  }));
};

const getOrderById = async (id) => {
  console.log("Received ID:", id);

  const order = await Order.findById(id)
    .populate("user", "name email phone")
    .populate("orderItems.product", "name brand category price imageUrls")
    .populate("payment", "transactionId amount method status");

  if (!order)
    throw {
      status: 400,
      message: "Order not Found.",
    };

  return order;
};

const createOrder = async (data, authUser) => {
  const user = await userService.getById(authUser._id, authUser);

  if (!data.shippingAddress) {
    data.shippingAddress = user.address;
  }

  const productIds = data.orderItems.map((item) => item.product);
  const products = await Product.find({ _id: { $in: productIds } });

  let totalPrice = 0;
  for (const item of data.orderItems) {
    const product = products.find(
      (p) => p._id.toString() === item.product.toString(),
    );
    if (!product) {
      throw {
        status: 400,
        message: `Product ${item.product} not found.`,
      };
    }
    totalPrice += product.price * item.quantity;
  }

  data.totalPrice = totalPrice;
  data.orderNumber = crypto.randomUUID();
  data.user = authUser._id;

  return await Order.create(data);
};

const updateOrderStatus = async (id, status) => {
  return await Order.findByIdAndUpdate(
    id,
    { status },
    { returnDocument: "after" },
  );
};

const cancelOrder = async (id) => {
  return await Order.findByIdAndUpdate(
    id,
    { status: ORDER_STATUS_CANCELLED },
    { returnDocument: "after" },
  );
};

const deleteOrder = async (id) => {
  await Order.findByIdAndDelete(id);
};

const confirmOrder = async (id, status) => {
  const order = await getOrderById(id);

  if (status?.toUpperCase() != PAYMENT_STATUS_SUCCESS) {
    await Payment.findByIdAndUpdate(order.payment, {
      status: PAYMENT_STATUS_FAILED,
    });

    throw {
      status: 400,
      message: "Payament Failed.",
    };
  }

  await Payment.findByIdAndUpdate(order.payment, {
    status: PAYMENT_STATUS_SUCCESS,
  });

  return await Order.findByIdAndUpdate(
    id,
    { status: ORDER_STATUS_CONFIRMED },
    { returnDocument: "after" },
  );
};

const getOrdersByUser = async (userId) => {
  return await Order.find({ user: userId })
    .sort({ createdDate: -1 })
    .populate("user", "name email phone")
    .populate("orderItems.product", "name brand category price imageUrls");
};

const getOrdersByMerchant = async (merchantId) => {
  return await Order.aggregate([
    // Unwind so each item keeps its own quantity while we look up its product
    { $unwind: "$orderItems" },

    {
      $lookup: {
        from: "products",
        localField: "orderItems.product",
        foreignField: "_id",
        as: "productDetails",
      },
    },
    { $unwind: "$productDetails" },

    // Keep only items whose product belongs to this merchant
    {
      $match: {
        "productDetails.createdBy": new mongoose.Types.ObjectId(merchantId),
      },
    },

    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "orderUser",
      },
    },
    { $unwind: "$orderUser" },

    // Re-group items back under their parent order
    {
      $group: {
        _id: "$_id",
        orderNumber: { $first: "$orderNumber" },
        status: { $first: "$status" },
        totalPrice: { $first: "$totalPrice" },
        payment: { $first: "$payment" },
        shippingAddress: { $first: "$shippingAddress" },
        createdDate: { $first: "$createdDate" },
        orderUser: { $first: "$orderUser" },
        orderedProducts: {
          $push: {
            _id: "$productDetails._id",
            name: "$productDetails.name",
            price: "$productDetails.price",
            brand: "$productDetails.brand",
            category: "$productDetails.category",
            imageUrls: "$productDetails.imageUrls",
            quantity: "$orderItems.quantity",
          },
        },
      },
    },

    { $sort: { createdDate: -1 } },

    {
      $project: {
        orderNumber: 1,
        status: 1,
        totalPrice: 1,
        payment: 1,
        shippingAddress: 1,
        createdDate: 1,
        "orderUser._id": 1,
        "orderUser.name": 1,
        "orderUser.phone": 1,
        orderedProducts: 1,
      },
    },
  ]);
};

const orderPaymentViaCash = async (id) => {
  const order = await getOrderById(id);

  const orderPayment = await Payment.create({
    method: PAYMENT_METHOD_CASH,
    amount: order.totalPrice,
  });

  return await Order.findByIdAndUpdate(
    id,
    {
      status: ORDER_STATUS_CONFIRMED,
      payment: orderPayment.id,
    },
    {
      returnDocument: "after",
    },
  );
};

const orderPaymentViaKhalti = async (id) => {
  const order = await getOrderById(id);

  const orderPayment = await Payment.create({
    method: PAYMENT_METHOD_ONLINE,
    amount: order.totalPrice,
  });

  await Order.findByIdAndUpdate(id, {
    payment: orderPayment.id,
  });

  const response = await payViaKhalti({
    id: id,
    amount: order.totalPrice,
    purchaseOrderId: order.orderNumber,
    purchaseOrderName: order.orderItems[0].product.name,
    customerInfo: {
      name: order.user.name,
      email: order.user.email,
      phone: order.user.phone,
    },
  });
  return response;
};

export default {
  getOrders,
  getOrderById,
  getOrdersByMerchant,
  getOrdersByUser,
  createOrder,
  deleteOrder,
  cancelOrder,
  confirmOrder,
  updateOrderStatus,
  orderPaymentViaCash,
  orderPaymentViaKhalti,
};
