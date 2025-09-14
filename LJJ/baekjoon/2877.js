// const fs = require("fs");
// const filePath =
//   process.platform === "linux" ? "/dev/stdin" : "LJJ/baekjoon/input.txt";
// const input = fs.readFileSync(filePath, "utf8").trim().toString();

// // 10^9 까지이기 때문에 모든 수에 대해서 구하긴 힘들 듯?
// // 각 자리수에 맞는 4 와 7의 순열 구하기

// const N = +input - 1;

// function getPermutations(r) {
//   const result = [];
//   if (r === 1) {
//     return arr.map((el) => [el]);
//   }

//   arr.forEach((fixed) => {
//     const permutations = getPermutations(r - 1);
//     const attached = permutations.map((el) => [fixed, ...el]);
//     result.push(...attached);
//   });
//   return result;
// }

// const arr = [4, 7];

// const fourAndSeven = [];

// for (let i = 1; i < 5; i++) {
//   const t = getPermutations(i);
//   fourAndSeven.push(t);
// }

// const res = fourAndSeven.flatMap((el) => el);

// console.log(res[N].join(""));

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'LJJ/baekjoon/input.txt';
const input = fs.readFileSync(filePath, 'utf8').trim().toString();

let K = BigInt(input);

let length = 1n;
let count = 2n;
let total = 0n;

while (K > total + count) {
    total += count;
    length++;
    count = 1n << length; // 2^length
}

// 2. 그 자리수에서 몇 번째인지 (0-based index)
let offset = K - total - 1n;

// 3. offset을 이진수로 변환 후 4/7 매핑
let binary = offset.toString(2).padStart(Number(length), '0');

let result = binary
    .split('')
    .map((ch) => (ch === '0' ? '4' : '7'))
    .join('');

console.log(result);
