// scan.js：一次扫描，连续数字字符归为一段，记录起始位置与片段文本
export function scanText(text) {
  const source = String(text);
  const segments = [];
  const limit = source.length;
  let index = 0;
  while (index < limit) {
    const code = source.charCodeAt(index);
    if (code < 48 || code > 57) {
      index += 1;
      continue;
    }
    const start = index;
    let value = 0;
    while (index < limit) {
      const digit = source.charCodeAt(index);
      if (digit < 48 || digit > 57) break;
      value = value * 10 + (digit - 48);
      index += 1;
    }
    segments.push({ at: start, text: source.slice(start, index), value: value });
  }
  return segments;
}
