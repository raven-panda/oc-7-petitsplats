import { recipes as recipesMock } from "./mock/recipes-mock.js";

/**
 * Service - Contains methods to access Recipes data
 */
export default class RecipesService {

  async getAllRecipes() {
    return recipesMock ?? [];
  }

  /**
   * @param {{ ingredients: string[], appliance: string, ustensils: string[], queryString?: string }} value Tags object used for search
   * @returns Recipes found with given ingredients, appliance, ustensils tag
   */
  async searchRecipes(value) {
    let allRecipes = await this.getAllRecipes();
    if (value.queryString)
      allRecipes = this.#filterWithQueryString(allRecipes, value.queryString);
    
    return value ? allRecipes
        .filter(recipe => !value.ingredients || recipe.ingredients && value.ingredients.every(valIng => recipe.ingredients.some(recIng => recIng.ingredient.toLowerCase() === valIng.toLowerCase())))
        .filter(recipe => !value.appliance || recipe.appliance && recipe.appliance.toLowerCase() === value.appliance.toLowerCase())
        .filter(recipe => !value.ustensils || recipe.ustensils && value.ustensils.every(valUst => recipe.ustensils.map(ust => ust.toLowerCase()).includes(valUst.toLowerCase())))
      : allRecipes;
  }

  /**
   * Filter with the search form
   * @param {any[]} recipes 
   * @param {string} query 
   */
  #filterWithQueryString(recipes, query) {
    // Remove case for proper search
    const lowercaseQuery = query.toLowerCase();
    // Instantiate final recipes array
    let filteredRecipes = [];

    // Going through the given list
    mainLoop:
    for (let i = 0; i < recipes.length; i++) {
      // Put the current recipe in a const for readability
      const current = recipes[i];

      // Push current in final array if name, description or appliance match the query body
      // and go to the next iteration (continue statement)
      if (
          current.name && current.name.toLowerCase().includes(lowercaseQuery) ||
          current.description && current.description.toLowerCase().includes(lowercaseQuery) ||
          current.appliance && current.appliance.toLowerCase().includes(lowercaseQuery)
      ) {
          filteredRecipes.push(current);
          continue;
      }

      // If the precedent condition didn't match, go through ingredients and push current in final array
      // if one ingredient match and go to the next iteration (break statement)
      for (let ingIndex = 0; ingIndex < (current.ingredients?.length ?? 0); ingIndex++) {
          if (current.ingredients?.[ingIndex]?.ingredient && current.ingredients?.[ingIndex].ingredient.toLowerCase().includes(lowercaseQuery)) {
              filteredRecipes.push(current);
              continue mainLoop;
          }
      }

      // If no ingredients matched, go through ustensils and push current in final array
      // if one ustensil match and go to the next iteration (break statement)
      for (let ustIndex = 0; ustIndex < (current.ustensils?.length ?? 0); ustIndex++) {
        if (current.ustensils?.[ustIndex] && current.ustensils?.[ustIndex].toLowerCase().includes(lowercaseQuery)) {
            filteredRecipes.push(current);
            continue mainLoop;
        }
      }
    }

    return filteredRecipes;
  }

}