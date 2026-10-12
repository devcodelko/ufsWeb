const pool = require("../config/db.js");
const { asyncHandler } = require("../utils/asyncHandler.js");

const healthCheck = asyncHandler(async (req, res) => {
  await pool.query("SELECT 1");
  res.json({
    ok: true,
    service: "ufs-digital-backend",
    database: "connected",
    timestamp: new Date().toISOString(),
  });
});

module.exports = { healthCheck };
