document.addEventListener("DOMContentLoaded", () => {
  const loginLink = document.getElementById("login-link");
  const logoutLink = document.getElementById("logout-link");

  // Vérifier si l'utilisateur est connecté
  const token = localStorage.getItem("token");
  if (token) {
    loginLink.style.display = "none";
    logoutLink.style.display = "block";
  } else {
    loginLink.style.display = "block";
    logoutLink.style.display = "none";
  }

  // Gérer la déconnexion
  logoutLink.addEventListener("click", (event) => {
    event.preventDefault();
    localStorage.removeItem("token");
    window.location.href = "index.html";
  });
});
