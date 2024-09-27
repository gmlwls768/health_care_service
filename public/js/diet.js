function every_update() {

  const now_weight = document.getElementById("weight").value;
  const every_kcal = document.getElementById("every_kcal").value;
  const desired_kg = document.getElementById("desired_kg").value;
  const start_kcal = document.getElementById("start_kcal").value;

  if(every_kcal !== '' && desired_kg !=='' && start_kcal !== ''){
  let lost_required_kg = Number(now_weight) - Number(desired_kg);
  let lost_required_kcal = lost_required_kg * 7800;
  document.getElementById("lost_required_kg").value = lost_required_kg;
  let count = 0;
  let minus_kcal = Number(start_kcal)
  while(minus_kcal <= lost_required_kcal){
    minus_kcal += Number(every_kcal);
    count +=1;
  };
  document.getElementById("diet_date").value = count;
  }
}

fetch("/api/diet")
  .then((response) => response.json())
  .then((data) => {
    data = data.Value[0];
    console.log(data);
    
    document.getElementById('weight').value = data.weight;
    document.getElementById('fat').value = data.body_fat;
    document.getElementById('desired_fat').value = data.desired_body_fat;
    document.getElementById('every_kcal').value = data.weekly_calorie_reduction;
    document.getElementById('diet_date').value = data.diet_date;
    document.getElementById("desired_kg").value = data.desired_kg;
    document.getElementById("start_kcal").value= data.start_kcal;

    if(data.desired_body_fat){
      document.getElementById("lost_required_kg").value = data.weight - data.desired_kg
    }
    every_update();
  });


  function submitData(){
  every_update();

  const desired_fat = document.getElementById("desired_fat").value;
  const every_kcal = document.getElementById("every_kcal").value;
  const diet_date = document.getElementById("diet_date").value;
  const desired_kg = document.getElementById("desired_kg").value;
  const start_kcal = document.getElementById("start_kcal").value;

  const data = {
    desired_fat,
    desired_kg,
    diet_date,
    every_kcal,
    start_kcal,
  };

  fetch("/api/dietUpdate", {
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
      return response.text();
    })
    .then((data) => {
      console.log(data); // 서버로부터의 응답 로그
      window.location.href = "/diet";
      alert("정보를 업데이트하였습니다");
      // 여기에서 필요한 추가 동작을 수행할 수 있습니다.
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("정보를 업데이트하는데 실패하였습니다.");
    });
}