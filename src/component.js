import blots from "./blots.js";
import { state } from "./state.js";

export default class Component {
  component = {};
  target = "app";
  template = "";
  params = {};
  query = {};

  constructor(params = {}, query = {}) {
    this.params = params;
    this.query = query;

    this.component = state({}, () => {
      this.render();
    });

    this.init();
    this.setMethods();
    this.render();
  }

  init() {}

  setMethods() {}

  render() {
    document.querySelector(this.target).innerHTML = this.template;
    blots(this.target, this.component, this.component);
  }
}
