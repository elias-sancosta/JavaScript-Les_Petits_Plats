function cardFactory(recipes) {
  const article = document.createElement('article');
  article.setAttribute('class', 'article col');

  // création des zones cartes de recette
  const card = document.createElement('div');
  card.setAttribute('class', 'card h-100');
  article.appendChild(card);

  // création des zones images de recette
  const image = document.createElement('img');
  image.setAttribute('src', './images/imgRecipes.svg');
  image.setAttribute('role', 'img');
  card.appendChild(image);

  // création des zones titres de recette
  const titleRecipe = document.createElement('div');
  titleRecipe.setAttribute(
    'class',
    'card-bodyTitle d-flex justify-content-between px-2'
  );
  card.appendChild(titleRecipe);
  const title = document.createElement('h5');
  titleRecipe.appendChild(title);
  title.innerText = `${recipes.name}`;

  // création des zones temps de recette
  const Timer = document.createElement('div');
  Timer.setAttribute(
    'class',
    'time d-flex justify-content-between align-items-baseline fw-bold'
  );
  titleRecipe.appendChild(Timer);
  const iconTime = document.createElement('i');
  const Time = document.createElement('p');
  iconTime.setAttribute('class', 'fa-regular fa-clock');
  Time.innerText = `${recipes.time}min`;
  Timer.appendChild(iconTime);
  Timer.appendChild(Time);

  // création des zones textes(ingrédients et description recette) de recette
  const textRecipe = document.createElement('div');
  textRecipe.setAttribute(
    'class',
    'card-bodyText d-flex justify-content-between card-content px-3 my-3'
  );
  card.appendChild(textRecipe);

  // création des zones ingrédients de recette
  const ingredientsRecipe = document.createElement('div');
  ingredientsRecipe.setAttribute('class', 'card_ingredients col-6');
  textRecipe.appendChild(ingredientsRecipe);
  recipes.ingredients.map((element) => {
    const p = document.createElement('p');
    p.className = 'mb-0';
    p.innerHTML = `<span class="fw-bold">${element.ingredient}</span>: <span>${
      element.quantity === undefined ? '1' : element.quantity
    }</span><span>${
      element.unit === 'grammes'
        ? 'g'
        : element.unit === 'cl'
        ? element.unit
        : element.unit === 'ml'
        ? element.unit
        : element.unit === 'cuillère à soupe'
        ? ' Càs'
        : element.unit === 'cuillères à soupe'
        ? ' Càs'
        : ''
    }</span>`;
    ingredientsRecipe.appendChild(p);
    return p;
  });

  // création des zones descriptions de recette
  const descriptionsRecipe = document.createElement('div');
  descriptionsRecipe.setAttribute('class', 'card_description w-50 col-6');
  textRecipe.appendChild(descriptionsRecipe);
  const recette = document.createElement('p');
  recette.setAttribute('class', 'recette text-wrap');
  descriptionsRecipe.appendChild(recette);
  recette.innerText = `${recipes.description}`;

  return article;
}

// Affichage des cartes recettes
export default function displayCardRecipes(recipes) {
  const content = document.querySelector('#contentRecipes');
  content.innerHTML = '';
  recipes.forEach((recipes) => {
    const card = cardFactory(recipes);
    content.appendChild(card);
  });
}
