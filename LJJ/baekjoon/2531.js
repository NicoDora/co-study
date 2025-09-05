const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'LJJ/baekjoon/input.txt';
const input = fs.readFileSync(filePath, 'utf8').trim().toString().split('\n');

// N: 초밥 접시 수
// d: 초밥의 가짓 수
// k: 연속해서 먹는 접시의 수
// c: 쿠폰 번호
//
const [N, d, k, c] = input[0].split(' ').map(Number);
const plates = input.slice(1).map((line) => +line);

const plates2 = [...plates, ...plates];
// 슬라이싱 윈도우 기법
let start = 0;
let end = start + k;

let max = 0; //

for (let i = 0; i < N + 4; i++) {
    const set = new Set();
    set.add(c);

    for (let j = start; j < end; j++) {
        set.add(plates2[j]);
    }

    max = Math.max(max, set.size);
    start++;
    end++;
}
console.log(max);
//
