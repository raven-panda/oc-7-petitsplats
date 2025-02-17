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

  #updateRecipesCounter(recipesList) {
    const counterDOM = document.querySelector("#recipes-counter");
    counterDOM.textContent = `${recipesList?.length ?? 0} recette${!recipesList?.length || recipesList.length !== 1 ? "s" : ""}`;
  }

  displayData(recipesList) {
    const listDOM = this.#createAllCards(recipesList);

    if (listDOM.length > 0) {
      this.#recipesContainerDOM.classList.remove("no-recipe-found");
      listDOM.forEach(element => element.displayCardData(this.#recipesContainerDOM));
    } else {
      this.#recipesContainerDOM.classList.add("no-recipe-found");
    }
    
    this.#updateRecipesCounter(recipesList);
  }

  updateData(recipesList) {
    this.#recipesContainerDOM.innerHTML = "";
    this.displayData(recipesList);
  }
}

