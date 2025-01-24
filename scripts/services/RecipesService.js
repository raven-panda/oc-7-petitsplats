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
    return recipes.filter(recipe => 
      recipe.name && recipe.name.toLowerCase().includes(query.toLowerCase()) ||
      recipe.ingredients && recipe.ingredients.some(ing => ing.ingredient?.toLowerCase().includes(query.toLowerCase())) ||
      recipe.appliance && recipe.appliance.toLowerCase().includes(query.toLowerCase()) ||
      recipe.ustensils && recipe.ustensils.some(ust => ust.toLowerCase().includes(query.toLowerCase())) ||
      recipe.description && recipe.description.toLowerCase().includes(query.toLowerCase())
    );;
  }

}