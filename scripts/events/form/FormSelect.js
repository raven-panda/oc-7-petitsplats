export default class FormSelectEvents {
  // Elements DOM
  #containerDOM;
  #selectButtonDOM;
  #tagSearchBarDOM;
  #itemsListDOM;

  // State properties
  #isActive;

  constructor(id) {
    this.#containerDOM = document.querySelector(`#${id}`);
    if (!this.#containerDOM)
      throw new ReferenceError(`Select container element with ID '${id}' not found.`)

    this.#selectButtonDOM = this.#containerDOM.querySelector("button");
    if (!this.#selectButtonDOM)
      throw new ReferenceError(`Button element in Select container with ID '${id}' not found.`);

    this.#tagSearchBarDOM = this.#containerDOM.querySelector(`input#${id}-search`);
    if (!this.#tagSearchBarDOM)
      throw new ReferenceError(`Input element with ID '${id}-search' in Select container ${id} not found.`);

    this.#itemsListDOM = this.#containerDOM.querySelector("ul.lpp_select-list");
    if (!this.#itemsListDOM)
      throw new ReferenceError(`Ul element with class 'lpp_select-list' in Select container ${id} not found.`);
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

    // Creating event listeners
    this.#selectButtonDOM.addEventListener("click", this.buttonClickEvent)
    document.addEventListener("click", this.outsideClickEvent)
    this.#tagSearchBarDOM.addEventListener("input", this.tagSearchInputEvent)
  }

}