// activityApiRouter.js 파일에 아래 코드를 추가합니다.
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { poolPromise } = require("../model/index");

router.get("/", authMiddleware.isLoginStatus, async function (req, res, next) {
  try {
    const pool = await poolPromise;

     /*// inbody 테이블에서 데이터 가져오기
    const { recordset: inbodyData } = await pool.query`
      SELECT  weight, height
      FROM inbody
      WHERE user_id = ${req.user}
      ORDER BY recorded_at DESC;
    `;

    // users 테이블에서 데이터 가져오기
    const { recordset: userData } = await pool.query`
      SELECT age, gender
      FROM users
      WHERE user_id = ${req.user};
    `;*/

    const { recordset: combinedData } = await pool.query`
      SELECT 
        'inbody' AS source,
        weight,
        height,
        NULL AS age,
        NULL AS gender,
        recorded_at
      FROM inbody
      WHERE user_id = ${req.user}
      UNION
      SELECT 
        'users' AS source,
        NULL AS weight,
        NULL AS height,
        age,
      gender,
      NULL AS recorded_at
      FROM users
      WHERE user_id = ${req.user}
    `;

    // 데이터 추출
    const inbodyData = combinedData.filter(row => row.source === 'inbody');
    const userData = combinedData.filter(row => row.source === 'users');

    // inbodyData와 userData 변수에 각각의 데이터 저장
    const inbodyValue = inbodyData[0]; // 최신 레코드를 사용한다고 가정
    const userValue = userData[0]; // 첫 번째 레코드를 사용한다고 가정

    console.log("inbodyValue:", inbodyValue);
    console.log("userValue:", userValue);

    if (inbodyValue && userValue) {
      // Harris-Benedict 방정식을 사용하여 BMR 계산
      let bmr;
      if (userValue.gender.toLowerCase() === "male") {
        bmr = 88.362 + (13.397 * inbodyValue.weight) + (4.799 * inbodyValue.height) - (5.677 * userValue.age);
      } else if (userValue.gender.toLowerCase() === "female") {
        bmr = 447.593 + (9.247 * inbodyValue.weight) + (3.098 * inbodyValue.height) - (4.330 * userValue.age);
      }
      console.log(bmr);
      // 계산된 BMR 값을 inbody 테이블에 업데이트
      await pool.query`
        UPDATE inbody
        SET
          basal_metabolic_rate = ${bmr}
        WHERE user_id = ${req.user}
          AND recorded_at = (SELECT MAX(recorded_at) FROM inbody WHERE user_id = ${req.user});
      `;

      // 로그 생성
      console.log(`Basal Metabolic Rate (BMR) 업데이트 완료 - 사용자: ${req.user}, 기초대사량: ${bmr}`);

      value = bmr
      // BMR, inbodyValue, userValue를 클라이언트에게 응답으로 전송
      res.json({ inbodyValue, value });
    } else {
      res.status(404).json({ message: "사용자에 대한 데이터를 찾을 수 없습니다." });
    }
  } catch (error) {
    console.error('Error in server:', error);
    next(error);
  }
});

router.post("/", authMiddleware.isLoginStatus, async function (req, res, next) {
  try {
    const { activityMetabolism } = req.body;
    const pool = await poolPromise;

    // inbody 테이블의 activity_metabolic_rate 업데이트
    await pool.query`
      UPDATE inbody
      SET
        activity_metabolic_rate = ${activityMetabolism}
      WHERE user_id = ${req.user}
        AND recorded_at = (SELECT MAX(recorded_at) FROM inbody WHERE user_id = ${req.user});
    `;

    // 로그 생성
    console.log(`Activity Metabolism 업데이트 완료 - 사용자: ${req.user}, 활동 대사량: ${activityMetabolism}`);

    res.json({ message: "Activity Metabolism updated successfully" });
  } catch (error) {
    console.error('Error in server:', error);
    next(error);
  }
});


router.get("/search", authMiddleware.isLoginStatus, async function (req, res, next) {
  try {
    const { want_exercise_name } = req.query; // req.body 대신 req.query 사용
    const pool = await poolPromise;
    let searchPattern = `%${want_exercise_name}%`;

    // inbody 테이블의 activity_metabolic_rate 업데이트
    const { recordset: exerciseDetails } = await pool.query`
      SELECT *
      FROM exercise
      WHERE exerciseName LIKE ${searchPattern};
    `;

    // 로그 생성
    const exerciseValue = exerciseDetails[0];
    console.log(exerciseValue);

    return res.json(exerciseValue);
  } catch (error) {
    console.error('Error in server:', error);
    next(error);
  }
});



module.exports = router;
