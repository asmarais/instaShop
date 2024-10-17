const express = require("express");
const {
  getAllProducts,
  uploadProduct,
} = require("../controllers/productController");
const router = express.Router();

router.get("/product", getAllProducts);
router.post("/uploadProduct", uploadProduct);

module.exports = router;
