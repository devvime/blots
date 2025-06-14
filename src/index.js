import { Router } from "./router.js";
import blots from "./blots.js";
import { state } from "./state.js";

import template from "./component.html";

const router = new Router();

router.add("/", async () => {
  const data = state(
    {
      name: "Victor",
      title: "Olá mundo!",
      showMessage: true,
      items: ["Maçã", "Banana", "Laranja"],
      isActive: false,
      user: {
        name: 'Steve',
        address: {
          street: 'Rua de test'
        }
      },
      methods: {
        sayHello: () => alert("Olá!"),
        testIf: () => {
          data.showMessage = !data.showMessage;
        },
        updateTitle: (e) => {
          data.items = [...data.items, e.target.value];
        },
        toggle: () => {
          data.isActive = !data.isActive;
        },
      },
    },
    () => {
      document.querySelector("app").innerHTML = template;
      blots("app", data, data.methods);
    }
  );

  document.querySelector("app").innerHTML = template;
  blots("app", data, data.methods);
});

router.add("/user/:id/:name", (params, query) => {
  console.log("Params:", params);
  console.log("Query:", query);
});

router.resolve();
