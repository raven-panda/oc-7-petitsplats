import UrlService from "../services/UrlService.js";
import FormSearchAllEvents from "./form/FormSearchAll.js";
import FormSelectEvents from "./form/FormSelect.js";

export default class IndexPageEvents {
  // Services props
  #urlService;

  // Events props
  #searchAllFormEvents;

  #ingredientSelectEvents;
  #applianceSelectEvents;
  #ustensilsSelectEvents;

  constructor() {
    // Services instanciations
    this.#urlService = new UrlService();

    // Events utils instanciations
    this.#searchAllFormEvents = new FormSearchAllEvents("recipes-search-all-form");

    this.#ingredientSelectEvents = new FormSelectEvents("ingredients", this.#urlService);
    this.#applianceSelectEvents = new FormSelectEvents("appliance", this.#urlService);
    this.#ustensilsSelectEvents = new FormSelectEvents("ustensils", this.#urlService);
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