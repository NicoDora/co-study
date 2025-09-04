const fs = require("fs");
const input = fs.readFileSync(0, "utf-8").trim().split("\n");

// N: 접시 수, d: 초밥 종류 수, k: 연속해서 먹는 접시 수, c: 쿠폰 번호
const [N, d, k, c] = input[0].split(" ").map(Number);
const sushi = input.slice(1).map(Number);

// 1부터 d까지의 초밥 종류별 개수
const count = new Array(d + 1).fill(0);

// 초밥 종류 수
let typeCount = 0;

for (let i = 0; i < k; i++) {
  const type = sushi[i];
  if (count[type] === 0) typeCount++;
  count[type]++;
}

let max = 0;
if (count[c] === 0) max++;

for (let i = 1; i < N; i++) {
  // N까지 돌면 반복되기 때문에 N-1까지 (원형)
  const remove = sushi[i - 1];
  const add = sushi[(i + k - 1) % N];

  count[remove]--;
  if (count[remove] === 0) typeCount--;

  if (count[add] === 0) typeCount++;
  count[add]++;

  const total = typeCount + (count[c] === 0 ? 1 : 0);
  max = Math.max(max, total);
}
console.log(max);
