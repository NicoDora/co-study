const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'LJJ/baekjoon/input.txt';
const input = fs.readFileSync(filePath, 'utf8').trim().toString().split('\n');

const [N, Q] = input[0].split(' ').map(Number);
const want = input.slice(1).map(Number);

const occupied = Array(N + 1).fill(false);
const result = [];

for (let w of want) {
    let cur = w;
    let blocked = 0;

    while (cur > 1) {
        if (occupied[cur]) {
            blocked = cur;
        }
        cur = Math.floor(cur / 2);
    }

    if (blocked === 0 && !occupied[w]) {
        occupied[w] = true;
        result.push(0);
    } else {
        result.push(blocked || w);
    }
}

console.log(result.join('\n'));
