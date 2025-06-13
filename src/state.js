export function state(obj, onChange) {
  return new Proxy(obj, {
    set(target, prop, value) {
      target[prop] = value;
      if (typeof onChange === "function") onChange({ prop, value, target });
      return true;
    },
  });
}

export function observable() {
  const observers = new Set();
  return {
    subscribe: (observer) => observers.add(observer),
    unsubscribe: (observer) => observers.delete(observer),
    notify: (data) => observers.forEach((observer) => observer(data)),
  };
}
