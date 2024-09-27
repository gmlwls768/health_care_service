const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { poolPromise } = require("../model/index");

router.post("/", authMiddleware.isLoginStatus, async function (req, res, next) {
  try {
    let { weight, height, bmi, body_fat, protein_per_weight } =
      req.body;
  
    if (body_fat == ''){
      body_fat = null
    }
    if (protein_per_weight == ''){
      protein_per_weight = null
    }
    const pool = await poolPromise;

    await pool.query`INSERT INTO inbody (user_id, weight, height, bmi, body_fat, protein_per_weight) 
                    VALUES (${req.user}, ${weight}, ${height}, ${bmi}, ${body_fat}, ${protein_per_weight})`;

    res.json({ message: "Successfully data added!" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
