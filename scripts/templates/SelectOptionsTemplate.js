import FormSelectEvents from "../events/form/FormSelect.js";
import StringUtils from "../utils/StringUtils.js";
import SvgDOM from "./dom/SvgDOM.js";

export default class SelectOptionsTemplate {
  // Component props
  #id;
  #isMultiSelect;

  // Services props
  #urlService;

  // Events props
  #selectEvents;

  // DOM Elements props
  #containerDOM;
  #itemsListDOM;
  #selectedTagsContainerDOM;

  constructor(id, urlService, onChangeCallback, isMultiSelect = false) {
    if (!id)
      throw new ReferenceError("Parameter 'id' must be specified.");
    if (!!isMultiSelect && !(isMultiSelect instanceof Boolean))
      throw new ReferenceError("Parameter 'isMultiSelect' must be a boolean.");
    
    const escapedId = StringUtils.escapeHtml(id);
    this.#id = escapedId;
    this.#urlService = urlService;
    this.#isMultiSelect = isMultiSelect;

    this.#containerDOM = document.querySelector(`#input-select_${escapedId}`);
    if (!this.#containerDOM)
      throw new ReferenceError(`Select container element with ID 'input-select_${escapedId}' not found.`);

    this.#itemsListDOM = this.#containerDOM.querySelector("ul.lpp_select-list");
    if (!this.#itemsListDOM)
      throw new ReferenceError(`Ul element with class 'lpp_select-list' in Select container 'input-select_${escapedId}' not found.`);

    this.#selectEvents = new FormSelectEvents(escapedId, urlService, onChangeCallback, isMultiSelect);
    this.#selectedTagsContainerDOM = document.querySelector("#lpp_selected-tags-container");
  }

  #filterElements(recipesList) {
    const selectItems = [];

    recipesList.forEach(recipe => {      
      if (!recipe[this.#id])
        return console.error(`'${this.#id}' property not found in a given recipe`);   
      
      if (this.#isMultiSelect) {
        recipe[this.#id]?.forEach(item => {
          const escapedItem = this.#id === "ingredients" ? StringUtils.escapeHtml(item.ingredient) : StringUtils.escapeHtml(item);

          return !selectItems.includes(escapedItem.toLowerCase()) && selectItems.push(escapedItem.toLowerCase());
        });
      } else {
        const escapedItem = StringUtils.escapeHtml(recipe[this.#id]);
        !selectItems.includes(escapedItem.toLowerCase()) && selectItems.push(escapedItem.toLowerCase());
      }
    });

    return selectItems.sort((a, b) => a < b ? -1 : a > b ? 1 : 0).map(item => ({ id: item, label: item }));
  }

  /**
   * 
   * @param {{ id: string, label: string }[]} items 
   */
  #addOptionsToList(items) {
    this.#createOptionsList(items);
  }

  /**
   * 
   * @param {{ id: string, label: string }[]} items 
   */
  #updateOptionsList(items) {
    for (let node of Array.from(this.#itemsListDOM.childNodes)) {
      if (!items.some(item => item.id === node.dataset.id)) {
        node.remove();
      }
    }

    this.#createOptionsList(items);

    const sortedNodes = Array.from(this.#itemsListDOM.childNodes)
      .sort((a, b) => a.dataset.id < b.dataset.id ? -1 : a.dataset.id > b.dataset.id ? 1 : 0);

    this.#itemsListDOM.innerHTML = "";
    sortedNodes.forEach(node => this.#itemsListDOM.appendChild(node));
  }
  
  /**
   * 
   * @param {{ id: string, label: string }[]} items 
   */
  #createOptionsList(items) {
    items.forEach((item) => {
      let alreadyExists = false;

      for (let node of Array.from(this.#itemsListDOM.childNodes)) {
        alreadyExists = node.dataset.id === item.id;
        if (alreadyExists)
          break;
      }

      if (!alreadyExists) {
        const listItemDOM = this.#getFilterLiDOM(item);
        this.#itemsListDOM.appendChild(listItemDOM);
      }
    });
  }

  /**
   * @param {{ id: string, label: string }} item
   * @returns {HTMLLIElement}
   */
  #getFilterLiDOM(item) {
    const listItemDOM = document.createElement("li");
    const itemLabel = StringUtils.escapeHtml(item.label);
    
    listItemDOM.dataset.id = StringUtils.escapeHtml(item.id);
    listItemDOM.textContent = itemLabel.charAt(0).toUpperCase() + itemLabel.substring(1);

    return listItemDOM;
  }

  /**
   * 
   * @param {{ id: string, label: string }[]} items 
   */
  #processSelections(items) {
    this.#removeFilteredOptions();
    const value = this.#urlService.getUrlParam(this.#id);    
    
    this.#createSelectedOptionsList(items.filter(item => value?.includes(item.id)));
    this.#selectEvents.processSelections(value);
  }

  #removeFilteredOptions() {
    this.#selectEvents.removeEvents();
    const itemsToRemove = this.#selectedTagsContainerDOM.querySelectorAll(`li[data-type="${this.#id}"]`);
    
    itemsToRemove.forEach(item => item.remove());
  }
  
  /**
   * 
   * @param {{ id: string, label: string }[]} items 
   */
  #createSelectedOptionsList(items) {
    items.forEach((item) => {
      const listItemDOM = this.#getFilterLiDOM(item);
      listItemDOM.dataset.type = this.#id;

      const deleteTagBtn = document.createElement("button");
      deleteTagBtn.classList.add("delete-tag", "btn", "outline-none", "p-1");
      deleteTagBtn.type = "button";
      deleteTagBtn.appendChild(SvgDOM.crossSvg());
      listItemDOM.appendChild(deleteTagBtn);

      this.#selectedTagsContainerDOM.appendChild(listItemDOM);
    });
  }

  displayData(recipesList) {
    const selectItemsElements = this.#filterElements(recipesList);
    
    this.#addOptionsToList(selectItemsElements);
    this.#selectEvents.createEvents();
    this.#processSelections(selectItemsElements);
  }

  updateData(recipesList) {
    this.#itemsListDOM = this.#containerDOM.querySelector("ul.lpp_select-list");
    this.#selectedTagsContainerDOM = document.querySelector("#lpp_selected-tags-container");

    const selectItemsElements = this.#filterElements(recipesList);
    
    this.#updateOptionsList(selectItemsElements);
    this.#processSelections(selectItemsElements);
  }
  
}