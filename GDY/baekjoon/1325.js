const fs = require('fs');
const filePath =
  process.platform === 'linux' ? '/dev/stdin' : 'GDY/baekjoon/input.txt';
const input = fs.readFileSync(filePath, 'utf8').trim().split('\n');

class Queue {
  constructor(size) {
    this.items = new Int32Array(size + 1);
    this.size = size + 1;
    this.front = 0;
    this.rear = 0;
  }

  isEmpty() {
    return this.front === this.rear;
  }

  isFull() {
    return this.front === (this.rear + 1) % this.size;
  }

  enqueue(item) {
    this.items[this.rear] = item;
    this.rear = (this.rear + 1) % this.size;
  }

  dequeue() {
    const item = this.items[this.front];
    this.front = (this.front + 1) % this.size;
    return item;
  }
}
const [N, M] = parseStrToNumArray(input[0]);
const graph = Array.from({ length: N + 1 }, () => []);
const result = [];
const visited = new Int32Array(N + 1);
let runId = 0;
let maxHacking = 0;

for (let i = 1; i <= M; i++) {
  const [A, B] = parseStrToNumArray(input[i]);
  graph[B].push(A);
}

const queue = new Queue(N + 1);
for (let i = 1; i <= N; i++) {
  runId++;
  const count = bfs(i);
  if (count > maxHacking) {
    maxHacking = count;
    result.length = 0;
    result.push(i);
  } else if (count === maxHacking) {
    result.push(i);
  }
}

console.log(result.join(' '));
function parseStrToNumArray(str) {
  return str.split(' ').map(Number);
}

function bfs(root) {
  queue.front = 0;
  queue.rear = 0;
  let count = 1;
  queue.enqueue(root);
  visited[root] = runId;
  while (!queue.isEmpty()) {
    const node = queue.dequeue();

    for (const v of graph[node]) {
      if (visited[v] !== runId) {
        visited[v] = runId;
        queue.enqueue(v);
        count++;
      }
    }
  }
  return count;
}
