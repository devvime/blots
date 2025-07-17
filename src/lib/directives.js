export function click(element, data) {
  const elements = element.querySelectorAll("[\\@click]");
  for (let element of elements) {
    const attr = element.attributes["@click"].value.replace(")", "").split("(");
    element.addEventListener("click", (e) => {
      try {
        data[attr[0]](attr[1]);
      } catch (err) {
        console.warn(`Method: ${attr[0]} is not implemented.`);
      }
    });
    element.removeAttribute("@click");
  }
}

export function change(element, data) {
  const elements = element.querySelectorAll("[\\@change]");
  for (let element of elements) {
    const attr = element.attributes["@change"].value
      .replace(")", "")
      .split("(");
    element.addEventListener("change", (e) => {
      try {
        data[attr[0]](e, attr[1]);
      } catch (err) {
        console.warn(`Method: ${attr[0]} is not implemented.`);
      }
    });
    element.removeAttribute("@change");
  }
}

export function model(element, data) {
  const elements = element.querySelectorAll("[\\@model]");
  for (let element of elements) {
    const attr = element.attributes["@model"].value;
    data.refs[attr] = element;
    element.value = data[attr];
    element.addEventListener("input", (e) => {
      if (data[attr] === undefined) {
        console.warn(`Property: ${attr[0]} is not implemented.`);
      } else {
        data[attr] = e.target.value;
        data.refs[attr].focus();
      }
    });
    element.removeAttribute("@model");
  }
}

export function condition(element, data) {
  const elements = element.querySelectorAll("[\\@if]");
  for (let element of elements) {
    const attr = element.attributes["@if"].value;
    try {
      if (!eval(`data?.${attr}`)) {
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
    const attr = element.attributes["@class"].value
      .replace("{", "")
      .replace("}", "")
      .split(":");

    const className = attr[0]
      .replaceAll("'", "")
      .replaceAll('"', "")
      .replaceAll("`", "")
      .replaceAll(" ", "");

    try {
      const condition = eval(`data.${attr[1]}`);
      if (condition) {
        element.classList.add(className);
      }
      if (element.classList.contains(className) && !condition) {
        element.classList.remove(className);
      }
      element.removeAttribute("@class");
    } catch (err) {
      console.warn(`@is error: Property ${attr[1]} is undefined`);
    }
  }
}

export function refs(element, data) {
  const elements = element.querySelectorAll("[\\@ref]");
  for (let element of elements) {
    const attr = element.attributes["@ref"].value;
    if (data.refs) {
      data.refs[attr] = element;
    } else {
      console.warn("refs not found.");
      console.warn("declare: { refs: {} } in state");
    }
    element.removeAttribute("@ref");
  }
}
