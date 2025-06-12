import $ from "jquery";
import page from "page";
import Mustache from "mustache";

export const blots = {
  routes: [],

  route(path, component) {
    blots.routes.push(page(path, component));
  },

  start(params = {}) {
    page(params);
  },

  render(component) {
    return typeof component === "function" ? new component() : component;
  },

  createElement(html) {
    const template = document.createElement("template");
    template.innerHTML = (html || "").trim();
    return template.content.firstElementChild;
  },

  draw(target, html, data = {}) {
    const rendered = Mustache.render(html, data);
    const el = blots.createElement(rendered);
    const $target = $(target);
    $target.empty();
    if (el) $target.append(el);
  },

  async template(name) {
    return await fetch(`/api/${name}`).then((response) => response.text());
  },

  redirect(route) {
    page.redirect(route);
  },

  createObservable() {
    const observers = new Set();
    return {
      subscribe: (observer) => observers.add(observer),
      unsubscribe: (observer) => observers.delete(observer),
      notify: (data) => observers.forEach((observer) => observer(data)),
    };
  },

  component(obj, onChange) {
    return new Proxy(obj, {
      set(target, prop, value) {
        target[prop] = value;
        if (typeof onChange === "function") onChange({ prop, value, target });
        return true;
      },
    });
  },
};
