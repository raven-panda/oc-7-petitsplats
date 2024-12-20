export default class FormSelectEvents {
  // State props
  #id;

  // Url service
  #urlService;

  // Elements DOM
  #containerDOM;
  #selectButtonDOM;
  #tagSearchBarDOM;
  #itemsListDOM;

  constructor(id, urlService) {
    if (!id)
      throw new ReferenceError(`Parameter id must be specified.`)
    if (!urlService)
      throw new ReferenceError(`Select event fed with ID 'input-select_${id}' is missing 'UrlService' parameter.`)

    this.#id = id;
    this.#urlService = urlService;

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
    e.preventDefault();
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
    this.#urlService.pushValueUrlParam(this.#id, e.currentTarget.textContent);
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

    // Creating event listeners
    this.#selectButtonDOM.addEventListener("click", this.buttonClickEvent);
    document.addEventListener("click", this.outsideClickEvent);
    this.#tagSearchBarDOM.addEventListener("input", this.tagSearchInputEvent);
    this.#itemsListDOM.childNodes.forEach(node => node.addEventListener("click", this.clickListItemEvent));
  }

  recreateListEvents() {
    
  }

}