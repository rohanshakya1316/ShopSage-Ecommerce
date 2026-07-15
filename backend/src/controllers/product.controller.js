import productService from "../services/product.service.js";

const getAllProducts = async (req, res) => {
  const products = await productService.getAllProducts(req.query);

  res.json(products);
};

const getFirstProduct = async (req, res) => {
  const firstProduct = await productService.getFirstProduct();
  res.json(firstProduct);
};

const getProductById = async (req, res) => {
  const id = req.params.id;

  const product = await productService.getProductById(id);

  if (!product) {
    return res.status(404).json({ message: "Product not found." });
  }

  res.json(product);
};

const getAllBrands = async (req, res) => {
  const brands = await productService.getAllBrands();

  res.json(brands);
};

const getCategories = async (req, res) => {
  const categories = await productService.getCategories();

  res.json(categories);
};

const getTotalCount = async (req, res) => {
  const count = await productService.getTotalCount();

  res.json(count);
};

const createProduct = async (req, res) => {
  const files = req.files;
  const userId = req.user._id;
  try {
    const newProduct = await productService.createProduct(req.body, files, userId);
    res.json(newProduct);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const input = req.body;
    const files = req.files;
    
    const updateProduct = await productService.updateProduct(id, input, files);
    res.json(updateProduct);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const deleteProduct = async (req, res) => {
  const id = req.params.id;
  try {
    await productService.deleteProduct(id, req.user);
    res.json({ message: "Product deleted Successfully!" });
  } catch (error) {
    res.status(400).send(error.message);
  }
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
