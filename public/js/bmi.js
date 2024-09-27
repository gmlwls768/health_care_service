function every_update(weight,muscle,fat) {
    muscle_per = Number(muscle) / ((Number(weight)/2) + 20) * 100;
    fat_per = Number(fat);
    console.log(muscle_per);
    if(muscle_per < 55 && fat_per > 20 ){
        text = "린매스업 추천"
    }else if (muscle_per < 55 && fat_per <= 20){
        text = "근육량 증가 추천"
    }else if(muscle_per > 55 && fat_per > 20){
        text= "다이어트 추천"
    }else{
        text = "유지 추천"
    }
    muscle_per += '%'
    element1 = document.getElementById('pb-1');
    element1.style.width = muscle_per;
    
    document.getElementById('pb-1-label').textContent = Number(muscle) + 'kg';
    document.getElementById('pb-2-label').textContent = Number(fat) + '%';
    
    console.log(text);
    document.getElementById('recommend_do_activity').textContent = text;
    
    fat_per += '%'
    element2 = document.getElementById('pb-2');
    element2.style.width = fat_per;

    
}

fetch("/api/bmi")
  .then((response) => response.json())
  .then((data) => {
    data = data.Value[0];
    console.log(data);
    
    document.getElementById('weight').value = data.weight;
    document.getElementById('fat').value = data.body_fat;
    document.getElementById('muscle').value = data.protein_per_weight;
    document.getElementById('date').value = data.recorded_at;
    
    console.log(data.weight,data.protein_per_weight,data.body_fat);
    every_update(data.weight,data.protein_per_weight,data.body_fat);
  });


  function submitData(){
  const weight = document.getElementById("weight").value;
  const fat = document.getElementById("fat").value;
  const muscle = document.getElementById("muscle").value;
  const date = document.getElementById("date").value;
  const data = {
    weight,
    fat,
    muscle,
    date,
  };

  every_update(data.weight,data.muscle,data.fat);
  fetch("/api/bmiUpdate", {
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
      window.location.href = "/bmi";
      alert("인바디 정보를 업데이트하였습니다");
      // 여기에서 필요한 추가 동작을 수행할 수 있습니다.
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("인바디 정보를 업데이트하는데 실패하였습니다.");
    });
}