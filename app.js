const express = require("express");
const app = express();
const connectDB = require("./config/db");
const productRoutes = require("./route/product.route");
const helmet = require("helmet");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

app.use(express.json());
app.use("/api", productRoutes);
app.use(helmet());
app.use(cors());

connectDB();

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server actually running on port ${PORT}`);
});



