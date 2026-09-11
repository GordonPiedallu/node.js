const express = require("express");

const router = express.Router();

const { authenticate } = require("../middlewares/auth.middlewares");
const authorizeRoles = require("../middlewares/role.middlewares");
const orderController = require("../controllers/order.controller");

router.post("/orders", authenticate, authorizeRoles("client"), orderController.createOrder);

router.get("/orders", authenticate, authorizeRoles("admin"), orderController.getOrders);

router.get("/orders/:id", authenticate, authorizeRoles("admin", "préparateur"), orderController.getOrder);

router.put("/orders/:id", authenticate, authorizeRoles("préparateur"), orderController.updateOrder);

router.delete("/orders/:id", authenticate, authorizeRoles("admin"), orderController.deleteOrder);

module.exports = router;