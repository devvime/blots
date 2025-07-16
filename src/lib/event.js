export function emit(name, data) {
  const event = new CustomEvent(name, { detail: data });
  document.dispatchEvent(event);
}

export function output(name, callback) {
  document.addEventListener(name, callback);
}
