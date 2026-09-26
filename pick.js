// pick.js：按最少位数过滤数字段，给出 text/at/value 与最大值。
import { scanText } from "./scan.js";

function badText() {
  const error = new Error("E_BAD_TEXT");
  error.code = "E_BAD_TEXT";
  return error;
}

export function pickNumbers(text, minDigits) {
  const source = String(text == null ? "" : text);
  const min = Number(minDigits);
  if (!Number.isInteger(min) || min < 1) {
    throw badText();
  }
  if (source.replace(/\s+/g, "").length === 0) {
    throw badText();
  }
  const numbers = [];
  let biggest = 0;
  for (const segment of scanText(source)) {
    if (segment.text.length < min) continue;
    const value = parseInt(segment.text, 10);
    numbers.push({ text: segment.text, at: segment.at, value: value });
    if (value > biggest) biggest = value;
  }
  return { numbers: numbers, biggest: biggest };
}
