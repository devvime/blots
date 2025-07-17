function resolvePath(obj, path) {
  return path.split(".").reduce((o, key) => (o ? o[key] : undefined), obj);
}

function setPath(obj, path, value) {
  const keys = path.split(".");
  const last = keys.pop();
  const target = keys.reduce((o, key) => (o ? o[key] : undefined), obj);
  if (target && last) target[last] = value;
}

export function click(element, data) {
  const elements = element.querySelectorAll("[\\@click]");
  for (let element of elements) {
    const attrValue = element.getAttribute("@click");
    const [method, param] = attrValue.replace(")", "").split("(");
    element.addEventListener("click", (e) => {
      const fn = resolvePath(data, method);
      if (typeof fn === "function") {
        fn.call(data, param);
      } else {
        console.warn(`Method: ${method} is not implemented.`);
      }
    });
    element.removeAttribute("@click");
  }
}

export function change(element, data) {
  const elements = element.querySelectorAll("[\\@change]");
  for (let element of elements) {
    const attrValue = element.getAttribute("@change");
    const [method, param] = attrValue.replace(")", "").split("(");
    element.addEventListener("change", (e) => {
      const fn = resolvePath(data, method);
      if (typeof fn === "function") {
        fn.call(data, e, param);
      } else {
        console.warn(`Method: ${method} is not implemented.`);
      }
    });
    element.removeAttribute("@change");
  }
}

export function model(element, data) {
  const elements = element.querySelectorAll("[\\@model]");
  for (let element of elements) {
    const attr = element.getAttribute("@model");
    data.refs ||= {};
    data.refs[attr] = element;

    const value = resolvePath(data, attr);
    element.value = value ?? "";

    element.addEventListener("input", (e) => {
      if (resolvePath(data, attr) === undefined) {
        console.warn(`Property: ${attr} is not implemented.`);
      } else {
        setPath(data, attr, e.target.value);
        data.refs[attr].focus();
      }
    });

    element.removeAttribute("@model");
  }
}

export function condition(element, data) {
  const elements = element.querySelectorAll("[\\@if]");
  for (let element of elements) {
    const conditionExpr = element.getAttribute("@if");

    try {
      const value = resolvePath(data, conditionExpr);
      if (!value) {
        element.remove();
      }
    } catch (err) {
      console.warn(`@if error: ${err}`);
    }

    element.removeAttribute("@if");
  }
}

export function handleClass(element, data) {
  const elements = element.querySelectorAll("[\\@class]");
  for (let element of elements) {
    const raw = element.getAttribute("@class");
    const [classNameRaw, conditionPathRaw] = raw
      .replace("{", "")
      .replace("}", "")
      .split(":");

    const className = classNameRaw.trim().replace(/['"`]/g, "");
    const conditionPath = conditionPathRaw.trim();

    try {
      const condition = resolvePath(data, conditionPath);

      if (condition) {
        element.classList.add(className);
      } else {
        element.classList.remove(className);
      }
    } catch (err) {
      console.warn(`@class error: Property ${conditionPath} is undefined`);
    }

    element.removeAttribute("@class");
  }
}

export function refs(element, data) {
  const elements = element.querySelectorAll("[\\@ref]");
  for (let element of elements) {
    const attr = element.getAttribute("@ref");
    data.refs ||= {};
    data.refs[attr] = element;
    element.removeAttribute("@ref");
  }
}
