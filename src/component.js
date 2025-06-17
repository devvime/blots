import { blots } from "./blots.js";
import { state } from "./state.js";

import { router } from "./main.js";

export class Component {
  component = {};
  target = "app";
  template = "";
  params = {};
  query = {};
  componentChilds = [];

  constructor(params = {}, query = {}) {
    this.params = params;
    this.query = query;

    this.component = state({}, () => {
      this.render();
    });

    this.component.navigate = (e) => this.navigate(e);

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

  addComponent(component, data = []) {
    this.componentChilds.push(new component(this.params, this.query, data));
  }

  navigate(e) {
    router.navigate(e.target.getAttribute("data-path"));
  }

  render() {
    if (document.querySelector(this.target)) {
      document.querySelector(this.target).innerHTML = this.template;
      blots(this.target, this.component, this.component);
    }
    this.componentChilds.forEach((item) => {
      item.render();
    });
  }
}
