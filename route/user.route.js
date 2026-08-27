const express = require("express");

const router = express.Router();

const { registerUser, loginUser } = require("../controllers/auth.controller");

const User = require("../models/user.models");

const { authenticate,isAdmin } = require("../middlewares/auth.middlewares");

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/",authenticate,isAdmin,async (req, res) => {
    try {
      const users = await User.find().select("-password");

      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({
        message: "Erreur serveur",
      });
    }
  }
);

module.exports = router;