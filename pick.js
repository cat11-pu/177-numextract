// pick.js：在扫描结果上按最少位数筛选，给出值与最大值
import { scanText } from "./scan.js";

function badText(message) {
  const error = new Error(message);
  error.code = "E_BAD_TEXT";
  return error;
}

export function pickNumbers(text, minDigits) {
  if (!(minDigits >= 1)) {
    throw badText("最少位数必须不小于 1");
  }
  if (String(text).trim() === "") {
    throw badText("文本去掉空白后为空");
  }

  const numbers = [];
  let biggest = 0;
  const segments = scanText(text);
  for (const segment of segments) {
    if (segment.text.length < minDigits) continue;
    numbers.push({ text: segment.text, at: segment.at, value: segment.value });
    if (segment.value > biggest) biggest = segment.value;
  }
  return { numbers: numbers, biggest: biggest };
}
