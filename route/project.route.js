const express = require("express");
const { getProjects } = require("../controllers/project.controllers.Js");
const router = express.Router();

router.get("/projects", getProjects);

module.exports = router;