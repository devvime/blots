export function parseClassMap(str, data) {
  const result = {};
  const objectBody = str.trim().slice(1, -1);
  const pairs = objectBody.split(",").map((p) => p.trim());

  for (const pair of pairs) {
    const [rawKey, rawExpr] = pair.split(":").map((s) => s.trim());
    const key = rawKey.replace(/^["']|["']$/g, "");

    try {
      const fn = new Function("data", `with(data) { return (${rawExpr}) }`);
      result[key] = fn(data);
    } catch (e) {
      console.warn(`Erro ao avaliar expressão para @class: ${rawExpr}`, e);
    }
  }

  return result;
}
