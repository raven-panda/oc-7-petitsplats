export default class FormSelectEvents {
  // Component props
  #id;
  #isMultiSelect;
  #onChangeCallback;

  // Url service
  #urlService;

  // Elements DOM
  #containerDOM;
  #selectButtonDOM;
  #tagSearchBarDOM;
  #itemsListDOM;
  #selectedTagsListDOM;

  constructor(id, urlService, onChangeCallback, isMultiSelect = false) {
    if (!id)
      throw new ReferenceError(`Parameter id must be specified.`)
    if (!urlService)
      throw new ReferenceError(`Select event fed with ID 'input-select_${id}' is missing 'UrlService' parameter.`)

    this.#id = id;
    this.#urlService = urlService;
    this.#onChangeCallback = onChangeCallback;
    this.#isMultiSelect = isMultiSelect;

    this.#containerDOM = document.querySelector(`#input-select_${id}`);
    if (!this.#containerDOM)
      throw new ReferenceError(`Select container element with ID 'input-select_${id}' not found.`)

    this.#selectButtonDOM = this.#containerDOM.querySelector("button");
    if (!this.#selectButtonDOM)
      throw new ReferenceError(`Button element in Select container with ID 'input-select_${id}' not found.`);

    this.#tagSearchBarDOM = this.#containerDOM.querySelector(`input#input-select_${id}-search`);
    if (!this.#tagSearchBarDOM)
      throw new ReferenceError(`Input element with ID '${id}-search' in Select container 'input-select_${id}' not found.`);

    this.#itemsListDOM = this.#containerDOM.querySelector("ul.lpp_select-list");
    if (!this.#itemsListDOM)
      throw new ReferenceError(`Ul element with class 'lpp_select-list' in Select container 'input-select_${id}' not found.`);

    this.#selectedTagsListDOM = document.querySelector(`ul#lpp_selected-tags-container`);
    if (!this.#itemsListDOM)
      throw new ReferenceError(`Ul element with id 'lpp_selected-tags-container' not found.`);
  }
 
  /**
   * @public Button click event handler
   * @param {MouseEvent} e Event object
   */
  buttonClickEvent(e) {
    e.preventDefault();
    this.#toggleActive();
  }

  /**
   * @public Outside click event handler
   * @param {MouseEvent} e Event object
   */
  outsideClickEvent(e) {
    if (e.target !== this.#containerDOM && !this.#containerDOM.contains(e.target))
      this.#disable();
  }

  /**
   * @public Tag search event handler
   * @param {InputEvent} e Event object
   */
  tagSearchInputEvent(e) {
    e.preventDefault();
    const listItems = this.#itemsListDOM.querySelectorAll("li");  
    listItems.forEach(node => {
      if (e.currentTarget?.value && !node.textContent.toLowerCase().includes(e.currentTarget.value.toLowerCase())) {
        node.classList.add("d-none");
        node.setAttribute("ariaHidden", "true");
      } else {
        node.classList.remove("d-none");
        node.removeAttribute("ariaHidden");
      }
        
    })
  }

  /**
   * @public Tag search event handler
   * @param {MouseEvent} e Event object
   */
  clickListItemEvent(e) {
    e.preventDefault();
    if (this.#isMultiSelect)
      this.#urlService.pushValueUrlParam(this.#id, e.currentTarget.dataset.id);
    else
      this.#urlService.setUrlParam(this.#id, e.currentTarget.dataset.id);

    this.#onChangeCallback();
  }

  deleteListItemEvent(e) {
    e.preventDefault();
    
    if (this.#isMultiSelect)
      this.#urlService.deleteFromArrayValueUrlParam(this.#id, e.currentTarget.parentNode.dataset.id);
    else
      this.#urlService.removeParam(this.#id);

    this.#onChangeCallback();
  }

  processSelections(value) {
    this.#itemsListDOM.childNodes.forEach(node => {
      if (value?.includes(node.dataset.id)) {
        node.setAttribute("aria-selected", "true");
      } else {
        node.removeAttribute("aria-selected");
      }
    })

    this.updateListEvents();
  }

  #toggleActive() {
    this.#containerDOM.classList.toggle("active");
  }

  #disable() {
    this.#containerDOM.classList.remove("active");
  }

  /**
   * @public Binds all events of the form select
   */
  createEvents() {
    // Binding instance of this in the event handler
    this.buttonClickEvent = this.buttonClickEvent.bind(this);
    this.outsideClickEvent = this.outsideClickEvent.bind(this);
    this.tagSearchInputEvent = this.tagSearchInputEvent.bind(this);
    this.clickListItemEvent = this.clickListItemEvent.bind(this);
    this.deleteListItemEvent = this.deleteListItemEvent.bind(this);

    // Creating event listeners
    this.#selectButtonDOM.addEventListener("click", this.buttonClickEvent);
    document.addEventListener("click", this.outsideClickEvent);
    this.#tagSearchBarDOM.addEventListener("input", this.tagSearchInputEvent);
    this.#itemsListDOM.childNodes.forEach(node => node.addEventListener("click", this.clickListItemEvent));
  }

  updateListEvents() {
    this.deleteListItemEvent = this.deleteListItemEvent.bind(this);
    this.clickListItemEvent = this.clickListItemEvent.bind(this);

    const selectedList = this.#selectedTagsListDOM.querySelectorAll(`li[data-type="${this.#id}"]`);
    selectedList.forEach(node => node.querySelector("button.delete-tag").addEventListener("click", this.deleteListItemEvent));
    this.#itemsListDOM.childNodes.forEach(node => node.addEventListener("click", this.clickListItemEvent));
  }

  removeEvents() {
    const selectedList = this.#selectedTagsListDOM.querySelectorAll(`li[data-type="${this.#id}"]`);
    selectedList.forEach(node => node.querySelector("button.delete-tag").removeEventListener("click", this.deleteListItemEvent));
    this.#itemsListDOM.childNodes.forEach(node => node.removeEventListener("click", this.clickListItemEvent));
  }

}