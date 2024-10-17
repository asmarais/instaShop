const Product = require("../models/productModel");

const getAllProducts = async (req, res) => {
  const products = await Product.find({});
  res.json(products);
};

const uploadProduct = async (req, res) => {
  const newProduct = new Product(req.body);
  await newProduct.save();
  res.send({ message: "Upload successfully" });
};

module.exports = { getAllProducts, uploadProduct };
