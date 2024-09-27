const express = require("express");
const router = express.Router();
const { poolPromise } = require("../model/index");

router.get("/",async function (req, res, next) {
  try {
    const pool = await poolPromise;

    const { recordset } = await pool.query`SELECT category, thumb_link , source_link
    FROM health_video;
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
