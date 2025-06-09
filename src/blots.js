import $ from 'jquery'
import page from "page"
import Mustache from 'mustache'

export const blots = {
  routes: [],
  
  route(path, component) {
    blots.routes.push(page(path, component))
  },
  
  start(params = {}) {
    page(params)
  },
  
  render(component) {
    return typeof component === 'function' ? new component() : component
  },
  
  createElement(html) {
    const template = document.createElement("template")
    template.innerHTML = (html || '').trim()
    return template.content.firstElementChild
  },
  
  draw(target, html, data = {}) {
    const rendered = Mustache.render(html, data)
    const el = blots.createElement(rendered)
    const $target = $(target)
    $target.empty()
    if (el) $target.append(el)
  },
  
  redirect(route) {
    page.redirect(route)
  },

  createObservable() {
    const observers = new Set()
    return {
      subscribe: observer => observers.add(observer),
      unsubscribe: observer => observers.delete(observer),
      notify: data => observers.forEach(observer => observer(data))
    }
  }
}

export const addEvent = (event, target, action) => {
  document.querySelectorAll(`[${target}]`).forEach(el => {
    el.addEventListener(event, action)
  })
}

export const click = (target, action) => addEvent('click', target, action)
export const change = (target, action) => addEvent('change', target, action)
export const inputChange = (target, action) => addEvent('input', target, action)

export const emit = (name, data) => {
  const event = new CustomEvent(name, { detail: data });
  document.dispatchEvent(event);
}

export const output = (name, callback) => {
  document.addEventListener(name, callback)
}