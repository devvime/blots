export function getValueFromData(data, key) {
  const parts = key.split(".");
  let val = data;
  for (const part of parts) {
    if (val && typeof val === "object") {
      val = val[part];
    } else {
      return undefined;
    }
  }
  return val;
}
