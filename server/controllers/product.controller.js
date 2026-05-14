import productService from "../services/product.service.js";

const createProduct = async (req, res) => {
  try {
    if (!req.user.role.includes("VENDOR")) {
      return res
        .status(403)
        .json({ message: "Only vendors can create products" });
    }

    const product = await productService.createProduct(req.user._id, req.body);

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
    const products = await productService.getAllProducts();

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
    const { product, variants } = await productService.getProductById(
      req.params.id,
    );

    res.status(200).json({
      message: "Product fetched successfully",
      product,
      variants,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await productService.updateProduct(
      req.params.id,
      req.user._id,
      req.body,
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
    await productService.deleteProduct(req.params.id, req.user._id);

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

    const products = await productService.getMyProducts(req.user._id);

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
