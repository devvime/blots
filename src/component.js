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
    document.addEventListener("DOMContentLoaded", () => {
      this.render();
    });
  }

  init() {}

  setData(data = {}) {
    Object.keys(data).forEach((item) => {
      this.component[item] = data[item];
    });
  }

  getData(name) {
    return this.component[name];
  }

  setMethods(methods = {}) {
    Object.keys(methods).forEach((item) => {
      this.component[item] = methods[item];
    });
  }

  render() {
    document.querySelector(this.target).innerHTML = this.template;
    blots(this.target, this.component, this.component);
  }
}
