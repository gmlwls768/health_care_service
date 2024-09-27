const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { poolPromise } = require("../model/index");

router.post("/", authMiddleware.isLoginStatus, async function (req, res, next) {
  try {
    let {  desired_fat,
        desired_kg,
        diet_date,
        every_kcal,
        start_kcal } =
      req.body;
  
  
    const pool = await poolPromise;

    
    await pool.query`INSERT INTO diet (user_id, desired_body_fat, weekly_calorie_reduction, desired_kg, diet_date , start_kcal)
    VALUES
        (${req.user}, ${desired_fat}, ${every_kcal},${desired_kg}, ${diet_date}, ${start_kcal});
    

    `;

    res.json({ message: "Successfully data updated!" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
