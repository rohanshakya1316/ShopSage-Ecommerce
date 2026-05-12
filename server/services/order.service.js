import Order from "../models/Order.js";
import Product from "../models/Product.js";

export const createOrderService = async (userId, orderData) => {
  const {
    items,
    shippingId,
    discountAmt = 0,
    shippingAmt = 0,
    payMethod,
  } = orderData;

  if (!items || items.length === 0) {
    throw new Error("Order items are required");
  }

  let totalAmt = 0;

  const formattedItems = [];

  for (const item of items) {

    const product = await Product.findById(item.productId);

    if (!product) {
      throw new Error("Product not found");
    }

    if (product.stockQuantity < item.quantity) {
      throw new Error(
        `${product.productName} is out of stock`
      );
    }

    const itemTotal = product.price * item.quantity;

    totalAmt += itemTotal;

    formattedItems.push({
      productId: product._id,
      productVarId: item.productVarId || null,
      quantity: item.quantity,
      price: product.price,
    });

    
    product.stockQuantity -= item.quantity;

    
    if (product.stockQuantity === 0) {
      product.status = "out_of_stock";
    }

    await product.save();
  }

  const grossAmt = totalAmt - discountAmt;

  const netAmt = grossAmt + shippingAmt;

  const orderNo = `ORD-${Date.now()}`;

  const order = await Order.create({
    orderNo,
    userId,
    shippingId,
    items: formattedItems,
    totalAmt,
    discountAmt,
    grossAmt,
    shippingAmt,
    netAmt,
    payMethod,
  });

  return order;
};

export const getMyOrdersService = async (userId) => {
  return await Order.find({ userId })
    .populate("items.productId")
    .sort({ createdAt: -1 });
};

export const getSingleOrderService = async (orderId) => {
  return await Order.findById(orderId)
    .populate("items.productId");
};