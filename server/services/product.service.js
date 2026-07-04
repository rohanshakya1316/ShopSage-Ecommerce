import Product from "../models/Product.js";
import ProductVariant from "../models/ProductVariant.js";

const createProduct = async (vendorId, productData) => {
  const {
    productName,
    urlSlug,
    descriptionShort,
    descriptionLong,
    price,
    stock,
    catId,
    status,
  } = productData;

  // check if product with same slug already exists
  const existingProduct = await Product.findOne({ urlSlug });
  if (existingProduct) {
    throw new Error("Product with this slug already exists");
  }

  const product = await Product.create({
    vendorId: vendorId,
    catId,
    productName,
    urlSlug,
    descriptionShort,
    descriptionLong,
    price,
    stockQuantity: stock,
    status,
  });

  return product;
};

const getAllProducts = async () => {
  const products = await Product.find({ status: "active" })
    .populate({
      path: "catId",
      select: "categoryName urlSlug",
    })
    .populate({
      path: "vendorId",
      select: "businessName email",
    });

  return products;
};

const getProductById = async (productId) => {
  const product = await Product.findById(productId)
    .populate({
      path: "catId",
      select: "categoryName urlSlug",
    })
    .populate({
      path: "vendorId",
      select: "businessName email",
    });

  if (!product) {
    throw new Error("Product not found");
  }

  const variants = await ProductVariant.find({ productId });

  return { product, variants };
};

const updateProduct = async (productId, vendorId, updateData) => {
  const product = await Product.findById(productId);

  if (!product) {
    throw new Error("Product not found");
  }

  // check if this product belongs to the logged in vendor
  if (product.vendorId.toString() !== vendorId.toString()) {
    throw new Error("Not authorized to update this product");
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    productId,
    updateData,
    { new: true, runValidators: true },
  );

  return updatedProduct;
};

const deleteProduct = async (productId, vendorId) => {
  const product = await Product.findById(productId);

  if (!product) {
    throw new Error("Product not found");
  }

  // check if this product belongs to the logged in vendor
  if (product.vendorId.toString() !== vendorId.toString()) {
    throw new Error("Not authorized to delete this product");
  }

  await Product.findByIdAndDelete(productId);

  // delete all variants of this product
  await ProductVariant.deleteMany({ productId });

  return true;
};

const getMyProducts = async (vendorId) => {
  const products = await Product.find({ vendorId }).populate({
    path: "catId",
    select: "categoryName urlSlug",
  });

  return products;
};

export default {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getMyProducts,
};
