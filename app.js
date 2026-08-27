const express = require("express");
const app = express();

const connectDB = require("./config/db");
const productRoutes = require("./route/product.route");
const menuRoutes = require("./route/menu.route");
const OrderRoutes = require("./route/order.route");
const userRoutes = require("./route/user.route");

const helmet = require("helmet");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/api", productRoutes);
app.use("/api", menuRoutes);
app.use("/api", OrderRoutes);
app.use("/api/users", userRoutes);

connectDB();

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Le serveur tourne actuellement sur le port ${PORT}`);
});