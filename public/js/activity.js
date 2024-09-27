// 기초대사량 값 초기화
let basalMetabolism = 0.0;
let selectedActivity = "";
let weight = 0;
let bweight = 0; //const
async function searchForm(){
  const want_exercise_name = document.getElementById("search-input-value").value 
 // want_exercise_name 값을 query string으로 변환
const queryParams = new URLSearchParams({ want_exercise_name }).toString();

fetch(`/api/activity/search?${queryParams}`, {
  method: "GET",
})
  .then((response) => response.json())
  .then((data) => {
    console.log("응답 데이터:", data['calories_per_usage'],data['exerciseName']);
    weight = bweight * Number(data['calories_per_usage'])
    console.log(weight);
    // <label id="kcal" style="display: none">0</label>
    const basalMetabolism = Number(document.getElementById("activityMetabolism").innerText)
    console.log(basalMetabolism);
    const total = calculateActivityMetabolism(basalMetabolism, weight)
    updateActivityMetabolism(total);
    document.getElementById("activityMetabolism").innerText = total.toFixed(2);
    weight = 0;

    var span = document.createElement("span");
    // 원하는 요소에 <br> 추가
    document.getElementById("selected-activity").appendChild(span);
    
    var span = document.createElement("span");
    span.textContent =", " + data['exerciseName'];
    document.getElementById("selected-activity").appendChild(span)
  // ID가 "selectedActivity"인 요소를 찾아서 그 안에 버튼 추가

// var onSpan=document.createElement('span')



// document.getElementById('adminA').appendChild(onSpan);


  })
  .catch((error) => {
    console.error("에러 발생:", error);
  });

}
// fetch 기초대사량 정보
fetch("/api/activity")
  .then((response) => response.json())
  .then((data) => {
    // 기초대사량 정보 초기화
    basalMetabolism = data.value;

    bweight=data.inbodyValue.weight;
    console.log(bweight)

    console.log(basalMetabolism);

    // HTML에 기초대사량 초기값 출력
    document.getElementById("basalMetabolism").innerText = basalMetabolism.toFixed(2);
    
    activityMetabolism = basalMetabolism;
    document.getElementById("activityMetabolism").innerText = activityMetabolism.toFixed(2);
    // 버튼 클릭 이벤트에 대한 핸들러 등록
    const activityButtons = document.querySelectorAll('.activity-buttons button');
    activityButtons.forEach((button) => {
      button.addEventListener('click', () => {
        // 버튼별로 다른 고정값 설정
        const fixedValue = getFixedValue(button.textContent);

        // 활동 대사량 계산 및 출력
        const activityMetabolism = calculateActivityMetabolism(basalMetabolism, fixedValue);
        document.getElementById("activityMetabolism").innerText = activityMetabolism.toFixed(2);

        // 선택한 활동 정보 업데이트
        selectedActivity = button.textContent;
        document.getElementById("selectedActivity").innerText = selectedActivity;


        // 활동 대사량 값을 서버에 전송하여 업데이트
        updateActivityMetabolism(activityMetabolism);
      });
    });
  })
  .catch((error) => {
    console.error('Error fetching data:', error);
  });

// 가중치 대신 버튼별로 다른 고정값 설정
function getFixedValue(activityType) {
  switch (activityType) {
    case "뒹굴뒹굴":
      return 630; // 예시 값, 원하는 값으로 변경
    case "좌식업무":
      return 790;
    case "돌아다니는 업무":
      return 1190;
    case "활동적인 업무":
      return 1580;
    case "일반 직장인":
      return 950;
    case "휴일 직장인":
      return 990;
    default:
      return 0;
  }
}

// 활동 대사량 계산 함수
function calculateActivityMetabolism(basalMetabolism, fixedValue) {
  return basalMetabolism + fixedValue;
}

// 활동 대사량 값을 서버에 전송하여 업데이트
function updateActivityMetabolism(activityMetabolism) {
  fetch("/api/activity", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ activityMetabolism }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Activity Metabolism updated successfully:", data);
    })
    .catch((error) => {
      console.error("Error updating Activity Metabolism:", error);
    });
}

