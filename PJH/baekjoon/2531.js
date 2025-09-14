const fs = require("fs");
const input = fs.readFileSync("input.txt").toString().trim().split("\n"); // local 파일
// const input = fs.readFileSync(0, "utf-8").toString().trim().split("\n"); // 문제 제출 시

const [N, d, k, c] = input[0].split(" ").map(Number);
const sushi = input.slice(1).map(Number);
const eats = Array(d + 1).fill(0);
let count = 0;

for (let i = 0; i < k; i++) {
  if (eats[sushi[i]] === 0) count++;
  eats[sushi[i]]++;
}

let maxCount = count;

if (eats[c] === 0) maxCount++;

for (let front = 0; front < N; front++) {
  let rear = (front + k) % N;

  eats[sushi[front]]--;
  if (eats[sushi[front]] === 0) count--;

  if (eats[sushi[rear]] === 0) count++;
  eats[sushi[rear]]++;

  maxCount = Math.max(maxCount, count + (eats[c] === 0 ? 1 : 0));
}

console.log(maxCount);
