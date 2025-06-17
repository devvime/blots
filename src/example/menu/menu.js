import { Component } from "../../component.js";
import html from "./menu.html";

export default class MenuComponent extends Component {
  target = "nav";
  template = html;

  constructor(params, query) {
    super(params, query);
  }

  init() {
    this.setData({});
    this.setMethods({});
  }
}
