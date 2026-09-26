// ui.js：操作面板与视图（原生 DOM，无弹窗）
import { render } from "./app.js";

export function mount(spec, parts) {
  let minDigits = spec.min_digits || 1;
  parts.log.textContent = "文本长度 " + String(spec.text || "").length + "，最少位数 " + minDigits + "。";

  function draw() {
    let view = null;
    try {
      view = render(Object.assign({}, spec, { min_digits: minDigits }));
    } catch (error) {
      parts.out.textContent = String(error && error.code ? error.code : error);
      parts.log.textContent = "跑不动：" + String(error && error.message ? error.message : error);
      return;
    }
    parts.out.textContent = JSON.stringify(view, null, 1);
    parts.stage.textContent = "";
    view.numbers.forEach(function (item, spot) {
      const row = document.createElement("div");
      row.className = "row";
      const head = document.createElement("span");
      head.textContent = item.text;
      row.appendChild(head);
      const mark = document.createElement("span");
      mark.className = "chip ok";
      mark.textContent = "第 " + item.at + " 位起，值 " + item.value;
      row.appendChild(mark);
      parts.stage.appendChild(row);
    });
    parts.legend.textContent = "数字片段 " + view.count + " 个，最大 " + view.biggest;
    parts.log.textContent = "最少位数 " + minDigits;
  }

  const runButton = document.createElement("button");
  runButton.className = "primary";
  runButton.textContent = "提取数字";
  runButton.addEventListener("click", draw);
  parts.controls.appendChild(runButton);

  const moreButton = document.createElement("button");
  moreButton.textContent = "最少位数加一";
  moreButton.addEventListener("click", function () {
    minDigits = minDigits + 1;
    draw();
  });
  parts.controls.appendChild(moreButton);

  const lessButton = document.createElement("button");
  lessButton.textContent = "最少位数减一";
  lessButton.addEventListener("click", function () {
    minDigits = Math.max(1, minDigits - 1);
    draw();
  });
  parts.controls.appendChild(lessButton);

  const label = document.createElement("label");
  label.textContent = "试一段文本";
  parts.controls.appendChild(label);

  const box = document.createElement("input");
  box.type = "text";
  box.value = "a12b3";
  box.addEventListener("input", function () {
    try {
      const view = render(Object.assign({}, spec, { text: box.value, min_digits: minDigits }));
      parts.out.textContent = box.value + " 提取出 " + view.count + " 个数字片段";
    } catch (error) {
      parts.out.textContent = String(error && error.code ? error.code : error);
    }
  });
  parts.controls.appendChild(box);

  const readButton = document.createElement("button");
  readButton.textContent = "只看最大值";
  readButton.addEventListener("click", function () {
    const view = render(Object.assign({}, spec, { min_digits: minDigits }));
    parts.out.textContent = "最大值 " + view.biggest + "，片段 " + view.count + " 个";
  });
  parts.controls.appendChild(readButton);

  draw();
}
