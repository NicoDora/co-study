const fs = require("fs");
const input = fs.readFileSync("input.txt").toString().trim().split("\n"); // local 파일
// const input = fs.readFileSync(0, "utf-8").toString().trim().split("\n"); // 문제 제출 시

function getWithdrawCount(amount) {
  let current = amount;
  let count = 1;

  for (let i = 0; i < N; i++) {
    if (current < dailyAmount[i]) {
      current = amount;
      count++;
    }

    current -= dailyAmount[i];
  }

  return count;
}

function binarySearch(start, end) {
  let answer = 0;

  while (start <= end) {
    const mid = Math.floor((start + end) / 2);
    const count = getWithdrawCount(mid);

    if (count <= M) {
      answer = mid;
      end = mid - 1;
    } else start = mid + 1;
  }

  return answer;
}

const [N, M] = input[0].split(" ").map(Number);
const dailyAmount = input.slice(1).map(Number);
const max = Math.max(...dailyAmount);
const sum = dailyAmount.reduce((sum, n) => (sum += n), 0);

console.log(binarySearch(max, sum));
