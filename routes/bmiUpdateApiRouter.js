const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { poolPromise } = require("../model/index");

router.post("/", authMiddleware.isLoginStatus, async function (req, res, next) {
  try {
    let { weight, fat, muscle, date } =
      req.body;
  
  
    const pool = await poolPromise;

    
    await pool.query`UPDATE inbody
    SET weight = ${weight},
        body_fat = ${fat},
        protein_per_weight = ${muscle}
    WHERE user_id = ${req.user}
      AND recorded_at = ${date};
    `;

    res.json({ message: "Successfully data updated!" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
