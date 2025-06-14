import { getValueFromData } from "./getValueFromData.js";

export function textNode(data, node) {
  if (node.nodeType === 3) {
    const matches = node.textContent.match(/{{\s*[\w.]+\s*}}/g);
    if (matches) {
      matches.forEach((match) => {
        const key = match.replace(/[{}]/g, "").trim();
        const value = getValueFromData(data, key);
        node.textContent = node.textContent.replace(match, value ?? "");
      });
    }
  }
}
