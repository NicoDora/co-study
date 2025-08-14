const fs = require("fs");
const filePath =
  process.platform === "linux" ? "/dev/stdin" : "LJJ/baekjoon/input.txt";
const input = fs.readFileSync(filePath, "utf8").trim().toString().split("\n");

// 간선간 길이를 파악해서, 가장 많은 길이를 가진 요소들을 출력하는 문제

function bfs(x) {
  const queue = [];
  queue.push(x);
  const visited = Array.from({ length: N + 1 }, () => false);
  visited[x] = true;
  let count = 1;

  while (queue.length > 0) {
    const com = queue.shift();

    for (let next of graph[com]) {
      if (!visited[next]) {
        visited[next] = true;
        queue.push(next);
        count++;
      }
    }
  }
  result.push(count);
}

const [N, M] = input[0].split(" ").map(Number);
const computers = input.slice(1).map((line) => line.split(" ").map(Number));

const graph = Array.from({ length: N + 1 }, () => []);

const result = [];

for (const [A, B] of computers) {
  graph[B].push(A);
}

for (let i = 1; i <= N; i++) {
  bfs(i);
}

const max = Math.max(...result);
const hacks = result
  .map((el, idx) => {
    if (el === max) {
      return idx + 1;
    }
  })
  .filter((el) => el !== undefined)
  .sort((a, b) => a - b)
  .join(" ");

console.log(hacks);
