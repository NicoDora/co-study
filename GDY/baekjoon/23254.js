const fs = require('fs');
const filePath =
  process.platform === 'linux' ? '/dev/stdin' : 'GDY/baekjoon/input.txt';
const input = fs.readFileSync(filePath, 'utf8').trim().split('\n');

class PriorityQueue {
  constructor() {
    this.heap = [null];
  }

  enqueue(value) {
    this.heap.push(value);
    let currentIndex = this.heap.length - 1;
    let parentIndex = Math.floor(currentIndex / 2);

    while (
      currentIndex > 1 &&
      this.heap[parentIndex].eff < this.heap[currentIndex].eff
    ) {
      [this.heap[parentIndex], this.heap[currentIndex]] = [
        this.heap[currentIndex],
        this.heap[parentIndex],
      ];
      currentIndex = parentIndex;
      parentIndex = Math.floor(currentIndex / 2);
    }
  }

  dequeue() {
    if (this.heap.length === 1) return undefined;
    if (this.heap.length === 2) return this.heap.pop();

    const returnValue = this.heap[1];
    this.heap[1] = this.heap.pop();

    let currentIndex = 1;
    let leftIndex = 2;
    let rightIndex = 3;

    while (
      (this.heap[leftIndex] &&
        this.heap[currentIndex].eff < this.heap[leftIndex].eff) ||
      (this.heap[rightIndex] &&
        this.heap[currentIndex].eff < this.heap[rightIndex].eff)
    ) {
      if (
        this.heap[rightIndex] &&
        (!this.heap[leftIndex] ||
          this.heap[leftIndex].eff < this.heap[rightIndex].eff)
      ) {
        [this.heap[currentIndex], this.heap[rightIndex]] = [
          this.heap[rightIndex],
          this.heap[currentIndex],
        ];
        currentIndex = rightIndex;
      } else {
        [this.heap[currentIndex], this.heap[leftIndex]] = [
          this.heap[leftIndex],
          this.heap[currentIndex],
        ];
        currentIndex = leftIndex;
      }
      leftIndex = currentIndex * 2;
      rightIndex = leftIndex + 1;
    }
    return returnValue;
  }
}

const pq = new PriorityQueue();
const [N, M] = input[0].trim().split(' ').map(Number);
const scoreList = input[1].trim().split(' ').map(Number);
const gainList = input[2].trim().split(' ').map(Number);

let studyTime = N * 24;

for (let i = 0; i < M; i++) {
  if (scoreList[i] >= 100 || gainList[i] === 0) continue;
  const eff = Math.min(100 - scoreList[i], gainList[i]);
  if (eff > 0) pq.enqueue({ idx: i, gain: gainList[i], eff });
}

while (studyTime > 0) {
  const top = pq.dequeue();
  if (!top) break;

  const { idx, gain } = top;

  const effNow = Math.min(100 - scoreList[idx], gain);
  if (effNow <= 0) continue;

  if (scoreList[idx] + gain > 100) {
    scoreList[idx] = 100;
  } else {
    scoreList[idx] += gain;
  }
  studyTime--;

  const nextEff = Math.min(100 - scoreList[idx], gain);
  if (nextEff > 0) pq.enqueue({ idx, gain, eff: nextEff });
}

console.log(scoreList.reduce((a, b) => a + b, 0));
