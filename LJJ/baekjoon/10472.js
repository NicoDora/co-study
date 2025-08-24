const fs = require("fs");
const filePath =
  process.platform === "linux" ? "/dev/stdin" : "LJJ/baekjoon/input.txt";
const input = fs.readFileSync(filePath, "utf8").trim().toString().split("\n");

const P = +input[0];

const arr = Array.from({ length: P }, () => []);

let index = 0;
for (let i = 1; i <= P * 3; i++) {
  const temp = input[i].trim().split("");
  arr[index].push(temp);
  if (i % 3 === 0) {
    index++;
  }
}

const direction = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

function bfs(graph, i, j) {
  let count = 0;

  const queue = [];
  queue.push([i, j]);

  while (queue.length > 0) {
    const [row, col] = queue.shift();

    if (!graph.includes("*")) {
      count++;
    }

    for (let i = 0; i < 4; i++) {
      const nextRow = row + direction[i][0];
      const nextCol = col + direction[i][1];

      if (nextRow < 0 || nextCol < 0 || nextRow >= 3 || nextCol >= 3) {
        continue;
      }

      const idx = col * 3 + row;
      arr[idx] = arr[idx] === "*" ? "." : "*";
    }
  }
  return count;
}

const result = [];

for (let p = 0; p < P; p++) {
  let sumCount = 0;

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const t = bfs(arr[p], i, j);
      sumCount += t;
    }
  }
  result.push(sumCount);
}

console.log(result);
