import Mustache from "mustache";

export function createElement(html) {
  const template = document.createElement("template");
  template.innerHTML = (html || "").trim();
  return template.content.firstElementChild;
}

export function draw(target, html, data = {}) {
  const rendered = Mustache.render(html, data);
  const el = blots.createElement(rendered);
  const $target = $(target);
  $target.empty();
  if (el) $target.append(el);
}

export async function template(fileName) {}
