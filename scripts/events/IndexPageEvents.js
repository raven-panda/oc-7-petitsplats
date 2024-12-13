import FormSelectEvents from "./form/FormSelect.js";

export default class IndexPageEvents {
  ingredientSelectDOM;
  applianceSelectDOM;
  ustensilsSelectDOM;

  constructor() {
    this.ingredientSelectEvents = new FormSelectEvents("input-select_ingredients");
    this.applianceSelectDOM = new FormSelectEvents("input-select_appliance");
    this.ustensilsSelectDOM = new FormSelectEvents("input-select_ustensils");
  }
  
  createEvents() {
    this.ingredientSelectEvents.createEvents();
    this.applianceSelectDOM.createEvents();
    this.ustensilsSelectDOM.createEvents();
  }
}