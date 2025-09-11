const fs = require("fs");
const input = fs.readFileSync("input.txt").toString().trim().split("\n"); // local 파일
// const input = fs.readFileSync(0, "utf-8").toString().trim().split("\n"); // 문제 제출 시

class MaxHeap {
  constructor() {
    this.heap = [];
  }

  swap(index1, index2) {
    [this.heap[index1], this.heap[index2]] = [
      this.heap[index2],
      this.heap[index1],
    ];
  }

  insert(value) {
    this.heap.push(value);

    let index = this.heap.length - 1;
    let parentIndex = Math.floor((index - 1) / 2);

    while (index > 0 && this.heap[index][1] > this.heap[parentIndex][1]) {
      this.swap(index, parentIndex);
      index = parentIndex;
      parentIndex = Math.floor((index - 1) / 2);
    }
  }

  shiftMax() {
    if (this.heap.length === 0) return 0;
    if (this.heap.length === 1) return this.heap.pop();

    const max = this.heap[0];
    this.heap[0] = this.heap.pop();

    let index = 0;

    while (true) {
      let leftIndex = index * 2 + 1;
      let rightIndex = index * 2 + 2;
      let maxIndex = index;

      if (
        leftIndex < this.heap.length &&
        this.heap[leftIndex][1] > this.heap[maxIndex][1]
      ) {
        maxIndex = leftIndex;
      }
      if (
        rightIndex < this.heap.length &&
        this.heap[rightIndex][1] > this.heap[maxIndex][1]
      ) {
        maxIndex = rightIndex;
      }

      if (maxIndex === index) break;

      this.swap(index, maxIndex);
      index = maxIndex;
    }

    return max;
  }
}

const [N, M] = input[0].split(" ").map(Number);
const baseScore = input[1].split(" ").map(Number);
const studyScore = input[2].split(" ").map(Number);
const currentScore = [...baseScore];
const maxHeap = new MaxHeap();
let time = N * 24;
let totalScore = baseScore.reduce((sum, n) => (sum += n), 0);

for (let i = 0; i < M; i++) {
  const gain = Math.min(studyScore[i], 100 - currentScore[i]);
  maxHeap.insert([i, gain]);
}

for (let t = 0; t < time; t++) {
  if (maxHeap.heap.length === 0) break;

  const [i, gain] = maxHeap.shiftMax();

  totalScore += gain;
  currentScore[i] += gain;

  if (currentScore[i] < 100) {
    const nextGain = Math.min(studyScore[i], 100 - currentScore[i]);
    maxHeap.insert([i, nextGain]);
  }
}

console.log(totalScore);
