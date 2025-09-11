// 돌다리
const { join } = require("path");
const { readFileSync } = require("fs");

const { A, B, N, M } = input();
const queue = [{ num: N, count: 0 }];
const visited = new Set([N]);
let head = 0;

console.log(bfs());

function bfs() {
  while (queue.length) {
    const { num, count } = queue[head++];

    const arr = [
      num - 1,
      num + 1,
      num - A,
      num + A,
      num - B,
      num + B,
      num * A,
      num * B,
    ];

    for (const num of arr) {
      if (num < 0 || num > 100000) continue;
      if (visited.has(num)) continue;

      if (num === M) return count + 1;

      visited.add(num);
      queue.push({ num, count: count + 1 });
    }
  }
}

function input() {
  const path =
    process.platform === "linux" ? "/dev/stdin" : join(__dirname, "input.txt");

  const [A, B, N, M] = readFileSync(path, "utf8").trim().split(" ").map(Number);

  return { A, B, N, M };
}
