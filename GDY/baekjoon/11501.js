const fs = require('fs');
const filePath =
  process.platform === 'linux' ? '/dev/stdin' : 'GDY/baekjoon/input.txt';
const input = fs.readFileSync(filePath, 'utf8').trim().split('\n');

const T = Number(input[0]);

for (let i = 1; i <= T; i++) {
  const [N, numbers] = input.splice(1, 2);
  const stockPrices = numbers.trim().split(' ').map(Number);
  let money = 0;

  let maxPrice = stockPrices.at(-1);
  for (let i = N; i > 0; i--) {
    const nextPrice = stockPrices[i - 1];

    if (maxPrice > nextPrice) {
      money += maxPrice - nextPrice;
    } else {
      maxPrice = nextPrice;
    }
  }

  console.log(money);
}
//아 또 PR안내리고 푸쉬함
