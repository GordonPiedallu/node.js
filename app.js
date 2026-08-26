const express = require("express");
const app = express();
const connectDB = require("./config/db");
const projectRoutes = require("./route/project.route");
const helmet = require("helmet");
const dotenv = require("dotenv");
dotenv.config();

app.use(express.json());
app.use("/api", projectRoutes);
app.use(helmet());

connectDB();

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server actually running on port ${PORT}`);
});



