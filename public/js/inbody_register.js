function submitData() {
  const weight = document.getElementById("weight").value;
  const height = document.getElementById("height").value;
  const bmi = document.getElementById("bmi").value;
  const body_fat = document.getElementById("body_fat").value;
  const protein_per_weight = document.getElementById("protein_per_weight").value;

  const data = {
    height,
    weight,
    bmi,
    body_fat,
    protein_per_weight,
  };

  fetch("/api/inbody", {
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
      window.location.href = "/";
      alert("인바디 정보를 추가하였습니다");
      // 여기에서 필요한 추가 동작을 수행할 수 있습니다.
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("인바디 정보를 저장하는데 실패하였습니다.");
    });
}
