const fs = require('fs');
const filePath =
  process.platform === 'linux' ? '/dev/stdin' : 'LJJ/baekjoon/input.txt';
const input = fs.readFileSync(filePath, 'utf8').trim().split('\n');

class Queue {
  constructor() {
    this.queue = {};
    this.front = 0;
    this.end = 0;
  }

  size() {
    return this.end - this.front;
  }

  enqueue(value) {
    this.queue[this.end++] = value;
  }

  dequeue() {
    if (this.size() <= 0) {
      return null;
    }
    const prev = this.queue[this.front];
    delete this.queue[this.front++];
    return prev;
  }
}

function bfs(graph, visited, N) {
  const queue = new Queue();
  queue.enqueue(N);
  visited[N] = 0;

  while (queue.size() > 0) {
    const pq = queue.dequeue();

    for (const next of graph[pq]) {
      if (visited[next] === -1) {
        visited[next] = 1 - visited[pq];
        queue.enqueue(next);
      } else if (visited[next] === visited[pq]) {
        return false;
      }
    }
  }
  return true;
}

const T = +input[0];
const arr = input.slice(1).map((line) => line.split(' ').map(Number));

let index = 0;

for (let i = 0; i < T; i++) {
  const [N, M] = arr[index++];
  const graph = Array.from({ length: N + 1 }, () => []);
  const visited = Array(N + 1).fill(-1);

  for (let i = 0; i < M; i++) {
    const [a, b] = arr[index++];
    graph[a].push(b);
    graph[b].push(a);
  }

  let result = true;
  for (let i = 1; i <= N; i++) {
    if (visited[i] === -1) {
      if (!bfs(graph, visited, i)) {
        result = false;
        break;
      }
    }
  }
  console.log(result ? 'possible' : 'impossible');
}
