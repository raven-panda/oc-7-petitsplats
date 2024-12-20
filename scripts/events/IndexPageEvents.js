import RecipesService from "../services/RecipesService.js";
import UrlService from "../services/UrlService.js";
import RecipesTemplate from "../templates/RecipesTemplate.js";
import FormSearchAllEvents from "./form/FormSearchAll.js";
import FormSelectEvents from "./form/FormSelect.js";

export default class IndexPageEvents {
  // Services props
  #urlService;
  #recipesService;

  // Templating props
  #recipesTemplate;
  
  // State props
  #recipesList;

  // Events props
  #searchAllFormEvents;

  #ingredientSelectEvents;
  #applianceSelectEvents;
  #ustensilsSelectEvents;

  constructor() {
    // Services instanciations
    this.#urlService = new UrlService();
    this.#recipesService = new RecipesService();
    
    // Template instanciations
    this.#recipesTemplate = new RecipesTemplate();

    // Events utils instanciations
    this.#searchAllFormEvents = new FormSearchAllEvents("recipes-search-all-form");
    
    this.#ingredientSelectEvents = new FormSelectEvents("ingredients", this.#urlService, true);
    this.#applianceSelectEvents = new FormSelectEvents("appliance", this.#urlService);
    this.#ustensilsSelectEvents = new FormSelectEvents("ustensils", this.#urlService, true);

    this.#initRecipes();
  }

  async #initRecipes() {
    this.#recipesList = await this.#recipesService.getAllRecipes();
    this.#recipesTemplate.displayData(this.#recipesList);
  }
  
  /**
   * Create events of /index.html page
   */
  createEvents() {
    this.#searchAllFormEvents.createEvents();

    this.#ingredientSelectEvents.createEvents();
    this.#applianceSelectEvents.createEvents();
    this.#ustensilsSelectEvents.createEvents();
  }
}