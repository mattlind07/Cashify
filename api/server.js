require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

// Routing
const userRoutes = require("./routes/users");
const transactionRoutes = require("./routes/transactions");



app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));


// Api endpoints
app.use("/api/users", userRoutes);
app.use("/api/transactions", transactionRoutes);
// login and register are handled by the /api/users router now





const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log('Server starting'));




