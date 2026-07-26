import api from "./api";

export const createOrder = async (orderData) => {
  const response = await api.post("/api/orders", orderData);
  return response.data;
};

export const getMyOrders = async () => {
  const response = await api.get("/api/orders/user");
  return response.data;
};

export const getOrdersByMerchant = async () => {
  const response = await api.get("/api/orders/merchant");
  return response.data;
};

export const getAllOrders = async () => {
  const response = await api.get("/api/orders");
  return response.data;
};

export const getOrderById = async (id) => {
  const response = await api.get(`/api/orders/${id}`);
  return response.data;
};

export const cancelOrder = async (id) => {
  const response = await api.patch(`/api/orders/${id}/cancel`);
  return response.data;
};

export const confirmOrder = async (id, status) => {
  const response = await api.put(`/api/orders/${id}/confirm`, { status });
  return response.data;
};

export const updateOrderStatus = async (id, status) => {
  const response = await api.put(`/api/orders/${id}/status`, { status });
  return response.data;
};

export const payViaCash = async (id) => {
  const response = await api.put(`/api/orders/${id}/payment/cash`);
  return response.data;
};

export const payViaKhalti = async (id) => {
  const response = await api.put(`/api/orders/${id}/payment/khalti`);
  return response.data;
};

export const deleteOrder = async (id) => {
  const response = await api.delete(`/api/orders/${id}`);
  return response.data;
};
