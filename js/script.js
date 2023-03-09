import recipes from './recipes.js';
import displayCardRecipes from './card.js';
import { search, noResult } from './functions.js';
import displayTags from './taglist.js';
import tags from './tags.js';

// Mise en place des datas
const data = {
  recipes: [...recipes],
  mainSearch: '',
  searchIngredients: '',
  searchAppareils: '',
  searchUstensiles: '',
  searchLength: 0,
  filters: {
    ingredients: [],
    appliance: [],
    ustensils: [],
  },
};

// Création d'un handler pour l'utilisation du proxy dans la recherche
const handler = {
  set(obj, prop, value) {
    obj[prop] = value;
    switch (prop) {
      case 'filtredRecipes':
        displayCardRecipes(value, proxy);
        displayTags(value, data.filters);
        tags(proxy);
        break;
      case 'mainSearch':
        if (value.length > 2 && data.searchLength <= value.length) {
          proxy.filtredRecipes = search(data.filtredRecipes, value);
          if (search(data.filtredRecipes, value).length === 0) {
            noResult();
          }
        } else if (value.length > 2 && data.searchLength > value.length) {
          proxy.filtredRecipes = search(data.recipes, value);
          if (search(data.filtredRecipes, value).length === 0) {
            noResult();
          }
        } else {
          proxy.filtredRecipes = [...data.recipes];
        }
        break;
      case 'searchIngredients':
        showIngredients(value);
        break;
      case 'searchAppareils':
        showAppareils(value);
        break;
      case 'searchUstensiles':
        showUstensiles(value);
        break;
      default:
        break;
    }
    return true;
  },
};

// Mise en place du proxy
let proxy = new Proxy(data, handler);
proxy.filtredRecipes = [...recipes];

// Ecouteurs sur barre de recherche des recettes
document.querySelector('#searchRecipesInput').addEventListener('keyup', (e) => {
  proxy.mainSearch = e.target.value;
  proxy.searchLength = e.target.value.length;
});

// Ecouteurs sur barre de recherche des tags ingredients
document.querySelector('#searchIngredient').addEventListener('keyup', (e) => {
  proxy.searchIngredients = e.target.value;
});

// Ecouteurs sur barre de recherche des tags appareils
document.querySelector('#searchAppareil').addEventListener('keyup', (e) => {
  proxy.searchAppareils = e.target.value;
});

// Ecouteurs sur barre de recherche des tags ustensiles
document.querySelector('#searchUstensiles').addEventListener('keyup', (e) => {
  proxy.searchUstensiles = e.target.value;
});

// Mise en place de la liste des ingredients après recherche sur la barre des tags
function showIngredients(search) {
  const ingredients = Array.from(document.querySelectorAll('.ingredientListItem'));
  if (search.length > 0) {
    ingredients.forEach((ing) => ing.style.display = ing.innerText.toLowerCase().includes(search.toLowerCase()) ? 'block' : 'none');
  } else {
    ingredients.forEach((ing) => ing.style.display = 'block');
  }
}

// Mise en place de la liste des appareils après recherche sur la barre des tags
function showAppareils(search) {
  const appareils = Array.from(document.querySelectorAll('.appareilListItem'));
  if (search.length > 0) {
    appareils.forEach((app) => app.style.display = app.innerText.toLowerCase().includes(search.toLowerCase()) ? 'block' : 'none');
  } else {
    appareils.forEach((app) => app.style.display = 'block');
  }
}

// Mise en place de la liste des ustensiles après recherche sur la barre des tags
function showUstensiles(search) {
  const ustensiles = Array.from(document.querySelectorAll('.ustensileListItem'));
  if (search.length > 0) {
    ustensiles.forEach((ust) => ust.style.display = ust.innerText.toLowerCase().includes(search.toLowerCase()) ? 'block' : 'none');
  } else {
    ustensiles.forEach((ust) => ust.style.display = 'block');
  }
}
