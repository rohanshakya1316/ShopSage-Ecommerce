import config from "@/config/config";
import axios from "axios";
import api from "./api";
import { formatParams } from "@/helpers/params";

export const getProducts = async (searchParams) => {
  const query = formatParams(searchParams);

  const response = await axios.get(
    `${config.apiUrl}/api/products?limit=100&${query}`,
  );

  return response.data;
};

export const getProductById = async (id) => {
  const response = await axios.get(`${config.apiUrl}/api/products/${id}`);
  return response.data;
};

export const addProduct = async (data) => {
  return await api.post(`/api/products`, data);
};

export const updateProduct = async (id, data) => {
  return await api.put(`/api/products/${id}`, data);
};

export const deleteProduct = async (id) => {
  return await api.delete(`/api/products/${id}`);
};

export const getCategories = async () => {
  const response = await axios.get(`${config.apiUrl}/api/products/categories`);
  return response.data;
};

export const getBrands = async () => {
  const response = await axios.get(`${config.apiUrl}/api/products/brands`);
  return response.data;
};

export const getRelatedProducts = async (category, currentId) => {
  const response = await fetch(
    `${config.apiUrl}/api/products?category=${encodeURIComponent(category)}`,
    { cache: "no-store" },
  );
  if (!response.ok) return [];

  const data = await response.json();
  const list = Array.isArray(data) ? data : data.products || [];

  return list.filter((p) => p._id !== currentId).slice(0, 3);
};
