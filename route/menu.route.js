const express = require("express");
const router = express.Router();

const menuController = require("../controllers/menu.controller");

router.post("/menus", menuController.createMenu);

router.get("/menus", menuController.getMenus);

router.get("/menus/:id", menuController.getMenu);

router.put("/menus/:id", menuController.updateMenu);

router.delete("/menus/:id", menuController.deleteMenu);

module.exports = router;