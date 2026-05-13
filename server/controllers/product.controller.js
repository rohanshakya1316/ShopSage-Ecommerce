import Product from "../models/Product.js";
import ProductVariant from "../models/ProductVariant.js";

const createProduct = async (req, res) => {
  try {
    if (!req.user.role.includes("VENDOR")) {
      return res
        .status(403)
        .json({ message: "Only vendors can create products" });
    }

    const {
      productName,
      urlSlug,
      descriptionShort,
      descriptionLong,
      price,
      stockQuantity,
      catId,
      status,
    } = req.body;

    const existingProduct = await Product.findOne({ urlSlug });
    if (existingProduct) {
      return res
        .status(400)
        .json({ message: "Product with this slug already exists" });
    }

    const product = await Product.create({
      vendorId: req.user._id,
      catId,
      productName,
      urlSlug,
      descriptionShort,
      descriptionLong,
      price,
      stockQuantity,
      status,
    });

    res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({ status: "active" })
      .populate("catId", "categoryName urlSlug")
      .populate("vendorId", "name email");

    res.status(200).json({
      message: "Products fetched successfully",
      totalProducts: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("catId", "categoryName urlSlug")
      .populate("vendorId", "name email");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const variants = await ProductVariant.find({ productId: req.params.id });

    res.status(200).json({
      message: "Product fetched successfully",
      product,
      variants,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.vendorId.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this product" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    );

    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.vendorId.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this product" });
    }

    await Product.findByIdAndDelete(req.params.id);
    await ProductVariant.deleteMany({ productId: req.params.id });

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMyProducts = async (req, res) => {
  try {
    if (!req.user.role.includes("VENDOR")) {
      return res
        .status(403)
        .json({ message: "Only vendors can view their products" });
    }

    const products = await Product.find({ vendorId: req.user._id }).populate(
      "catId",
      "categoryName urlSlug",
    );

    res.status(200).json({
      message: "Your products fetched successfully",
      totalProducts: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getMyProducts,
};
