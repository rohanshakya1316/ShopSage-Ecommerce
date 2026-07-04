import Category from "../models/Category.js";

export const createCategory = async (req, res) => {
  try {
    const { categoryName, urlSlug } = req.body;

    const category = await Category.create({ categoryName, urlSlug });

    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCategories = async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
};
