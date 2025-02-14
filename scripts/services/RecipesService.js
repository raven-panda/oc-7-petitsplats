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
        .filter(recipe => !value.ingredients || (recipe.ingredients && value.ingredients.every(valIng => recipe.ingredients.some(recIng => recIng.ingredient.toLowerCase() === valIng.toLowerCase()))))
        .filter(recipe => !value.appliance || (recipe.appliance && recipe.appliance.toLowerCase() === value.appliance.toLowerCase()))
        .filter(recipe => !value.ustensils || (recipe.ustensils && value.ustensils.every(valUst => recipe.ustensils.map(ust => ust.toLowerCase()).includes(valUst.toLowerCase()))))
      : allRecipes;
  }

  /**
   * @param {any[]} recipes 
   * @param {string} query 
   */
  #filterWithQueryString(recipes, query) {
    // Remove case for proper search
    const lowerQuery = query.toLowerCase();

    // Using filter method on all recipe properties to check if one match
    return recipes.filter(recipe => 
        recipe.name?.toLowerCase().includes(lowerQuery) ||
        recipe.description?.toLowerCase().includes(lowerQuery) ||
        recipe.appliance?.toLowerCase().includes(lowerQuery) ||
        recipe.ingredients?.some(ing => ing.ingredient?.toLowerCase().includes(lowerQuery)) ||
        recipe.ustensils?.some(ust => ust.toLowerCase().includes(lowerQuery))
    );
  }
}