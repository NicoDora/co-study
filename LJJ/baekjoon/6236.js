const fs = require('fs');
const filePath =
  process.platform === 'linux' ? '/dev/stdin' : 'LJJ/baekjoon/input.txt';
const input = fs.readFileSync(filePath, 'utf8').trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);
const budgets = input.slice(1).map(Number);

const isOverMoney = (mid) => {
  let cnt = 0;
  let remain = 0;
  for (let i = 0; i < N; i++) {
    if (remain < budgets[i]) {
      cnt++;
      remain = mid - budgets[i];
    } else remain -= budgets[i];
  }
  if (cnt > M) {
    return true;
  }
  return false;
};

let money = 1;
let left = Math.max(...budgets);
let right = budgets.reduce((a, b) => a + b, 0);

while (left <= right) {
  const mid = parseInt((left + right) / 2);
  if (isOverMoney(mid)) {
    left = mid + 1;
  } else {
    money = mid;
    right = mid - 1;
  }
}

console.log(money);
