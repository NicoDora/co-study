const fs = require('fs');
const filePath =
  process.platform === 'linux' ? '/dev/stdin' : 'GDY/baekjoon/input.txt';
const input = fs.readFileSync(filePath, 'utf8').trim().split('\n');

class MinHeap {
  constructor() {
    this.heap = [];
  }
  size() {
    return this.heap.length;
  }
  push(value) {
    this.heap.push(value);
    let currentIndex = this.heap.length - 1;

    while (currentIndex > 0) {
      const parentIndex = Math.floor((currentIndex - 1) / 2);

      const parentCost = this.heap[parentIndex][0];
      const currentCost = this.heap[currentIndex][0];

      if (parentCost <= currentCost) break;

      [this.heap[parentIndex], this.heap[currentIndex]] = [
        this.heap[currentIndex],
        this.heap[parentIndex],
      ];

      currentIndex = parentIndex;
    }
  }

  pop() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();

    const minValue = this.heap[0];
    this.heap[0] = this.heap.pop();

    let index = 0;
    const heapSize = this.heap.length;

    while (true) {
      let leftIndex = index * 2 + 1;
      let rightIndex = index * 2 + 2;
      let smallestIndex = index;

      if (
        leftIndex < heapSize &&
        this.heap[leftIndex][0] < this.heap[smallestIndex][0]
      ) {
        smallestIndex = leftIndex;
      }

      if (
        rightIndex < heapSize &&
        this.heap[rightIndex][0] < this.heap[smallestIndex][0]
      ) {
        smallestIndex = rightIndex;
      }

      if (smallestIndex === index) {
        break;
      }

      [this.heap[index], this.heap[smallestIndex]] = [
        this.heap[smallestIndex],
        this.heap[index],
      ];

      index = smallestIndex;
    }

    return minValue;
  }
}

const [N, M] = input[0].split(' ').map(Number);

function main(N, M, input) {
  const graph = Array.from({ length: N + 1 }, () => []);
  initGraph(M, input, graph);

  const result = dijkstra(N, graph, 1, N);
  console.log(result);
}

function initGraph(M, input, graph) {
  for (let i = 1; i <= M; i++) {
    const [A, B, C] = input[i].split(' ').map(Number);
    graph[A].push([B, C]);
    graph[B].push([A, C]);
  }
}

function dijkstra(N, graph, startNode, endNode) {
  const distances = new Array(N + 1).fill(Infinity);
  distances[startNode] = 0;

  const pq = new MinHeap();

  pq.push([0, startNode]);

  while (pq.size() > 0) {
    const [currentCost, currentNode] = pq.pop();

    if (distances[currentNode] < currentCost) {
      continue;
    }

    for (const [neighborNode, neighborCost] of graph[currentNode]) {
      const newCost = currentCost + neighborCost;

      if (newCost < distances[neighborNode]) {
        distances[neighborNode] = newCost;
        pq.push([newCost, neighborNode]);
      }
    }
  }
  return distances[endNode];
}

main(N, M, input);
