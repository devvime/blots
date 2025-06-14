import { getValueFromData } from "./getValueFromData.js";
import { setDeepValue } from "./setDeepValue.js";
import { parseClassMap } from "./parseClassMap.js";

export function elements(node, data, methods, parseBindings) {
  if (node.nodeType === 1) {
    [...node.attributes].forEach((attr) => {
      const name = attr.name;
      const value = attr.value;

      if (name === "@click") node.addEventListener("click", methods[value]);

      if (name === "@change") handleChange(node, methods, value);

      if (name === "@input") handleInput(node, methods)

      if (name === "@value") handleValue(node, data, value)

      if (name === "@model") handleModel(node, data, value);

      if (name === "@if") handleIf(node, data, value)

      if (name === "@else") handleElse(node, data, value)

      if (name === "@for") handleFor(node, data, value);

      if (name === "@class") handleClass(node, value, data);
    });
  }

  [...node.childNodes].forEach((child) => parseBindings(child));
}

function handleChange(node, methods, value) {
  node.addEventListener("change", (e) => {
    if (methods[value]) methods[value](e);
  });
}

function handleInput(node, methods) {
  node.addEventListener("input", (e) => {
    if (methods[value]) methods[value](e);
  });
}

function handleValue(node, data, value) {
  node.value = getValueFromData(data, value) ?? "";
}

function handleModel(node, data, value) {
  node.value = getValueFromData(data, value) ?? "";
  node.addEventListener("input", (e) => {
    setDeepValue(data, value, e.target.value);
    const name = e.target.getAttribute("@name");
    document.querySelector(`[\\@name="${name}"]`).focus();
  });
}

function handleIf(node, data, value) {
  if (!getValueFromData(data, value)) node.remove();
}

function handleElse(node, data, value) {
  if (getValueFromData(data, value)) node.remove();
}

function handleFor(node, data, value) {
  const [itemName, , listName] = value.split(" ");
  const list = getValueFromData(data, listName);
  if (Array.isArray(list)) {
    const parent = node.parentElement;
    list.forEach((item) => {
      const clone = node.cloneNode(true);
      clone.removeAttribute("@for");
      clone.innerHTML = clone.innerHTML.replace(
        new RegExp(`{{\\s*${itemName}\\s*}}`, "g"),
        item
      );
      parent.insertBefore(clone, node);
    });
    node.remove();
  }
}

function handleClass(node, value, data) {
  try {
    const classMap = parseClassMap(value, data);
    for (const className in classMap) {
      const resolved = classMap[className];
      if (resolved) {
        node.classList.add(className);
      } else {
        node.classList.remove(className);
      }
    }
  } catch (e) {
    console.error("Error when interpreting @class:", e);
  }
}
