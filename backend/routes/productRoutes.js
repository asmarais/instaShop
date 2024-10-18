const express = require("express");
const {
  getAllProducts,
  getProductById,
  uploadProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const router = express.Router();

// Get all products
router.get("/product", getAllProducts);

// Get a product by ID
router.get("/products/:id", getProductById);

// Upload a new product
router.post("/uploadProduct", uploadProduct);

// Update an existing product
router.put("/products/:id", updateProduct);

// Delete a product
router.delete("/products/:id", deleteProduct);

module.exports = router;
