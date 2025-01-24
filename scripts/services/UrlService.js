import StringUtils from "../utils/StringUtils.js";

export default class UrlService {
  #url;
  #searchParams;

  constructor() {
    this.#url = new URL(document.location.href);
    this.#searchParams = this.#url.searchParams;
  }

  /**
   * @param {string} name Name of url parameter to get value of
   */
  getUrlParam(name) {
    const paramValue = JSON.parse(this.#searchParams.get(name));    
    return Array.isArray(paramValue) ? paramValue : StringUtils.escapeHtml(paramValue);
  }

  /**
   * @param {string} name Name of array url parameter to push value in
   * @param {string} value Value of url parameter to push in given parameter
   */
  pushValueUrlParam(name, value) {
    const currentValue = JSON.parse(this.#searchParams.get(name)) ?? [];
    if (!currentValue.includes(value))
      currentValue.push(value);
    this.#searchParams.set(name, JSON.stringify(currentValue));
    history.pushState({}, "", this.#url.href);
  }

  /**
   * @param {string} name Name of array url parameter to push value in
   * @param {string} value Value of url parameter to push in given parameter
   */
  deleteFromArrayValueUrlParam(name, value) {
    const currentValue = JSON.parse(this.#searchParams.get(name)) ?? [];
    let finalValue = currentValue.filter(curr => curr !== value);

    if (!!finalValue.length && finalValue.length > 0) {
      this.#searchParams.set(name, JSON.stringify(finalValue));
    } else {
      this.#searchParams.delete(name);
    }
    
    history.pushState({}, "", this.#url.href);
  }

  /**
   * @param {string} name Name of url parameter to create
   * @param {string} value Value of url parameter to create
   */
  setUrlParam(name, value) {
    this.#searchParams.set(name, JSON.stringify(value));
    history.pushState({}, "", this.#url.href);
  }

  /**
   * @param {string} name Name of url parameter to delete
   */
  removeParam(name) {
    this.#searchParams.delete(name);
    history.pushState({}, "", this.#url.href);
  }

}