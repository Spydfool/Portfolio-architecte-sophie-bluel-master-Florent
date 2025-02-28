document
  .getElementById("login-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur dans l’identifiant ou le mot de passe");
        }
        return response.json();
      })
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          window.location.href = "index.html";
        } else {
          document.getElementById("error-message").textContent =
            "Erreur dans l’identifiant ou le mot de passe";
          setTimeout(() => {
            document.getElementById("error-message").textContent = "";
          }, 3000);
        }
      })
      .catch((error) => {
        console.error("Erreur:", error);
        document.getElementById("error-message").textContent =
          "Erreur dans l’identifiant ou le mot de passe";
      });
        setTimeout(() => {
          document.getElementById("error-message").textContent = "";
        }, 3000);
  });
