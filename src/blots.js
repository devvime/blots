import { textNode } from "./core/textNode.js";
import { elements } from "./core/elements.js";

export default function blots(rootSelector, data, methods) {
  const root = document.querySelector(rootSelector);

  function parseBindings(node) {
    textNode(data, node);
    elements(node, data, methods, parseBindings);
  }

  parseBindings(root);
}
