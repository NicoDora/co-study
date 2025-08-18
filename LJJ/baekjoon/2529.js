const fs = require("fs");
const filePath =
  process.platform === "linux" ? "/dev/stdin" : "LJJ/baekjoon/input.txt";
const input = fs.readFileSync(filePath, "utf8").trim().toString().split("\n");

// 부등호를 만족하는 경우의 수를 구해서, 이미 존재하는 숫자 배열인지 판별

function isInequality(a, b, inequality) {
  if (inequality === ">") {
    return a > b;
  }
  if (inequality === "<") {
    return a < b;
  }
  return false;
}

function dfs(depth, path) {
  if (depth === N + 1) {
    const numStr = path.join("");
    if (!min || numStr < min) {
      min = numStr;
    }
    if (!max || numStr > max) {
      max = numStr;
    }
    return;
  }

  for (let i = 0; i < 10; i++) {
    if (used[i]) {
      continue;
    }
    if (
      depth === 0 ||
      isInequality(path[depth - 1], i, inequality[depth - 1])
    ) {
      used[i] = true;
      path.push(i);
      dfs(depth + 1, path);
      path.pop(i);
      used[i] = false;
    }
  }
}

const N = +input[0];
const inequality = input[1].split(" ");

let max = "";
let min = "";
const used = new Array(10).fill(false);

dfs(0, []);

console.log(max + "\n" + min);
