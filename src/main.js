import { Router } from "./router.js";
import ExampleComponent from "./example/component.js";

export const router = new Router();

router.add("/", (params, query) => new ExampleComponent(params, query));

router.add("/user/:id/:name", (params, query) => {
  console.log("Params:", params);
  console.log("Query:", query);
});

router.resolve();
