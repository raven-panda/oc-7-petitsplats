import FormSelectEvents from "../events/form/FormSelect.js";

export default class SelectOptionsTemplate {
  // Component props
  #id;
  #isMultiSelect;
  #onChangeCallback;

  // Services props
  #urlService;

  // Events props
  #selectEvents

  // DOM Elements props
  #containerDOM;
  #itemsListDOM;
  #selectedTagsContainerDOM;

  constructor(id, urlService, onChangeCallback, isMultiSelect = false) {
    if (!id)
      throw new ReferenceError(`Parameter 'id' must be specified.`)
    this.#id = id;
    this.#urlService = urlService;
    this.#onChangeCallback = onChangeCallback;
    this.#isMultiSelect = isMultiSelect;

    this.#containerDOM = document.querySelector(`#input-select_${id}`);
    if (!this.#containerDOM)
      throw new ReferenceError(`Select container element with ID 'input-select_${id}' not found.`)

    this.#itemsListDOM = this.#containerDOM.querySelector("ul.lpp_select-list");
    if (!this.#itemsListDOM)
      throw new ReferenceError(`Ul element with class 'lpp_select-list' in Select container 'input-select_${id}' not found.`);

    this.#selectEvents = new FormSelectEvents(id, urlService, onChangeCallback, isMultiSelect);
    this.#selectedTagsContainerDOM = document.querySelector("#lpp_selected-tags-container")
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

    return selectItems.sort((a, b) => a < b ? -1 : a > b ? 1 : 0).map(item => ({ id: item, label: item }));
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

  /**
   * 
   * @param {{ id: number, label: string }[]} items 
   */
  #updateOptionsList(items) {
    
  }

  #processSelections() {
    const value = this.#urlService.getUrlParam(this.#id);
    console.log({value});
    

    this.#selectEvents.removeEvents(value);
    const itemsToRemove = this.#selectedTagsContainerDOM.querySelectorAll(`li[data-type="${this.#id}"]`);
    
    itemsToRemove.forEach(item => item.remove());
    if (value) {
      this.#itemsListDOM.childNodes.forEach(node => {
        if (value.includes(node.dataset.id)) {
          const copiedNode = node.cloneNode(true);
          copiedNode.dataset.type = this.#id;
  
          const deleteTagBtn = document.createElement("button");
          deleteTagBtn.classList.add("delete-tag");
          deleteTagBtn.type = "button";
          deleteTagBtn.textContent = "delete"; // change to cross
          copiedNode.appendChild(deleteTagBtn);
  
          this.#selectedTagsContainerDOM.appendChild(copiedNode);
        }     
      });
    }

    this.#selectEvents.processSelections(value);
  }

  displayData(recipesList) {
    const selectItemsElements = this.#filterElements(recipesList);
    
    this.#addOptionsToList(selectItemsElements);
    this.#selectEvents.createEvents();
    this.#processSelections();
  }

  updateData(recipesList) {
    this.#itemsListDOM = this.#containerDOM.querySelector("ul.lpp_select-list");
    this.#selectedTagsContainerDOM = document.querySelector("#lpp_selected-tags-container")

    const selectItemsElements = this.#filterElements(recipesList);
    
    this.#updateOptionsList(selectItemsElements);
    this.#processSelections();
  }
  
}