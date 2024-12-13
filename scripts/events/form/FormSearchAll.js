export default class FormSearchAllEvents {
  // Elements DOM
  #formDOM;

  constructor(id) {
    this.#formDOM = document.querySelector(`#${id}`);
    if (!this.#formDOM)
      throw new ReferenceError(`Form element with ID '${id}' not found.`)
  }

  createEvents() {
    // TODO : add events of the form
  }
}