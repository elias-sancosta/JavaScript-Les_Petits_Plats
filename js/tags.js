/* eslint-disable dot-notation */
import { searchByTags } from './functions.js';
import recipes from './recipes.js';

// CREATION DES TAGS APRES SELECTION DANS TAGLIST
function buildTagDom(event, data) {
  const tag = document.createElement('button');
  // mise en place d'une mise en forme selon la categorie
  if (event.target.classList.contains('ingredientListItem')) {
    tag.setAttribute('class', 'btn btn-primary d-flex justify-content-between ingredients');
  } else if (event.target.classList.contains('appareilListItem')) {
    tag.setAttribute('class', 'btn btn-success d-flex justify-content-between appliance');
  } else if (event.target.classList.contains('ustensileListItem')) {
    tag.setAttribute('class', 'btn btn-danger d-flex justify-content-between ustensils');
  }
  tag.setAttribute('type', 'button');
  tag.setAttribute('id', `tag_${event.target.innerText}`);
  tag.innerHTML = `
    <div class="texteTag">
      <p class="m-0">${event.target.innerText}</p>
    </div>
    <div class="iconTag">
      <i class="fa-regular fa-circle-xmark"></i>
    </div>`;
  // fermeture du tag
  tag.addEventListener('click', (event) => {
    event.preventDefault();
    const button = event.target.tagName === 'BUTTON' ? event.target : event.target.closest('button');
    const type = Array.from(button.classList).pop();
    const { filters } = data;
    const index = filters[type].findIndex((e) => e === button.querySelector('p').innerText);
    filters[type].splice(index, 1);
    button.remove();
    data.filtredRecipes = [...filterRecipesByTags(recipes, filters)];
    return filterRecipesByTags(recipes, filters);
  });
  document.querySelector('.tags').appendChild(tag);
}

// ECOUTEUR SUR TAGLIST
export default function tags(data) {
  const { filters } = data;
  document.querySelector('#listItemIngredients').addEventListener('click', (event) => {
    buildTagDom(event, data);
    filters.ingredients.push(event.target.innerText);
    const filtredRecipes = searchByTags(data.filtredRecipes, event.target.innerText, 'ingredients');
    data.filters = { ...filters };
    data.filtredRecipes = [...filtredRecipes];
  });
  document.querySelector('#listItemAppareils').addEventListener('click', (event) => {
    buildTagDom(event, data);
    filters.appliance.push(event.target.innerText);
    const filtredRecipes = searchByTags(data.filtredRecipes, event.target.innerText, 'appareils');
    data.filters = { ...filters };
    data.filtredRecipes = [...filtredRecipes];
  });
  document.querySelector('#listItemUstensiles').addEventListener('click', (event) => {
    buildTagDom(event, data);
    filters.ustensils.push(event.target.innerText);
    const filtredRecipes = searchByTags(data.filtredRecipes, event.target.innerText, 'ustensiles');
    data.filters = { ...filters };
    data.filtredRecipes = [...filtredRecipes];
  });
}

function filterRecipesByTags(recipes, filters) {
  const ingFil = filters['ingredients'];
  const ingredientsFiltred = recipes.filter((recipe) => {
    const ingredients = recipe.ingredients.map((ing) => ing.ingredient.toLowerCase());
    if (ingFil.every((r) => ingredients.includes(r))) {
      return true;
    }
    return false;
  });
  const appFil = filters['appliance'];
  const applianceFiltred = ingredientsFiltred.filter((recipe) => {
    const appliances = recipe.appliance.toLowerCase();
    if (appFil.every((r) => appliances.includes(r))) {
      return true;
    }
    return false;
  });
  const ustFil = filters['ustensils'];
  const filtered = applianceFiltred.filter((recipe) => {
    const ustensiles = recipe.ustensils;
    if (ustFil.every((r) => ustensiles.includes(r))) {
      return true;
    }
    return false;
  });
  return filtered;
}
