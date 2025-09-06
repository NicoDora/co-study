const fs = require("fs");
const input = fs.readFileSync("input.txt").toString().trim().split("\n"); // local 파일
// const input = fs.readFileSync(0, "utf-8").toString().trim().split("\n"); // 문제 제출 시

const [N, Q] = input[0].split(" ").map(Number);
const land = Array(N + 1).fill(false);
const ducks = input.slice(1).map(Number);
const result = [];

for (let i = 0; i < Q; i++) {
  let current = ducks[i];
  let collisionPoint = land[current] ? current : 0;

  while (current !== 1) {
    const parent = Math.floor(current / 2);

    if (land[parent]) collisionPoint = parent;
    current = parent;
  }

  if (collisionPoint === 0) land[ducks[i]] = true;
  result.push(collisionPoint);
}

console.log(result.join("\n"));
