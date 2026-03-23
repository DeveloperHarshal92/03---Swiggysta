const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRoutes = require("./routes/auth.routes");
const foodRouter = require("./routes/food.routes");
const foodPartnerRoutes = require("./routes/food-partner.routes")

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/food", foodRouter);
app.use("/api/food-partner",foodPartnerRoutes)

module.exports = app;
