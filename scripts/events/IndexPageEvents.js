import RecipesService from "../services/RecipesService.js";
import UrlService from "../services/UrlService.js";
import RecipesTemplate from "../templates/RecipesTemplate.js";
import SelectOptionsTemplate from "../templates/SelectOptionsTemplate.js";
import FormSearchAllEvents from "./form/FormSearchAll.js";

export default class IndexPageEvents {
  // Services props
  #urlService;
  #recipesService;

  // Templating props
  #recipesTemplate;
  #ingredientsSelectTemplate;
  #applianceSelectTemplate;
  #ustensilsSelectTemplate;
  
  // State props
  #recipesList;

  // Events props
  #searchAllFormEvents;

  constructor() {
    // Services instanciations
    this.#urlService = new UrlService();
    this.#recipesService = new RecipesService();
    
    // Template instanciations
    this.#recipesTemplate = new RecipesTemplate();

    // Events utils instanciations
    this.#searchAllFormEvents = new FormSearchAllEvents("recipes-search-all-form");
    
    this.#ingredientsSelectTemplate = new SelectOptionsTemplate("ingredients", this.#urlService, () => this.#onFormsChangeHandler(), true);
    this.#applianceSelectTemplate = new SelectOptionsTemplate("appliance", this.#urlService, () => this.#onFormsChangeHandler());
    this.#ustensilsSelectTemplate = new SelectOptionsTemplate("ustensils", this.#urlService, () => this.#onFormsChangeHandler(), true);

    this.#initRecipes();
  }

  async #initRecipes() {
    this.#recipesList = await this.#recipesService.searchRecipes({
      ingredients: this.#urlService.getUrlParam("ingredients"),
      appliance: this.#urlService.getUrlParam("appliance"),
      ustensils: this.#urlService.getUrlParam("ustensils")
    });
    this.#recipesTemplate.displayData(this.#recipesList);

    this.#ingredientsSelectTemplate.displayData(this.#recipesList);
    this.#applianceSelectTemplate.displayData(this.#recipesList);
    this.#ustensilsSelectTemplate.displayData(this.#recipesList);
  }

  /**
   * @param {{ ingredients: string[], appliance: string, ustensils: string[] }} value Ingredients tags used for search
   */
  async #onFormsChangeHandler() {
    this.#recipesList = await this.#recipesService.searchRecipes({
      ingredients: this.#urlService.getUrlParam("ingredients"),
      appliance: this.#urlService.getUrlParam("appliance"),
      ustensils: this.#urlService.getUrlParam("ustensils")
    });

    this.#recipesTemplate.updateData(this.#recipesList);

    this.#ingredientsSelectTemplate.updateData(this.#recipesList);
    this.#applianceSelectTemplate.updateData(this.#recipesList);
    this.#ustensilsSelectTemplate.updateData(this.#recipesList);
  }
  
  /**
   * Create events of /index.html page
   */
  createEvents() {
    this.#searchAllFormEvents.createEvents();
  }
}