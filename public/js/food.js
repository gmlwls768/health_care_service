fetch("/api/food")
  .then((response) => response.json())  // JSON 형식으로 변환
  .then((data) => {
    const activityMetabolism = data.activityValue;  // 가져온 데이터에서 활동 대사량 값 추출

    console.log(activityMetabolism);
    // HTML에 "calorieValue" ID를 가진 요소가 있다고 가정합니다.
    const calorieValueElement = document.getElementById("calorieValue");

    if (activityMetabolism !== undefined) {
      // 가져온 활동 대사량 값을 HTML 요소의 내용으로 업데이트
      calorieValueElement.textContent = `${activityMetabolism.activity_metabolic_rate}`;
    } else {
      console.error('활동 대사량 데이터를 찾을 수 없습니다.');
    }

    // HTML 요소들을 가져옵니다.
    const proteinGraph = document.querySelector(".food.data1");
    const carbGraph = document.querySelector(".food.data2");
    const fatGraph = document.querySelector(".food.data3");

    if (activityMetabolism !== undefined && typeof activityMetabolism.activity_metabolic_rate === 'number' && activityMetabolism.activity_metabolic_rate >= 0) {
      // 최대 높이를 100%로 설정
      const maxGraphHeight = "100%";

      // 첫 번째 그래프: 활동 대사량의 50%
      const proteinPercent = 50;
      const proteinHeight = ((activityMetabolism.activity_metabolic_rate * proteinPercent) / 2000 > 100) ? maxGraphHeight : ((activityMetabolism.activity_metabolic_rate * proteinPercent) / 2000) + "%";
      console.log("단백질 그래프 높이:", proteinHeight);
      proteinGraph.style.height = proteinHeight;

      // 두 번째 그래프: 활동 대사량의 18.9%
      const carbPercent = 18.9;
      const carbHeight = ((activityMetabolism.activity_metabolic_rate * carbPercent) / 2000 > 100) ? maxGraphHeight : ((activityMetabolism.activity_metabolic_rate * carbPercent) / 2000) + "%";
      console.log("탄수화물 그래프 높이:", carbHeight);
      carbGraph.style.height = carbHeight;

      // 세 번째 그래프: 활동 대사량의 31.1%
      const fatPercent = 31.1;
      const fatHeight = ((activityMetabolism.activity_metabolic_rate * fatPercent) / 2000 > 100) ? maxGraphHeight : ((activityMetabolism.activity_metabolic_rate * fatPercent) / 2000) + "%";
      console.log("지방 그래프 높이:", fatHeight);
      fatGraph.style.height = fatHeight;
    } else {
      console.error('활동 대사량 데이터를 찾을 수 없거나 데이터가 올바르지 않습니다.');
    }
  })
  .catch((error) => {
    console.error('데이터를 불러오는 중 오류가 발생했습니다:', error);
  });

  function searchFood(mealType) {
    // 검색 창에서 음식 이름을 가져옴
    const foodNameElement = document.getElementById(`${mealType}Search`);
    const foodName = foodNameElement.value;
    let kcal_name = Number(document.getElementById(`kcal_${mealType}`).innerText);
    let carb_name =Number(document.getElementById(`carb_${mealType}`).innerText);
    let protein_name = Number(document.getElementById(`protein_${mealType}`).innerText);
    let fat_name = Number(document.getElementById(`fat_${mealType}`).innerText);
    const data = {
      mealType,
      foodName,
    };
  
    fetch("/api/food", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); // JSON 형식으로 변환된 응답을 반환
      })
      .then((foodData) => {
        console.log(foodData); // 데이터 확인용
      

        // foodDetails가 존재하는지, 그리고 내부 프로퍼티 구조 확인
        if (foodData.foodDetails && foodData.foodDetails.carbohydrates !== undefined) {
          // foodDetails가 존재하고 carbohydrates가 정의되어 있을 때만 프로퍼티 추출
          const { carbohydrates, protein, fat,calories } = foodData.foodDetails;
          kcal_name += calories
          document.getElementById(`kcal_${mealType}`).innerText = kcal_name

          carb_name += carbohydrates
          document.getElementById(`carb_${mealType}`).innerText = carb_name

          protein_name += protein
          document.getElementById(`protein_${mealType}`).innerText = protein_name
          
          fat_name += fat
          document.getElementById(`fat_${mealType}`).innerText = fat_name

          console.log(kcal_name);

            const totalNutrients = carb_name + protein_name + fat_name;
            const carbPercentage = (carb_name / totalNutrients) * 100;
            const proteinPercentage = (protein_name / totalNutrients) * 100;
            const fatPercentage = (fat_name / totalNutrients) * 100;
            console.log(totalNutrients, carbPercentage, proteinPercentage, fatPercentage);
            
            // 예시: 페이지에 칼로리 값을 출력
            const calorieValueElement = document.getElementById(`${mealType}CalorieValue`);
            calorieValueElement.textContent = `칼로리: ${kcal_name} kcal`;
        
            // 각각의 그래프 업데이트
            updateGraph(mealType, carbPercentage, proteinPercentage, fatPercentage);
        } else {
            console.error("foodDetails가 존재하지 않거나 carbohydrates가 정의되지 않았습니다.");
        }
    })
      .catch((error) => {
        console.error('검색 중 오류 발생:', error);
      });
  }

// 각각의 그래프를 업데이트하는 함수
function updateGraph(mealType, carbPercentage, proteinPercentage, fatPercentage) {
    // 각 섹션의 요소를 찾기
    const carbGraph = document.getElementById(`${mealType}-carb`);
    const proteinGraph = document.getElementById(`${mealType}-protein`);
    const fatGraph = document.getElementById(`${mealType}-fat`);

    // 찾은 요소가 존재하는지 확인
    if (carbGraph && proteinGraph && fatGraph) {
        // 각 그래프의 width 업데이트
        carbGraph.style.width = `${carbPercentage}%`;
        proteinGraph.style.width = `${proteinPercentage}%`;
        fatGraph.style.width = `${fatPercentage}%`;
    } else {
        console.error(`해당 섹션(${mealType})의 그래프 요소를 찾을 수 없습니다.`);
    }
}



// 검색 버튼 클릭 이벤트에 추가
document.getElementById("searchButtonmorning").addEventListener("click", function () {
    searchFood('morning');
});

document.getElementById("searchButtonlunch").addEventListener("click", function () {
    searchFood('lunch');
});

document.getElementById("searchButtondinner").addEventListener("click", function () {
    searchFood('dinner');
});

document.getElementById("searchButtonsnack").addEventListener("click", function () {
    searchFood('snack');
    chargeCalc();
});


function chargeCalc() {
  const calorieValueElement = Number(document.getElementById("calorieValue").textContent);
  console.log(calorieValueElement);
  const morning = Number(document.getElementById("kcal_morning").textContent);
  console.log(morning);
  const lunch = Number(document.getElementById("kcal_lunch").textContent);
  console.log(lunch);
  const dinner = Number(document.getElementById("kcal_dinner").textContent);
  console.log(dinner);
  const snack = Number(document.getElementById("kcal_snack").textContent);
  console.log(snack);
  
 const sum = morning + lunch + dinner +snack;
  const minus = calorieValueElement - sum;
  document.getElementById("chargeCalorieValue").textContent = minus;

}