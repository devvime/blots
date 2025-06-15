import Component from "../component.js";
import html from "./component.html";

export default class ExampleComponent extends Component {
  target = "app";
  template = html;

  constructor(params, query) {
    super(params, query);
  }

  init() {
    this.setData({
      name: "Steve",
      title: "Hello World!",
      showMessage: true,
      items: ["Cup", "Book", "Game"],
      isActive: false,
      user: {
        name: "CJ",
        address: {
          street: "Groove street",
        },
      },
    });
    this.setMethods({
      sayHello: () => alert("Olá!"),
      testIf: () => this.testIf(),
      updateTitle: (e) => this.updateTitle(e),
      toggle: () => this.toggle(),
    });
  }

  testIf() {
    this.setData({
      showMessage: !this.getData("showMessage"),
    });
  }

  updateTitle(e) {
    this.setData({
      items: [...this.getData("items"), e.target.value],
    });
  }

  toggle() {
    this.setData({
      isActive: !this.getData("isActive"),
    });
  }
}
