fetch("/api/video")
  .then((response) => response.json())
  .then((data) => {
    data = data.Value;
    console.log(data);
    let count = 4;
    let categoryCount = 1; // 4번마다 카테고리를 증가시키기 위한 변수 추가
    for (const d in data) {
      let containerPrefix = `container${categoryCount}`;
   
      createDynamicElements(count,data[d].category, data[d].thumb_link, data[d].source_link, containerPrefix);
      count += 1;
      
      // 4번마다 카테고리를 증가시키고 다시 0으로 초기화
      if (count % 4 === 0) {
        categoryCount += 1;
      }
    }
  });

function createDynamicElements(count,category, thumbLink, sourceLink, containerPrefix) {
  // container 선택자 생성
  const containerSelector = `.${containerPrefix}`;

  // container 요소 찾기
  const container = document.querySelector(containerSelector);

  // 카테고리 span이 4번마다 생성되도록 수정
  if (count % 4 === 0) {
    // span 요소 생성
    const span = document.createElement('span');
    span.style.padding = '10px';
    span.style.fontWeight = 'bold';
    span.style.fontSize = '20px';
    span.textContent = category;

    // 줄바꿈(br) 요소 생성
    const br = document.createElement('br');

    // span, br를 container에 차례로 추가
    container.appendChild(span);
    container.appendChild(br);
  }

  // a 요소 생성
  const anchor = document.createElement('a');
  anchor.href = sourceLink;

  // div 요소 생성
  const div1 = document.createElement('div');
  div1.className = 'youtube-video';

  const div = document.createElement('div');
  div.className = 'play-button';

  // img 요소 생성
  const img = document.createElement('img');
  img.src = thumbLink;
  img.alt = '영상 썸네일';

  // img를 div에 추가하고 div를 anchor에 추가
  div.appendChild(img);
  div1.appendChild(div)
  anchor.appendChild(div1);

  // anchor를 container에 추가
  container.appendChild(anchor);
}
