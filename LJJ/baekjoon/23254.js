const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'LJJ/baekjoon/input.txt';
const input = fs.readFileSync(filePath, 'utf8').trim().split(/\s+/).map(Number);

let idx = 0;
const N = input[idx++],
    M = input[idx++];
const a = input.slice(idx, idx + M);
idx += M;
const b = input.slice(idx, idx + M);

const T = 24 * N;
let scores = [...a];

// 우선순위 큐 (최대 힙)
class PriorityQueue {
    constructor() {
        this.heap = [];
    }
    isEmpty() {
        return this.heap.length === 0;
    }
    size() {
        return this.heap.length;
    }
    enqueue(val) {
        this.heap.push(val);
        this._up(this.heap.length - 1);
    }
    dequeue() {
        if (this.isEmpty()) return null;
        const top = this.heap[0];
        const last = this.heap.pop();
        if (!this.isEmpty()) {
            this.heap[0] = last;
            this._down(0);
        }
        return top;
    }
    _up(i) {
        const node = this.heap[i];
        while (i > 0) {
            const p = Math.floor((i - 1) / 2);
            if (this.heap[p][0] >= node[0]) break;
            this.heap[i] = this.heap[p];
            i = p;
        }
        this.heap[i] = node;
    }
    _down(i) {
        const n = this.heap.length;
        const node = this.heap[i];
        while (true) {
            let left = i * 2 + 1,
                right = i * 2 + 2;
            let largest = i;
            if (left < n && this.heap[left][0] > this.heap[largest][0]) largest = left;
            if (right < n && this.heap[right][0] > this.heap[largest][0]) largest = right;
            if (largest === i) break;
            [this.heap[i], this.heap[largest]] = [this.heap[largest], this.heap[i]];
            i = largest;
        }
    }
}

const pq = new PriorityQueue();
for (let i = 0; i < M; i++) {
    let gain = Math.min(b[i], 100 - scores[i]);
    if (gain > 0) pq.enqueue([gain, i]);
}

for (let t = 0; t < T; t++) {
    if (pq.isEmpty()) break;
    let [gain, i] = pq.dequeue();
    scores[i] += gain;
    let newGain = Math.min(b[i], 100 - scores[i]);
    if (newGain > 0) pq.enqueue([newGain, i]);
}

const result = scores.reduce((a, c) => a + c, 0);
console.log(result);
