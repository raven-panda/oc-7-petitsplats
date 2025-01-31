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
    if (!!value.queryString)
      allRecipes = this.#filterWithQueryString(allRecipes, value.queryString);
    
    return value ? allRecipes
        .filter(recipe => !recipe.ingredients || !value.ingredients || value.ingredients.every(valIng => recipe.ingredients.some(recIng => recIng.ingredient.toLowerCase() === valIng.toLowerCase())))
        .filter(recipe => !recipe.appliance || !value.appliance || recipe.appliance.toLowerCase() === value.appliance.toLowerCase())
        .filter(recipe => !recipe.ustensils || !value.ustensils || value.ustensils.every(valUst => recipe.ustensils.map(ust => ust.toLowerCase()).includes(valUst.toLowerCase())))
      : allRecipes;
  }

  /**
   * @param {any[]} recipes 
   * @param {string} query 
   */
  #filterWithQueryString(recipes, query) {
    let filteredRecipes = [];
    query = query.toLowerCase();

    for (let i = 0; i < recipes.length; i++) {
        const current = recipes[i];

        if (
            (current.name && current.name.toLowerCase().includes(query)) ||
            (current.description && current.description.toLowerCase().includes(query)) ||
            (current.appliance && current.appliance.toLowerCase().includes(query))
        ) {
            filteredRecipes.push(current);
            continue;
        }

        const recipeIngredients = current.ingredients ?? [];
        for (let ingIndex = 0; ingIndex < recipeIngredients.length; ingIndex++) {
            if (recipeIngredients[ingIndex]?.ingredient && recipeIngredients[ingIndex].ingredient.toLowerCase().includes(query)) {
                filteredRecipes.push(current);
                break;
            }
        }

        const recipeUstensils = current.ustensils ?? [];
        for (let ustIndex = 0; ustIndex < recipeUstensils.length; ustIndex++) {
            if (recipeUstensils[ustIndex] && recipeUstensils[ustIndex].toLowerCase().includes(query)) {
                filteredRecipes.push(current);
                break;
            }
        }
    }

    return filteredRecipes;
  }

}