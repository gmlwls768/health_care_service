const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { poolPromise } = require("../model/index");

router.get("/", authMiddleware.isLoginStatus, async function (req, res, next) {
    try {
      const pool = await poolPromise;
  
     // 활동대사량 데이터 가져오기
    //  const { recordset: activityData } = await pool.query`
    //     SELECT activity_metabolic_rate
    //     FROM inbody
    //     WHERE user_id = ${req.user}
    // `;

    /*// 활동대사량 데이터 가져오기*/
    const { recordset: activityData } = await pool.query`
      SELECT activity_metabolic_rate
      FROM inbody WITH (INDEX(IX_ActivityMetabolicRate))
      WHERE user_id = ${req.user}
      ORDER BY recorded_at DESC;
    `; 
    console.log(activityData);
    const activityValue = activityData[0];

    if (activityValue !== undefined) {
        res.json({ activityValue });
    }
    else {
        res.status(404).json({ message: "activity metabolism data no found for the user"});
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", authMiddleware.isLoginStatus, async function (req, res, next) {
    try {
      const { foodName, mealType } = req.body;
      
      // 데이터베이스에서 음식 이름과 일치하는 항목 찾기
        let searchPattern = `%${foodName}%`;

        const pool = await poolPromise;
        const { recordset: matchingFoods } = await pool.query`
         SELECT *
        FROM food
        WHERE food_name LIKE ${searchPattern};
        `;
        if (matchingFoods.length > 0) {
            // 찾은 음식 데이터에서 칼로리, 탄수화물, 단백질, 지방 값을 가져오기
            const { calories, carbohydrates, protein, fat } = matchingFoods[0];

            // 여기에서 필요한 작업을 수행 (예: 데이터베이스에 저장, 다른 서비스로 전달 등)
            // 이 예시에서는 가져온 값을 응답으로 클라이언트에게 전송
            res.json({
                message: "Food data received successfully!",
                foodDetails: {
                calories,
                carbohydrates,
                protein,
                fat,
                },
            });
            console.log(matchingFoods);
          } else {
            // 일치하는 음식이 없을 경우에 대한 처리
            res.status(404).json({ message: "No matching food found in the database" });
          }
        } catch (error) {
          next(error);
        }
  });

module.exports = router;