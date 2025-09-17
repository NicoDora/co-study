const { join } = require("path");
const { readFileSync } = require("fs");

class MinHeap {
  constructor() {
    this.heap = [];
  }
  swap(i1, i2) {
    [this.heap[i1], this.heap[i2]] = [this.heap[i2], this.heap[i1]];
  }
  getParentIndex(i) {
    return Math.floor((i - 1) / 2);
  }
  getLeftChildIndex(i) {
    return 2 * i + 1;
  }
  getRightChildIndex(i) {
    return 2 * i + 2;
  }
  push(node) {
    this.heap.push(node);
    let currentIndex = this.heap.length - 1;
    let parentIndex = this.getParentIndex(currentIndex);
    while (
      parentIndex >= 0 &&
      this.heap[currentIndex][0] < this.heap[parentIndex][0]
    ) {
      this.swap(currentIndex, parentIndex);
      currentIndex = parentIndex;
      parentIndex = this.getParentIndex(currentIndex);
    }
  }
  pop() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();
    const minValue = this.heap[0];
    this.heap[0] = this.heap.pop();
    let currentIndex = 0;
    while (true) {
      let leftChildIndex = this.getLeftChildIndex(currentIndex);
      let rightChildIndex = this.getRightChildIndex(currentIndex);
      let smallestIndex = currentIndex;
      if (
        leftChildIndex < this.heap.length &&
        this.heap[leftChildIndex][0] < this.heap[smallestIndex][0]
      ) {
        smallestIndex = leftChildIndex;
      }
      if (
        rightChildIndex < this.heap.length &&
        this.heap[rightChildIndex][0] < this.heap[smallestIndex][0]
      ) {
        smallestIndex = rightChildIndex;
      }
      if (smallestIndex !== currentIndex) {
        this.swap(currentIndex, smallestIndex);
        currentIndex = smallestIndex;
      } else {
        break;
      }
    }
    return minValue;
  }
  isEmpty() {
    return this.heap.length === 0;
  }
}

const { N, M, graphDatas } = input();

const graph = Array.from({ length: N + 1 }, () => []);
for (let i = 0; i < graphDatas.length; i++) {
  const [u, v, w] = graphDatas[i];
  graph[u].push([v, w]);
  graph[v].push([u, w]);
}

graphDatas.length = 0;

const pq = new MinHeap();
const costs = Array(N + 1).fill(Infinity);
const visited = Array(N + 1).fill(false);

costs[1] = 0;
pq.push([0, 1]);

while (!pq.isEmpty()) {
  const top = pq.pop();
  if (!top) break;
  const [cost, node] = top;

  if (visited[node]) continue;
  visited[node] = true;

  if (node === N) break;

  const edges = graph[node];
  for (let i = 0; i < edges.length; i++) {
    const [neighbor, weight] = edges[i];
    if (visited[neighbor]) continue;

    const newCost = cost + weight;
    if (newCost < costs[neighbor]) {
      costs[neighbor] = newCost;
      pq.push([newCost, neighbor]);
    }
  }
}

console.log(costs[N] === Infinity ? -1 : costs[N]);

function input() {
  const path =
    process.platform === "linux" ? "/dev/stdin" : join(__dirname, "input.txt");
  const lines = readFileSync(path, "utf8").trim().split("\n");

  const [N, M] = lines[0].trim().split(" ").map(Number);
  const graphDatas = lines
    .slice(1)
    .map((line) => line.trim().split(" ").map(Number));

  return { N, M, graphDatas };
}
