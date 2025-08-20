const fs = require("fs");
const filePath =
  process.platform === "linux" ? "/dev/stdin" : "LJJ/baekjoon/input.txt";
const input = fs.readFileSync(filePath, "utf8").trim().toString().split("");

// 브루트포스
// 저번 3085.js에서 만들었던 문제처럼, 각 문자열을 변환시켰다가 다시 이전 문자열로 복귀 시키는 문제

// 모든 상황에 대해서 반복을 돌리기?
// 각 문자의 개수를 재배열

function backtracking(prevStr, length) {
  if (length === input.length) {
    result++;
    return;
  }

  for (const [st, count] of map.entries()) {
    if (count > 0 && st !== prevStr) {
      map.set(st, count - 1);
      backtracking(st, length + 1);
      map.set(st, count);
    }
  }
}

const map = new Map();

for (const st of input) {
  map.set(st, (map.get(st) || 0) + 1);
}

let result = 0;

backtracking("", 0);
console.log(result);
