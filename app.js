// app.js：渲染结果
import { scanText } from "./scan.js";
import { pickNumbers } from "./pick.js";

export function render(spec) {
  const text = String(spec.text || "");
  const minDigits = spec.min_digits || 1;
  const view = pickNumbers(text, minDigits);
  const numbers = view.numbers || [];
  const spans = scanText(text);
  return { numbers: numbers, count: numbers.length, biggest: view.biggest || 0,
           segments: spans.length, min_digits: minDigits, length: text.length };
}
