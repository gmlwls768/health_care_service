const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { poolPromise } = require("../model/index");

router.get("/", authMiddleware.isLoginStatus, async function (req, res, next) {
  try {
    const pool = await poolPromise;

    /*const { recordset } = await pool.query`SELECT
        inbody.weight,
        inbody.body_fat,
        inbody.protein_per_weight,
        diet.desired_body_fat,
        diet.weekly_calorie_reduction,
        diet.recorded_at,
        diet.desired_kg,
        diet.start_kcal,
        diet.diet_date
      FROM inbody
      LEFT JOIN diet ON inbody.user_id = diet.user_id
      WHERE inbody.user_id = ${req.user}
      AND inbody.body_fat IS NOT NULL
      AND inbody.weight IS NOT NULL
      ORDER BY diet.recorded_at DESC;`;*/

    const { recordset } = await pool.query`SELECT * FROM diet_view WHERE user_id = ${req.user} ORDER BY recorded_at DESC;`;

    const Value = recordset;
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
