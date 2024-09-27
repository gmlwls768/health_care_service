var ctx = document.getElementById("myChart").getContext("2d");

// 2023년 1월 1일부터 1월 31일까지의 날짜 배열 생성
var labels = [];
var actualWeightData = [];
fetch("/api/weightTrace")
  .then((response) => response.json())
  .then((data) => {
    data = data.Value;
    console.log(data);
    for (d in data) {
      console.log(data[d]);
      labels.push(data[d].recorded_at);
      actualWeightData.push(data[d].weight);
    }

    var myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "실제 체중",
            data: actualWeightData,
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
          },
          // {
          //     label: "예상 체중",
          //     data: expectedWeightData,
          //     backgroundColor: "rgba(54, 162, 235, 0.2)",
          //     borderColor: "rgba(54, 162, 235, 1)",
          //     borderWidth: 1,
          // },
          // {
          //     label: "체중 추세",
          //     data: weightTrendData,
          //     backgroundColor: "rgba(75, 192, 192, 0.2)",
          //     borderColor: "rgba(75, 192, 192, 1)",
          //     borderWidth: 1,
          // },
        ],
      },
      options: {
        plugins: {
          legend: {
            position: "bottom",
          },
        },
        layout: {
          padding: {
            left: -100, // 좌측 여백 넓히기
            right: -30, // 우측 여백 넓히기
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Weight (kg)",
            },
          },
        },
      },
    });
  });

// var actualWeightData = [
// 65, 64, 63.5, 63, 62.5, 62, 61.5, 61, 60.5, 60, 59.5, 59, 58.5, 58,
// 57.5, 57, 56.5, 56, 55.5, 55, 54.5, 54, 53.5, 53, 52.5, 52, 51.5, 51,
// 50.5, 50, 49.5, 49,
// ];
// var expectedWeightData = [
// 64, 63.5, 63, 62.5, 62, 61.5, 61, 60.5, 60, 59.5, 59, 58.5, 58, 57.5,
// 57, 56.5, 56, 55.5, 55, 54.5, 54, 53.5, 53, 52.5, 52, 51.5, 51, 50.5,
// 50, 49.5, 49,
// ];
// var weightTrendData = [
// 63, 63, 62.8, 62.7, 62.5, 62.2, 62, 61.8, 61.6, 61.4, 61.3, 61.2, 61,
// 60.9, 60.8, 60.7, 60.6, 60.5, 60.4, 60.3, 60.2, 60.1, 60, 59.9, 59.8,
// 59.7, 59.6, 59.5, 59.4, 59.3, 59.2,
// ];
