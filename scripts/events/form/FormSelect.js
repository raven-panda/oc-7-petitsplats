export default class FormSelectEvents {
  // Elements DOM
  #containerDOM;
  #selectButtonDOM;

  // State properties
  #isActive;

  constructor(id) {
    this.#containerDOM = document.querySelector(`#${id}`);
    if (!this.#containerDOM)
      throw new ReferenceError(`Select container element with ID '${id}' not found.`)

    this.#selectButtonDOM = this.#containerDOM.querySelector("button");
    if (!this.#selectButtonDOM)
      throw new ReferenceError(`Button element in Select container with ID '${id}' not found.`);
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

    // Creating event listeners
    this.#selectButtonDOM.addEventListener("click", this.buttonClickEvent)
    document.addEventListener("click", this.outsideClickEvent)
  }

}