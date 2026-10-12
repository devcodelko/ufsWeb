require("dotenv").config();

const app = require("./app.js");
const pool = require("./config/db.js");

const port = parseInt(process.env.PORT, 10) || 5000;

console.log("[STARTUP] NODE_ENV:", process.env.NODE_ENV);
console.log("[STARTUP] PORT:", port);
console.log("[STARTUP] DB_HOST:", process.env.DB_HOST);
console.log("[STARTUP] DB_USER:", process.env.DB_USER);
console.log("[STARTUP] DB_NAME:", process.env.DB_NAME);

pool.getConnection()
  .then((conn) => {
    console.log("[STARTUP] Database connected successfully");
    conn.release();
  })
  .catch((err) => {
    console.error("[STARTUP] Database connection failed:", err.message);
  });

const server = app.listen(port, "0.0.0.0", () => {
  console.log("[STARTUP] Server listening on port", port);
});

server.on("error", (err) => {
  console.error("[STARTUP] Server error:", err.message);
  process.exit(1);
});
