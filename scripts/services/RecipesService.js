import { recipes as recipesMock } from "./mock/recipes-mock.js";

/**
 * Service - Contains methods to access Recipes data
 */
export default class RecipesService {

  /**
   * @returns {recipesMock} All recipes found in database
   */
  async getAllRecipes() {
    return recipesMock ?? [];
  }

  /**
   * @param {string} value Search string
   * @returns {recipesMock} All recipes with name, one of ingredients, appliances or ustensils matched the given value
   */
  searchRecipes(value) {

  }

  /**
   * @param {{ ingredients: string[], appliance: string, ustensils: string[] }} value Ingredients tags used for search
   * @returns {recipesMock} Recipes found with given Ingredient tag
   */
  async searchRecipesByFilters(value) {
    const allRecipes = await this.getAllRecipes(); 
    return value ? allRecipes
        .filter(recipe => !recipe.ingredients || !value.ingredients || value.ingredients.every(valIng => recipe.ingredients.some(recIng => recIng.ingredient.toLowerCase() === valIng.toLowerCase())))
        .filter(recipe => !recipe.appliance || !value.appliance || recipe.appliance.toLowerCase() === value.appliance.toLowerCase())
        .filter(recipe => !recipe.ustensils || !value.ustensils || value.ustensils.every(valUst => recipe.ustensils.map(ust => ust.toLowerCase()).includes(valUst.toLowerCase())))
      : allRecipes;
  }

}