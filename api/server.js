require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

// Routing
const userRoutes = require("./routes/users");
const transactionRoutes = require("./routes/transactions");
const loginRoute = require("./routes/auth/login");
const registerRoute = require("./routes/auth/register");



app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));


// Api endpoints
app.use("/api/users", userRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/login", loginRoute);
app.use("/api/register", registerRoute);





const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log('Server starting'));




