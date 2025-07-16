export function state(obj, onChange) {
  return new Proxy(obj, {
    set(target, prop, value) {
      target[prop] = value;
      if (typeof onChange === "function") onChange({ prop, value, target });
      return true;
    },
  });
}
