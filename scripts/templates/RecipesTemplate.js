import RecipeCardDOM from "./dom/RecipeCardDOM.js";

export default class RecipesTemplate {
  // Elements DOM
  #recipesContainerDOM;

  constructor() {
    this.#recipesContainerDOM = document.querySelector(".lpp_recipes-list");
  }

  #createAllCards(recipesList) {
    return recipesList.map(recipe => new RecipeCardDOM(recipe.name, recipe.description, recipe.image, recipe.ingredients));
  }

  displayData(recipesList) {
    const listDOM = this.#createAllCards(recipesList);
    listDOM.forEach(element => element.displayCardData(this.#recipesContainerDOM));
  }
}

