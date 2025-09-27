const fs = require("fs");
const input = fs.readFileSync("input.txt").toString().trim().split("\n"); // local 파일
// const input = fs.readFileSync(0, "utf-8").toString().trim().split("\n"); // 문제 제출 시

class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.front = null;
    this.rear = null;
    this.size = 0;
  }

  push(data) {
    const newNode = new Node(data);

    if (this.size === 0) {
      this.front = newNode;
      this.rear = newNode;
    } else {
      this.rear.next = newNode;
      this.rear = newNode;
    }

    this.size++;
  }

  shift() {
    if (this.size === 0) return null;

    const data = this.front.data;

    this.front = this.front.next;
    this.size--;

    return data;
  }
}

function bfs(start, graph, colors) {
  const queue = new Queue();

  queue.push(start);
  colors[start] = 1;

  while (queue.size) {
    const current = queue.shift();

    for (const next of graph[current]) {
      if (colors[next] === 0) {
        colors[next] = 3 - colors[current];
        queue.push(next);
      } else if (colors[next] === colors[current]) return false;
    }
  }

  return true;
}

const T = Number(input[0]);
const result = [];
let i = 1;

for (let t = 0; t < T; t++) {
  const [n, m] = input[i++].split(" ").map(Number);
  const graph = Array.from({ length: n + 1 }, () => []);
  const colors = Array(n + 1).fill(0);
  let isBipartite = true;

  for (let j = 0; j < m; j++) {
    const [x, y] = input[i++].split(" ").map(Number);

    graph[x].push(y);
    graph[y].push(x);
  }

  for (let j = 1; j <= n; j++) {
    if (colors[j] === 0 && !bfs(j, graph, colors)) {
      isBipartite = false;
      break;
    }
  }

  result.push(isBipartite ? "possible" : "impossible");
}

console.log(result.join("\n"));
