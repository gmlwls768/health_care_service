const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { poolPromise } = require("../model/index");

router.get("/", authMiddleware.isLoginStatus, async function (req, res, next) {
  try {
    const pool = await poolPromise;

    const { recordset } = await pool.query`SELECT weight, body_fat, protein_per_weight, recorded_at
    FROM inbody
    WHERE user_id = ${req.user}
      AND body_fat IS NOT NULL
      AND protein_per_weight IS NOT NULL
    ORDER BY recorded_at DESC;
    `;


    const Value = recordset
    // console.log(weightValue);
    if (Value !== undefined) {
      // 클라이언트에게 응답
        res.json({ Value });
    } else {
      res.status(404).json({ message: "Weight data not found for the user." });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
