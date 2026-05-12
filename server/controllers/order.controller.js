import {
  createOrderService,
  getMyOrdersService,
  getSingleOrderService,
} from "../services/order.service.js";

export const createOrder = async (req, res) => {
  try {

    const order = await createOrderService(
      req.user.id,
      req.body
    );

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: order,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMyOrders = async (req, res) => {
  try {

    const orders = await getMyOrdersService(
      req.user.id
    );

    res.status(200).json({
      success: true,
      data: orders,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getSingleOrder = async (req, res) => {
  try {

    const order = await getSingleOrderService(
      req.params.id
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};