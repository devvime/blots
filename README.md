# **Blots.js**

**Blots.js** is a lightweight JavaScript micro-framework for SPAs, offering:

- 📍 **Routing system** with support for path and query parameters
- 🧠 **Template engine** using custom HTML attributes
- ⚡ **Reactivity** powered by native JavaScript `Proxy` objects

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
  console.log("Route Params:", params);
  console.log("Query String Params:", query);
});

// Start routing
router.resolve();
```

---

## 🧩 Creating a Component

```js
import { render, include, state } from "blots";
import htmlElement from "./my-component.html?raw";
import headerElement from "@components/header/header.html?raw";
import footerElement from "@components/footer/footer.html?raw";

const data = state(
  {
    refs: {},
    title: "Hello from my component",
    displayCondition: false,
    activeClass: true,
    testClick(e) {
      console.log(e);
      data.displayCondition = !data.displayCondition;
      data.activeClass = !data.activeClass;
      console.log(data.refs.btnAddLesson);
    },
    inputChange(e) {
      data.title = e.target.value;
    },
  },
  intro
);

export function myComponent(params, query) {
  render("app", htmlElement, data);
  include("header-element", headerElement);
  include("footer-element", footerElement);
}
```

---

## 🧬 HTML Bindings

```html
<section>
  <style>
    .my-class {
      background-color: yellow;
    }
  </style>

  <!-- Menu component mount point -->
  <menu-element></menu-element>

  <!-- {{ prop }}: displays a reactive property -->
  <h1>{{ title }}</h1>
  <p>{{ name }}</p>

  <!-- Conditional rendering with @if -->
  <p @if="displayText">Conditional text</p>
  <button @click="setDisplayText">Toggle Text</button>

  <hr />

  <!-- Inputs with events and data binding -->
  <div>
    <input type="text" placeholder="Search..." @change="search" @ref="search" />
    <input type="text" placeholder="Bound to title" @model="title" />
    <input type="text" placeholder="Bound to name" @model="name" />
  </div>

  <hr />

  <!-- Actions -->
  <button @click="increment">Add</button>
  <button @click="reset">Reset</button>

  <p>Users: {{ count }}</p>

  <hr />

  <!-- Conditional class -->
  <div @class="{ 'my-class': !displayText }">
    <!-- Iteration with loop -->
    {{# users }}
    <p>Name: {{ name }} - Email: {{ email }}</p>
    {{/ users }}
  </div>
</section>
```

---

## 🧭 Defining Routes with Components

```js
import { Router } from "blots";
import myComponent from "./components/my-component.js";

const router = new Router();

// Each route can instantiate a different component
router.add("/user/:id/:name", myComponent);

// Start the router
router.resolve();
```

---

## 🗂 index.html Structure

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Blots App</title>
  </head>
  <body>
    <a href="/">Home</a>
    <a href="/user/10/steve?test=true">User</a>

    <!-- App root -->
    <app></app>

    <script type="module" src="./main.js"></script>
  </body>
</html>
```

---

## 📝 Final Notes

- Imported `.html` files are automatically processed as templates.
- Reactive properties automatically update the DOM when changed.
- Full support for **deep reactivity** and **two-way data binding**.
- Core integration with the DOM is done using custom attributes like `@click`, `@model`, `@if`, `@ref`, and `@class`.
