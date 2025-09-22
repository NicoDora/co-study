const { join } = require("path");
const { readFileSync } = require("fs");

const [N, solutions] = input();

let answer = Infinity;

for (let i = 0; i < N - 1; i++) {
  let left = i + 1;
  let right = N - 1;

  while (left <= right) {
    const pivot = Math.floor((left + right) / 2);
    const sum = solutions[i] + solutions[pivot];

    if (sum === 0) {
      console.log(sum);
      break;
    } else if (sum < 0) {
      left = pivot + 1;
    } else {
      right = pivot - 1;
    }

    if (Math.abs(sum) < Math.abs(answer)) {
      answer = sum;
    }
  }
}

console.log(answer);

function input() {
  const path =
    process.platform === "linux" ? "/dev/stdin" : join(__dirname, "input.txt");
  const lines = readFileSync(path, "utf8").trim().split("\n");
  const N = Number(lines[0]);
  const solutions = lines[1].split(" ").map(Number);

  return [N, solutions];
}
