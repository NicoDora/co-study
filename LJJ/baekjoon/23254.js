const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'LJJ/baekjoon/input.txt';
const input = fs.readFileSync(filePath, 'utf8').trim().toString().split('\n');

// 우선순위 큐
class PriorityQueue {
    constructor() {
        this.queue = [];
    }

    size() {
        return this.queue.length;
    }

    enqueue(target) {
        for (let i = 0; i < this.size(); i++) {
            // 보인 보다 큰 값이 있다면 그 앞에 삽입
            if (this.queue[i][0] < target[0]) {
                this.queue.splice(i, 0, target);
                return;
            }
        }
        this.queue.push(target);
    }

    dequeue() {
        return this.queue.shift();
    }

    front() {
        return this.queue[0];
    }

    clear() {
        this.queue = [];
    }
}

const [N, M] = input[0].split(' ').map(Number);
const scores = input[1].split(' ').map(Number);
const studyTimes = input[2].split(' ').map(Number);

const time = 24 * N;
let total = scores.reduce((sum, v) => sum + v, 0);

const priorityQueue = new PriorityQueue();

for (let i = 0; i < M; i++) {
    if (scores[i] < 100) {
        priorityQueue.enqueue([studyTimes[i], i, scores[i]]);
    }
}
priorityQueue.queue.sort((a, b) => b[0] - a[0]);

for (let i = 0; i < time; i++) {
    if (priorityQueue.size() === 0) break;
    let [time, idx, score] = priorityQueue.dequeue();

    if (score < 100) {
        const add = Math.min(time, 100 - score);
        score += add;
        total += add;
    }

    if (score < 100) {
        priorityQueue.enqueue([time, idx, score]);
    }
}

console.log(total);
