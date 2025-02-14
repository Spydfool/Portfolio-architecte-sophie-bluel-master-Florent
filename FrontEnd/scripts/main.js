let allWorks = [];

document.addEventListener("DOMContentLoaded", () => {
  // Récupérer les travaux
  fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then((works) => {
      allWorks = works;
      displayWorks(works);
    })
    .catch((error) => console.error("Erreur:", error));

  // Récupérer les catégories
  fetch("http://localhost:5678/api/categories")
    .then((response) => response.json())
    .then((categories) => {
      displayCategories(categories);
    })
    .catch((error) => console.error("Erreur:", error));
});

function displayWorks(works) {
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = "";

  works.forEach((work) => {
    const workElement = document.createElement("div");
    workElement.classList.add("work-item");

    const img = document.createElement("img");
    img.src = work.imageUrl;
    img.alt = work.title;

    const title = document.createElement("p");
    title.textContent = work.title;

    workElement.appendChild(img);
    workElement.appendChild(title);
    gallery.appendChild(workElement);
  });
}

function displayCategories(categories) {
  const filterContainer = document.querySelector(".filters");

  const allButton = document.createElement("button");
  allButton.textContent = "Tous";
  allButton.classList.add("active");
  allButton.addEventListener("click", () => {
    displayWorks(allWorks);
    setActiveButton(allButton);
  });
  filterContainer.appendChild(allButton);

  categories.forEach((category) => {
    const button = document.createElement("button");
    button.textContent = category.name;
    button.addEventListener("click", () => {
      const filteredWorks = allWorks.filter(
        (work) => work.categoryId === category.id
      );
      displayWorks(filteredWorks);
      setActiveButton(button);
    });
    filterContainer.appendChild(button);
  });
}

function setActiveButton(activeButton) {
  const buttons = document.querySelectorAll(".filters button");
  buttons.forEach((button) => {
    button.classList.remove("active");
  });
  activeButton.classList.add("active");
}
