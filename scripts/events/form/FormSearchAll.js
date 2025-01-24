import StringUtils from "../../utils/StringUtils.js";

export default class FormSearchAllEvents {
  // Properties
  #id;
  
  // Elements DOM
  /**
   * @type {HTMLFormElement}
   */
  #formDOM;
  #inputDOM;
  #urlService;
  #onChangeCallback;

  constructor(id, urlService, onChangeCallback) {
    if (!id)
      throw new ReferenceError(`Parameter ID must be defined.`)

    this.#id = StringUtils.escapeHtml(id);
    this.#urlService = urlService;
    this.#onChangeCallback = onChangeCallback;

    this.#formDOM = document.querySelector(`#${this.#id}`);
    if (!this.#formDOM)
      throw new ReferenceError(`Form element with ID '${this.#id}' not found.`);

    this.#inputDOM = document.querySelector(`#${this.#id}_input`);
    if (!this.#inputDOM)
      throw new ReferenceError(`Input element with ID '${this.#id}_input' not found.`);
  }

  createEvents() { 
    this.onFormSubmitCallback = this.onFormSubmitCallback.bind(this);
    this.#formDOM.addEventListener("submit", this.onFormSubmitCallback);
  }

  onFormSubmitCallback(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    if (!!formData.get("input-query")) {
      this.#urlService.setUrlParam("queryString", formData.get("input-query"));
    } else {
      this.#urlService.removeParam("queryString");
    }

    this.#onChangeCallback();
  }
}