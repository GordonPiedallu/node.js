const express = require("express");
const router = express.Router();

const productController = require("../controllers/product.controller");

router.post("/products", productController.createProduct);

router.get("/products", productController.getproducts);

router.get("/products/:id", productController.getproduct);

router.put("/products/:id", productController.updateproduct);

router.delete("/products/:id", productController.deleteproduct);

module.exports = router;