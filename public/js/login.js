async function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
      const response = await fetch(
        "http://localhost:8080/api/auth/local/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        }
      );

      if (!response.ok) {
        if (!response.ok) {
          const errorData = await response.json();
          return alert(errorData.message || "로그인에 실패했습니다.");
        }
      }

      window.location.href = "/"; // 메인 페이지 URL로 변경
    } catch (error) {
      alert(error.message);
    }
  }