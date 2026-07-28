import api from "./api";

export const getOrdersById = async (id) => {
  return await api.get(`/api/orders/${id}`);
};

export const getAllOrders = async () => {
  return await api.get(`/api/orders`);
};

export const getOrdersByMerchant = async () => {
  return await api.get(`/api/orders/merchant`);
};

export const getOrdersByUser = async () => {
  return await api.get(`/api/orders/user`);
};

export const createOrder = async (data) => {
  return await api.post(`/api/orders`, data);
};

export const cancelOrder = async (id) => {
  return await api.patch(`/api/orders/${id}/cancel`);
};

export const payViaKhalti = async (id) => {
  return await api.put(`/api/orders/${id}/payment/khalti`);
};

export const payViaCash = async (id) => {
  return await api.put(`/api/orders/${id}/payment/cash`);
};

export const confirmOrder = async (id, status) => {
  return await api.put(`/api/orders/${id}/confirm`, { status: status });
};

export const deleteOrder = async (id) => {
  return await api.delete(`/api/orders/${id}`);
};

export const updateOrderStatus = async (id, status) => {
  return await api.put(`/api/orders/${id}/status`, { status: status });
};
