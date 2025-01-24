import IndexPageEvents from "../events/IndexPageEvents.js";

export default class IndexPage {
  #indexPageEvents;

  constructor() {
    this.#indexPageEvents = new IndexPageEvents();
  }
  
  initializeEvents() {
    this.#indexPageEvents.createEvents();
  }

  init() {
    this.initializeEvents();
  }
}

const page = new IndexPage().init();
