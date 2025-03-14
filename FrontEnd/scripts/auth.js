document.addEventListener("DOMContentLoaded", () => {
  const loginLink = document.getElementById("login-link");
  const logoutLink = document.getElementById("logout-link");
  const adminBar = document.getElementById("admin-bar");
  const editButton = document.getElementById("edit-button");
  const filtersSection = document.querySelector(".filters");

  // Vérifier si l'utilisateur est connecté
  const token = localStorage.getItem("token");
  if (token) {
    loginLink.style.display = "none";
    logoutLink.style.display = "block";
    adminBar.style.display = "flex";
    editButton.style.display = "flex";
    filtersSection.style.display = "none";
  } else {
    loginLink.style.display = "block";
    logoutLink.style.display = "none";
    adminBar.style.display = "none";
    editButton.style.display = "none";
    filtersSection.style.display = "block";
  }

  // Gérer la déconnexion
  logoutLink.addEventListener("click", (event) => {
    event.preventDefault();
    localStorage.removeItem("token");
    window.location.href = "index.html";
  });
});
