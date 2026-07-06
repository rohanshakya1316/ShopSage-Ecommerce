import productService from "../services/product.service.js";

const getHomeView = (req, res) => {
  const userName = "Customer User";

  res.render("index.hbs", {
    userName,
  });
};

const getProductsView = async (req, res) => {
  const products = await productService.getAllProducts({});

  res.render("products.hbs", {
    products,
  });
};

const getProductByIdView = async (req, res) => {
  const product = await productService.getProductById(req.params.id);

  res.render("product.hbs", {
    product,
  });
};

export default { getHomeView, getProductsView, getProductByIdView };
