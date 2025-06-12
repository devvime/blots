export const emit = (name, data) => {
  const event = new CustomEvent(name, { detail: data });
  document.dispatchEvent(event);
}

export const output = (name, callback) => {
  document.addEventListener(name, callback)
}