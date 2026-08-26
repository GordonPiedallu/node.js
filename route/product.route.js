const express = require("express");
const { getproducts } = require("../controllers/product.controllers.Js");
const router = express.Router();

router.get("/products", getproducts);

module.exports = router;