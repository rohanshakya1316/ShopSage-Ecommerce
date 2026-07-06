import fs from "fs/promises";
import Product from "../models/Product.js";
import uploadFile from "../utils/fileUploader.js";
import { PRODUCT_DESCRIPTION_PROMPT } from "../constants/productPrompt.js";
import promptAI from "../utils/geminiAI.js";

const getAllProducts = async (query) => {
  const sort = query?.sort ? JSON.parse(query.sort) : {};
  const limit = query?.limit ?? 50;
  const offset = query?.offset ?? 0;

  const filters = {};
  const { category, brands, name, min, max, createdBy } = query;

  if (category) filters.category = category;
  if (brands) filters.brand = { $in: brands.split(",") };
  if (name) filters.name = { $regex: name, $options: "i" };
  if (min) filters.price = { $gte: min };
  if (max) filters.price = { ...filters.price, $lte: max };

  if (createdBy) filters.createdBy = createdBy;

  console.log(filters);
  const products = await Product.find(filters)
    .sort(sort)
    .limit(limit)
    .skip(offset);
  return products;
};

const getFirstProduct = async () => {
  const products = await fs.readFile("./src/data/products.json", "utf8");
  return JSON.parse(products)[0];
};

const getProductById = async (id) => {
  const product = await Product.findById(id);

  return product;
};

const getAllBrands = async () => {
  return await Product.distinct("brand");
};

const getCategories = async () => {
  return await Product.distinct("category");
};

const getTotalCount = async () => {
  return await Product.countDocuments();
};

const createProduct = async (data, files, userId) => {
  const uploadedFiles = await uploadFile(files);

  const promptMessage = PRODUCT_DESCRIPTION_PROMPT.replace("%s", data.name)
    .replace("%s", data.category)
    .replace("%s", data.brand);

  const description = data.description ?? (await promptAI(promptMessage));
  return await Product.create({
    ...data,
    description,
    imageUrls: uploadedFiles.map((file) => file.url),
    createdBy: userId,
  });
};

const updateProduct = async (id, input, files) => {
  const updateData = input;

  if (files && files.length > 0) {
    const uploadedFiles = await uploadFile(files);

    updateData.imageUrls = uploadedFiles.map((file) => file.url);
  }

  return await Product.findByIdAndUpdate(id, updateData, {
    returnDocument: "after",
  });
};

const deleteProduct = async (id) => {
  await Product.findByIdAndDelete(id);
};

export default {
  getAllProducts,
  getFirstProduct,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllBrands,
  getCategories,
  getTotalCount,
};
