# Portfolio-architecte-sophie-bluel

Code du projet 6 d'intégrateur web.

## Architecture

Ce repo git contient les 2 briques logicielles du projet 
- Frontend
- Backend

## Pour le lancer le code
### Backend
Ouvrir le dossier Backend et lire le README.md

### Frontend
Ouvrir le dossier Frontend et lancer liveserver de votre IDE
 
## Astuce
 
Si vous désirez afficher le code du backend et du frontend, faites le dans 2 instances de VSCode différentes pour éviter tout problème




/*const gallery = document.querySelector(".gallery");

let works = [];

function createWorks(works) {
  works.forEach((work) => {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const figcaption = document.createElement("figcaption");

    img.src = work.imageUrl;
    img.alt = work.title;
    figcaption.textContent = work.title;

    figure.appendChild(img);
    figure.appendChild(figcaption);

    gallery.appendChild(figure);
  });
}

async function getWorks() {
  const response = await fetch("http://localhost:5678/api/works");
  const data = await response.json();
  works = data;
}

async function init() {
  console.log("avant", works);
  await getWorks();
  console.log("après", works);
  createWorks(works);
}

init();*/
