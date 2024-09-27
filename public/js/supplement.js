function showContent(menuId) {
    document.querySelectorAll(".content").forEach(function (content) {
      content.style.display = "none";
    });

    document.getElementById(`${menuId}-content`).style.display = "block";
  }

  function toggleSlide(slideId) {
    const slideContent = document.getElementById(slideId);

    // 현재 슬라이드의 display 속성 값을 확인하고 토글
    if (
      slideContent.style.display === "none" ||
      slideContent.style.display === ""
    ) {
      slideContent.style.display = "block"; // 숨겨진 경우 보이도록 설정
    } else {
      slideContent.style.display = "none"; // 보이는 경우 숨김 처리
    }
  }

  showContent("menu1");
  showContent("menu2");
  showContent("menu3");

  fetch("/api/supplement")
  .then((response) => response.json())
  .then((data) => {
    data = data.Value;
    console.log(data);
    let count = 1;
    for (d in data) {
      console.log(data[d].category);
      console.log(data[d].name);
      console.log(data[d].link);
      addSlide(count,data[d].link,data[d].name)
        count += 1;
      

    //   labels.push(data[d].recorded_at);
    //   actualWeightData.push(data[d].weight);
    }
  });

  function addSlide(num, link, text) {
  
    // 슬라이드 컨텐츠 추가
    
    
    var paragraph1 = document.createElement('p');
    paragraph1.className = 'hot_item';
    // paragraph1.innerHTML = '링크: <a href="' + link + '">' + text + '</a>';
    var paragraph2 = document.createElement('a');
    paragraph2.href = link
    paragraph2.textContent = text

    const aa = 'slide'+ Math.round(num/2)
    // console.log(aa);
    // console.log(document.getElementById(aa))
    paragraph1.appendChild(paragraph2)
    document.getElementById(aa).appendChild(paragraph1);
    
//     // slide12의 자식 중에서 <p> 태그를 찾음
// var paragraphElement = document.getElementById(aa).querySelector('p');

// // 찾은 <p> 태그의 내용을 변경
//     paragraphElement.textContent = '링크: <a href="' + link + '">' + text + '</a>';

  }

  // 동적으로 슬라이드 추가