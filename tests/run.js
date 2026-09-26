import assert from "node:assert";
import { scanText } from "../scan.js";
import { pickNumbers } from "../pick.js";
import { render } from "../app.js";

let failed = 0;
function check(name, fn) {
  try { fn(); console.log("ok " + name); } catch (e) { failed += 1; console.log("FAIL " + name + " :: " + e.message); }
}

check("scanText returns a list", () => {
  assert.ok(Array.isArray(scanText("a12")));
});

check("pickNumbers returns numbers", () => {
  assert.ok(Array.isArray(pickNumbers("a12", 1).numbers));
});

check("pickNumbers returns biggest", () => {
  assert.strictEqual(typeof pickNumbers("a12", 1).biggest, "number");
});

check("render counts numbers", () => {
  assert.strictEqual(typeof render({ text: "a12", min_digits: 1 }).count, "number");
});

check("render counts segments", () => {
  assert.strictEqual(typeof render({ text: "a12", min_digits: 1 }).segments, "number");
});

console.log("5 cases, " + failed + " failed");
process.exit(failed === 0 ? 0 : 1);
