export const addEvent = (event, target, action) => {
  document.querySelectorAll(`[${target}]`).forEach(el => {
    el.addEventListener(event, action)
  })
}

export const click = (target, action) => addEvent('click', target, action)
export const change = (target, action) => addEvent('change', target, action)
export const inputChange = (target, action) => addEvent('input', target, action)