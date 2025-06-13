export default function blots(rootSelector, data, methods) {
  const root = document.querySelector(rootSelector);

  function parseBindings(node) {
    if (node.nodeType === 3) {
      // Text Node
      const matches = node.textContent.match(/{{\s*[\w.]+\s*}}/g);
      if (matches) {
        matches.forEach((match) => {
          const key = match.replace(/[{}]/g, "").trim();
          const value = getValueFromData(key);
          node.textContent = node.textContent.replace(match, value ?? "");
        });
      }
    }

    if (node.nodeType === 1) {
      // Element
      [...node.attributes].forEach((attr) => {
        const name = attr.name;
        const value = attr.value;

        if (name === "@click") {
          node.addEventListener("click", methods[value]);
        }

        if (name === "@change") {
          node.addEventListener("change", (e) => {
            if (methods[value]) methods[value](e);
          });
        }

        if (name === "@input") {
          node.addEventListener("input", (e) => {
            if (methods[value]) methods[value](e);
          });
        }

        if (name === "@value") {
          node.value = getValueFromData(value) ?? "";
        }

        if (name === "@model") {
          node.value = getValueFromData(value) ?? "";
          node.addEventListener("input", (e) => {
            data[value] = e.target.value;
            const name = e.target.getAttribute("@name");
            document.querySelector(`[\\@name="${name}"]`).focus();
          });
        }

        if (name === "@if") {
          if (!getValueFromData(value)) {
            node.remove();
          }
        }

        if (name === "@else") {
          if (getValueFromData(value)) {
            node.remove();
          }
        }

        if (name === "@for") {
          const [itemName, , listName] = value.split(" ");
          const list = getValueFromData(listName);
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

        if (name === "@class") {
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
      });
    }

    [...node.childNodes].forEach((child) => parseBindings(child));
  }

  function getValueFromData(key) {
    const parts = key.split(".");
    let val = data;
    for (const part of parts) {
      if (val && typeof val === "object") {
        val = val[part];
      } else {
        return undefined;
      }
    }
    return val;
  }

  parseBindings(root);
}

function parseClassMap(str, data) {
  const result = {};
  const objectBody = str.trim().slice(1, -1);
  const pairs = objectBody.split(",").map((p) => p.trim());

  for (const pair of pairs) {
    const [rawKey, rawExpr] = pair.split(":").map((s) => s.trim());
    const key = rawKey.replace(/^["']|["']$/g, "");

    try {
      const fn = new Function("data", `with(data) { return (${rawExpr}) }`);
      result[key] = fn(data);
    } catch (e) {
      console.warn(`Erro ao avaliar expressão para @class: ${rawExpr}`, e);
    }
  }

  return result;
}
