import StringUtils from "../../utils/StringUtils.js";

export default class FormSearchAllEvents {
  // Properties
  #id;

  // Services
  #urlService;
  #onChangeCallback;
  
  // Elements DOM
  /**
   * @type {HTMLFormElement}
   */
  #formDOM;
  /**
   * @type {HTMLInputElement}
   */
  #inputDOM;
  #clearInputBtnDOM;

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

    this.#clearInputBtnDOM = document.querySelector(`button#${this.#id}_clear-input-button`);
    if (!this.#clearInputBtnDOM)
      throw new ReferenceError(`Button element with ID '${this.#id}_clear-input-button' not found.`);
  }

  createEvents() { 
    this.onFormSubmitCallback = this.onFormSubmitCallback.bind(this);
    this.onInputChangeCallback = this.onInputChangeCallback.bind(this);
    this.onClearButtonCallback = this.onClearButtonCallback.bind(this);
    this.#formDOM.addEventListener("submit", this.onFormSubmitCallback);
    this.#inputDOM.addEventListener("input", this.onInputChangeCallback);
    this.#clearInputBtnDOM.addEventListener("click", this.onClearButtonCallback);
  }

  onInputChangeCallback(e) {
    if (!!e.currentTarget.value) {
      this.#clearInputBtnDOM.classList.remove("d-none");
    } else {
      this.#clearInputBtnDOM.classList.add("d-none");
    }
  }

  onClearButtonCallback(e) {
    this.#inputDOM.value = "";
    this.#clearInputBtnDOM.classList.add("d-none");
    this.onFormSubmitCallback();
  }

  onFormSubmitCallback(e) {
    e?.preventDefault();
    const formData = new FormData(this.#formDOM);
    
    if (!!formData.get("input-query")) {
      this.#urlService.setUrlParam("input-query", formData.get("input-query"));
    } else {
      this.#urlService.removeParam("input-query");
    }

    this.#onChangeCallback();
  }
}