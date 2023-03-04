import $ from 'jquery'
import page from "page"
import Mustache from 'mustache'

export const blots = {
  routes: [],
  route(path, cb) {
    blots.routes.push(page(path, () => new cb))
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
  }
}