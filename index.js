import $ from 'jquery'
import page from "page"
import Mustache from 'mustache'

export const blots = {
  routes: [],
  route(path, cb) {
    blots.routes.push(page(path, () => new cb))
  },
  run() {
    blots.routes.map(route => {
      route
    })
    page()
  },
  render(component) {
    return new component
  },
  createElement(html) {
    const template = document.createElement("template")
    template.innerHTML = html.trim()
    return template.content.firstElementChild
  },
  draw(target, html, data = {}) {    
    const rendered = Mustache.render(html, data)
    $(`${target}`).html('')
    $(`${target}`).append(blots.createElement(rendered))
  }
}