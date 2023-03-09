// Mise en place d'une fonction de recherche sur la barre principale
export function search(recipes, searchString) {
  const filter = recipes.filter((recipe) => {
    const name = recipe.name.toLowerCase();
    const ingredients = recipe.ingredients.map((ing) => ing.ingredient.toLowerCase());
    const appareils = recipe.appliance.toLowerCase();
    const ustensiles = recipe.ustensils;
    const descriptions = recipe.description;
    if (name.includes(searchString.toLowerCase())) {
      return true;
    } if (ingredients.includes(searchString.toLowerCase())) {
      return true;
    } if (appareils.includes(searchString.toLowerCase())) {
      return true;
    } if (ustensiles.includes(searchString.toLowerCase())) {
      return true;
    } if (descriptions.includes(searchString.toLowerCase())) {
      return true;
    }
    return false;
  });
  return filter;
}

// Mise en place d'une fonction de recherche sur la barre des tags
export function searchByTags(recipes, filter, type) {
  if (type === 'ingredients') {
    const newRecipes = recipes.filter((recipe) => {
      const ingredients = recipe.ingredients.map((ing) => ing.ingredient.toLowerCase());
      if (ingredients.includes(filter.toLowerCase())) {
        return true;
      }
      return false;
    });
    return newRecipes;
  } if (type === 'appareils') {
    const newRecipes = recipes.filter((recipe) => {
      const appareils = recipe.appliance.toLowerCase();
      if (appareils.includes(filter.toLowerCase())) {
        return true;
      }
      return false;
    });
    return newRecipes;
  } if (type === 'ustensiles') {
    const newRecipes = recipes.filter((recipe) => {
      const ustensiles = recipe.ustensils;
      if (ustensiles.includes(filter)) {
        return true;
      }
      return false;
    });
    return newRecipes;
  }
  return recipes;
}

// Mise en place d'un message d'erreur si la rechche ne correspond à aucune recette
export function noResult() {
  const error = document.createElement('div');
  error.setAttribute('id', 'errorMessage');
  error.setAttribute('class', 'w-100 mt-5');
  error.innerHTML = `
    <p class="text-center h1"> Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc </p>
  `;
  document.querySelector('#contentRecipes').appendChild(error);
}
