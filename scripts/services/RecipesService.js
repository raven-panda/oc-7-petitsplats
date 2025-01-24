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

    for (let i = 0; i < recipes.length; i++) {
      const current = recipes[i];

      const recipeName = current.name;
      const recipeIngredients = current.ingredients ?? [];
      const recipeAppliance = current.appliance;
      const recipeUstensils = current.ustensils ?? [];
      const recipeDescription = current.description;

      if (!!recipeName && recipeName.toLowerCase().includes(query.toLowerCase())) {
        filteredRecipes.push(current);
        continue;
      }

      let ingredientFound = false;
      for (let ingIndex = 0; ingIndex < recipeIngredients.length; ingIndex++) {
        if (recipeIngredients[ingIndex]?.ingredient && recipeIngredients[ingIndex].ingredient.toLowerCase().includes(query.toLowerCase())) {
          filteredRecipes.push(current);
          ingredientFound = true;
          break;
        }
      }
      if (ingredientFound)
        continue;

      if (recipeAppliance && recipeAppliance.toLowerCase().includes(query.toLowerCase())) {
        filteredRecipes.push(current);
        continue;
      }

      for (let ustIndex = 0; ustIndex < recipeIngredients.length; ustIndex++) {
        if (recipeUstensils[ustIndex] && recipeUstensils[ustIndex].toLowerCase().includes(query.toLowerCase())) {
          filteredRecipes.push(current);
          ingredientFound = true;
          break;
        }
      }
      if (ingredientFound)
        continue;

      if (recipeDescription && recipeDescription.toLowerCase().includes(query.toLowerCase())) {
        filteredRecipes.push(current);
      }
    }

    return filteredRecipes;
  }

}