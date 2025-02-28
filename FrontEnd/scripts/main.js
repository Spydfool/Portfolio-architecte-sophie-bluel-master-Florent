let allWorks = [];

document.addEventListener("DOMContentLoaded", () => {
  // Récupérer les travaux
  fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then((works) => {
      allWorks = works;
      displayWorks(works);
      displayModalWorks(works); // Afficher les travaux dans la modale
    })
    .catch((error) => console.error("Erreur:", error));

  // Récupérer les catégories
  fetch("http://localhost:5678/api/categories")
    .then((response) => response.json())
    .then((categories) => {
      displayCategories(categories);
      populateCategorySelect(categories); // Remplir le champ select des catégories
    })
    .catch((error) => console.error("Erreur:", error));

  // Gérer l'apparition et la disparition de la fenêtre modale
  const modal = document.getElementById("modal");
  const editButton = document.getElementById("edit-button");
  const closeButton = document.querySelector(".close");

  editButton.addEventListener("click", () => {
    modal.style.display = "block";
  });

  closeButton.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });

  // Gérer le changement de contenu de la modale
  const addPhotoButton = document.getElementById("add-photo-button");
  const galleryContent = document.getElementById("gallery-content");
  const addPhotoContent = document.getElementById("add-photo-content");
  const backButton = document.getElementById("back-button");

  addPhotoButton.addEventListener("click", () => {
    galleryContent.style.display = "none";
    addPhotoContent.style.display = "block";
  });

  backButton.addEventListener("click", () => {
    addPhotoContent.style.display = "none";
    galleryContent.style.display = "block";
  });

  // Gérer l'envoi du formulaire d'ajout de projet
  const addPhotoForm = document.getElementById("add-photo-form");
  addPhotoForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(addPhotoForm);
    const token = localStorage.getItem("token");

    fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de l'ajout du projet");
        }
        return response.json();
      })
      .then((newWork) => {
        allWorks.push(newWork);
        displayWorks(allWorks);
        displayModalWorks(allWorks);
        addPhotoForm.reset();
        addPhotoContent.style.display = "none";
        galleryContent.style.display = "block";
      })
      .catch((error) => console.error("Erreur:", error));
  });
});

// Afficher les travaux
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

// Afficher les travaux dans la modale
function displayModalWorks(works) {
  const modalGallery = document.querySelector(".modal-gallery");
  modalGallery.innerHTML = "";

  works.forEach((work) => {
    const workContainer = document.createElement("div");
    workContainer.style.position = "relative";

    const img = document.createElement("img");
    img.src = work.imageUrl;
    img.alt = work.title;

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    deleteButton.innerHTML = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path fill="#ffffff" d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0L284.2 0c12.1 0 23.2 6.8 28.6 17.7L320 32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0 7.2-14.3zM32 128l384 0 0 320c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-320zm96 64c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16z"/></svg>`; // Icde poube
    deleteButton.addEventListener("click", () => {
      deleteWork(work.id, workContainer);
    });

    workContainer.appendChild(img);
    workContainer.appendChild(deleteButton);
    modalGallery.appendChild(workContainer);
  });
}

// Supprimer un travail
function deleteWork(workId, workElement) {
  const token = localStorage.getItem("token");

  fetch(`http://localhost:5678/api/works/${workId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erreur lors de la suppression du travail");
      }
      // Supprimer l'élément du DOM
      workElement.remove();
      // Mettre à jour la liste des travaux
      allWorks = allWorks.filter((work) => work.id !== workId);
      displayWorks(allWorks);
    })
    .catch((error) => console.error("Erreur:", error));
}

// Afficher les catégories
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

// Remplir le champ select des catégories
function populateCategorySelect(categories) {
  const categorySelect = document.getElementById("category");
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category.id;
    option.textContent = category.name;
    categorySelect.appendChild(option);
  });
}

//bouton actif
function setActiveButton(activeButton) {
  const buttons = document.querySelectorAll(".filters button");
  buttons.forEach((button) => {
    button.classList.remove("active");
  });
  activeButton.classList.add("active");
}
