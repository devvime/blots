# **Blots.js**

**Blots.js** is a lightweight JavaScript SPA micro-framework that provides:

- **Routing system** with path and query parameters
- **Template engine** using custom HTML attributes
- **Reactivity** powered by native `Proxy` objects

---

## 📦 Installation

```bash
npm i blots
```

---

## 🚀 Basic Initialization

```js
import { Router } from "blots";

const router = new Router();

// Define routes
router.add("/user/:id/:name", (params, query) => {
  console.log("URL Params:", params);
  console.log("Query String Params:", query);
});

// Initialize routing
router.resolve();
```

---

## 🧩 Creating a Component

```js
import Component from "blots";
import html from "./my-component.html"; // Import the HTML file

export default class MyComponent extends Component {
  target = "app"; // Target element for rendering
  template = html; // Template HTML

  constructor(params, query) {
    super(params, query);
  }

  init() {
    // Set reactive data
    this.setData({
      name: "Steve",
      title: "Hello World!",
      showMessage: true,
      items: ["Cup", "Book", "Game"],
      isActive: false,
      user: {
        name: "Steve",
        address: {
          street: "Street name",
        },
      },
    });

    // Set reactive methods
    this.setMethods({
      sayHello: () => alert("Hello!"),
      updateShowMessage: () => this.updateShowMessage(),
      addItem: (e) => this.addItem(e),
      toggleIsActive: () => this.toggleIsActive(),
    });
  }

  updateShowMessage() {
    this.setData({
      showMessage: !this.getData("showMessage"),
    });
  }

  addItem(e) {
    this.setData({
      items: [...this.getData("items"), e.target.value],
    });
  }

  toggleIsActive() {
    this.setData({
      isActive: !this.getData("isActive"),
    });
  }
}
```

> Use `this.setData({})` to define reactive properties, and `this.getData('propName')` to access them.

---

## 🧬 HTML Bindings

```html
<!-- {{ prop }}: Displays a reactive property -->
<h1>{{ title }}</h1>

<!-- @change: Triggers a method defined via setMethods -->
<input type="text" @change="addItem" />

<!-- @click: Executes defined methods -->
<button @click="sayHello">Click me</button>
<button @click="updateShowMessage">Toggle Message</button>

<!-- @for: Loops through a reactive array -->
<ul>
  <li @for="item in items">{{ item }}</li>
</ul>

<!-- @if: Conditional rendering -->
<p @if="showMessage">Message is visible</p>

<!-- @class: Toggles CSS classes based on reactive data -->
<button @click="toggleIsActive" @class="{ active: isActive }">
  <span @if="isActive">Deactivate</span>
  <span @else="isActive">Activate</span>
</button>

<!-- @model: Two-way binding with input fields (requires unique @name) -->
<input type="text" @model="name" @name="inputName" />
<input type="text" @model="title" @name="inputTitle" />
<input type="text" @model="user.name" @name="inputUserName" />

<!-- Nested reactive properties -->
<p>Hello, {{ name }}!</p>
<p>User name: {{ user.name }}</p>
<p>Address: Street {{ user.address.street }}</p>
```

---

## 🧭 Defining Routes with Components

```js
import { Router } from "blots";
import MyComponent from "./components/my-component.js";

const router = new Router();

// Each route can return a new component instance
router.add(
  "/user/:id/:name",
  (params, query) => new MyComponent(params, query)
);

// Start the router
router.resolve();
```

---

## 🗂 index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Blots App</title>
  </head>
  <body>
    <a href="/" data-link>Home</a>
    <a href="/user/10/steve?test=true" data-link>User</a>

    <!-- Root -->
    <app></app>

    <script type="module" src="./main.js"></script>
  </body>
</html>
```

---

## 📝 Final Notes

- HTML templates are automatically processed when importing `.html` files.
- Reactive properties automatically update the DOM when modified.
- Deeply nested reactivity and two-way data binding are fully supported.
