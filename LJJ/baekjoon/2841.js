const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'LJJ/baekjoon/input.txt';
const input = fs.readFileSync(filePath, 'utf8').trim().toString().split('\n');

class Stack {
    constructor() {
        this.stack = [];
        this.size = 0;
    }

    push(value) {
        this.stack.push(value);
        this.size++;
    }

    pop(next) {
        const top = this.stack[size];
        if (top > next) {
            size--;
            return this.stack.pop();
        }
        return 0;
    }
}

const [N, P] = input[0].split(' ').map(Number);
const melody = input.slice(1).map((line) => line.split(' ').map(Number));

const plats = Array.from({ length: 6 }, () => new Stack());

let curPlat = 0;

for (let i = 0; i < N; i++) {
    const [line, plat] = melody[i];

    if (plat > curPlat) {
        plat[line].stack.push(plat);
    } else {
    }

    curPlat = plat;
}
