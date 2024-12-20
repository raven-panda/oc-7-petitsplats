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
    return this.#searchParams.get(name);
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
   * @param {string} name Name of url parameter to create
   * @param {string} value Value of url parameter to create
   */
  setUrlParam(name, value) {
    this.#searchParams.set(name, value);
    history.pushState({}, "", this.#url.href);
  }

  /**
   * @param {string} name Name of url parameter to delete
   */
  removeParam(name) {
    this.#searchParams.delete(param);
    history.pushState({}, "", this.#url.href);
  }

}