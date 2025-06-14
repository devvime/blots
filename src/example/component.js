import Component from "../component.js";
import html from "./component.html";

export default class ExampleComponent extends Component {
  target = "app";
  template = html;

  constructor(params, query) {
    super(params, query);
    this.render();
  }

  init() {
    this.component.name = "Victor";
    this.component.title = "Hello World!";
    this.component.showMessage = true;
    this.component.items = ["Maçã", "Banana", "Laranja"];
    this.component.isActive = false;
    this.component.user = {
      name: "Steve",
      address: {
        street: "Rua de test",
      },
    };
  }

  setMethods() {
    this.component.sayHello = () => alert("Olá!");

    this.component.testIf = () => {
      this.component.showMessage = !this.component.showMessage;
    };

    this.component.updateTitle = (e) => {
      this.component.items = [...this.component.items, e.target.value];
    };

    this.component.toggle = () => {
      this.component.isActive = !this.component.isActive;
    };
  }
}
