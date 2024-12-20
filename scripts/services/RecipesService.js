import { recipes as recipesMock } from "./mock/recipes-mock";

/**
 * Service - Contains methods to access Recipes data
 */
export default class RecipesService {

  /**
   * @returns All recipes found in database
   */
  getAllRecipes() {
    return recipesMock;
  }

  /**
   * @param {string} value Search string
   * @returns {recipesMock} All recipes with name, one of ingredients, appliances or ustensils matched the given value
   */
  searchRecipes(value) {

  }

  /**
   * @param {string[]} value Ingredients tags used for search
   * @returns {recipesMock} Recipes found with given Ingredient tag
   */
  searchRecipesByIngredients(...value) {

  }

  /**
   * @param {string[]} value Appliances tags used for search
   * @returns {recipesMock} Recipes found with given Appliances tag
   */
  searchRecipesByAppliances(...value) {
    
  }

  /**
   * @param {string[]} value Ustensils tags used for search
   * @returns Recipes found with given Ustensils tag
   */
  searchRecipesByUstensils(...value) {
    
  }

}