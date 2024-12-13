import FormSelectEvents from "./form/FormSelect.js";

export default class IndexPageEvents {
  ingredientSelectDOM;

  constructor() {
    this.ingredientSelectEvents = new FormSelectEvents("input-select_ingredients");
  }
  
  createEvents() {
    this.ingredientSelectEvents.createEvents();
  }
}