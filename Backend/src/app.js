require("dotenv").config();

const cors = require("cors");
const express = require("express");
const path = require("path");
const adminRoutes = require("./routes/adminRoutes.js");
const healthRoutes = require("./routes/healthRoutes.js");
const publicRoutes = require("./routes/publicRoutes.js");
const { errorHandler, notFound } = require("./middleware/errorHandler.js");

const app = express();

app.set("trust proxy", 1);

const rawOrigins = process.env.FRONTEND_ORIGIN || "";
const allowedOrigins = rawOrigins.split(",").map((o) => o.trim()).filter(Boolean);

app.use(cors({
  origin: allowedOrigins.length
    ? (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error(`CORS: origin ${origin} not allowed`));
        }
      }
    : true,
  credentials: true,
}));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use("/assets", express.static(path.resolve(__dirname, "../public")));
app.use("/uploads", express.static(path.resolve(__dirname, "../public/uploads")));

app.use("/api", healthRoutes);
app.use("/api", publicRoutes);
app.use("/api/admin", adminRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
