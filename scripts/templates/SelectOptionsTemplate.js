import FormSelectEvents from "../events/form/FormSelect.js";

export default class SelectOptionsTemplate {
  // Component props
  #id;
  #isMultiSelect;

  // Events props
  #selectEvents

  // DOM Elements props
  #containerDOM;
  #itemsListDOM;

  constructor(id, urlService, isMultiSelect = false) {
    if (!id)
      throw new ReferenceError(`Parameter 'id' must be specified.`)
    this.#id = id;
    this.#isMultiSelect = isMultiSelect;

    this.#containerDOM = document.querySelector(`#input-select_${id}`);
    if (!this.#containerDOM)
      throw new ReferenceError(`Select container element with ID 'input-select_${id}' not found.`)

    this.#itemsListDOM = this.#containerDOM.querySelector("ul.lpp_select-list");
    if (!this.#itemsListDOM)
      throw new ReferenceError(`Ul element with class 'lpp_select-list' in Select container 'input-select_${id}' not found.`);

    this.#selectEvents = new FormSelectEvents(id, urlService, isMultiSelect);
  }

  #filterElements(recipesList) {
    const selectItems = [];

    recipesList.forEach(recipe => {      
      if (!recipe[this.#id])
        return console.error(`'${id}' property not found in a given recipe`);   
      
      if (this.#isMultiSelect)
        recipe[this.#id]?.forEach(item => this.#id === "ingredients" ? 
          !selectItems.includes(item.ingredient.toLowerCase()) && selectItems.push(item.ingredient.toLowerCase())
          : !selectItems.includes(item.toLowerCase()) && selectItems.push(item.toLowerCase())
        );
      else
        !selectItems.includes(recipe[this.#id].toLowerCase()) && selectItems.push(recipe[this.#id].toLowerCase());
    })

    return selectItems.sort((a, b) => a < b ? -1 : a > b ? 1 : 0).map(item => ({ id: this.#normalizeItemName(item), label: item }));
  }

  #normalizeItemName(name) {
    return name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s/g, "_");
  }

  /**
   * 
   * @param {{ id: number, label: string }[]} items 
   */
  #addOptionsToList(items) {
    items.forEach((item) => {
      const listItemDOM = document.createElement("li");
      listItemDOM.dataset.id = item.id;
      listItemDOM.textContent = item.label.charAt(0).toUpperCase() + item.label.substring(1);

      this.#itemsListDOM.appendChild(listItemDOM);
    })
  }

  displayData(recipesList) {
    const selectItemsElements = this.#filterElements(recipesList);
    
    this.#addOptionsToList(selectItemsElements);
    this.#selectEvents.createEvents();
    this.#selectEvents.processSelections();
  }
  
}