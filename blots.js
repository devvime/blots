import $ from 'jquery'
import page from "page"
import Mustache from 'mustache'

export const blots = {
  routes: [],
  route(path, component) {
    blots.routes.push(page(path, component))
  },
  start() {
    blots.routes.map(route => {
      route
    })
    page()
  },
  render(component) {
    return new component || component
  },
  createElement(html) {
    const template = document.createElement("template")
    template.innerHTML = html.trim()
    return template.content.firstElementChild
  },
  draw(target, html, data = {}) {    
    const rendered = Mustache.render(html, data)
    $(`${target}`).empty()
    $(`${target}`).append(blots.createElement(rendered))
  },
  redirect(route) {
    return page.redirect(route)
  },
  createObservable() {
    let observers = []
    return {
      subscribe: function (observer) {
        observers.push(observer)
      },
      save: function (data) {
        observers.forEach(observer => observer(data))
      }
    };
  }
}

export const click = (target, action) => {
  document.querySelectorAll(`[${target}]`).forEach(el => {
    el.addEventListener('click', action)
  })
}

export const change = (target, action) => {
  document.querySelectorAll(`[${target}]`).forEach(el => {
    el.addEventListener('change', action)
  })
}

export const inputChange = (target, action) => {
  document.querySelectorAll(`[${target}]`).forEach(el => {
    el.addEventListener('input', action)
  })
}

export const emit = (name, data) => {
  const event = new CustomEvent(name, { detail: data });
  document.dispatchEvent(event);
}

export const output = (name, callback) => {
  document.addEventListener(name, callback)
}