import FormSearchAllEvents from "./form/FormSearchAll.js";
import FormSelectEvents from "./form/FormSelect.js";

export default class IndexPageEvents {
  // Events props
  #searchAllFormEvents;

  #ingredientSelectEvents;
  #applianceSelectEvents;
  #ustensilsSelectEvents;

  constructor() {
    this.#searchAllFormEvents = new FormSearchAllEvents("recipes-search-all-form");

    this.#ingredientSelectEvents = new FormSelectEvents("input-select_ingredients");
    this.#applianceSelectEvents = new FormSelectEvents("input-select_appliance");
    this.#ustensilsSelectEvents = new FormSelectEvents("input-select_ustensils");
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