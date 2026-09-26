// scan.js：单趟扫出所有连续数字段，每段给出起始位置与文本。
export function scanText(text) {
  const source = String(text == null ? "" : text);
  const segments = [];
  let start = -1;
  for (let index = 0; index < source.length; index += 1) {
    const code = source.charCodeAt(index);
    const isDigit = code >= 48 && code <= 57;
    if (isDigit && start < 0) {
      start = index;
    } else if (!isDigit && start >= 0) {
      segments.push({ at: start, text: source.slice(start, index) });
      start = -1;
    }
  }
  if (start >= 0) {
    segments.push({ at: start, text: source.slice(start) });
  }
  return segments;
}
