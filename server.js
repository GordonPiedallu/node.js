const app = require("./app");
const connectDB = require("./config/db");

connectDB();

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Le serveur tourne actuellement sur le port ${PORT}`);
});