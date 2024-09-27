const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { poolPromise } = require("../model/index");

router.get("/", authMiddleware.isLoginStatus, async function (req, res, next) {
  try {
    const pool = await poolPromise;

    /* const { recordset } = await pool.query`SELECT weight, recorded_at
    FROM inbody
    WHERE user_id = ${req.user}
    ORDER BY recorded_at ASC;
    `;*/

    const { recordset } = await pool.request()
      .input('userId', req.user) // 사용자 입력을 파라미터로 사용
      .query(`
        SELECT weight, recorded_at
        FROM inbody
        WHERE user_id IN (@userId)
        ORDER BY recorded_at ASC;
      `);
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
