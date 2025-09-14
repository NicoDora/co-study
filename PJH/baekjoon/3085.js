const fs = require("fs");
const input = fs.readFileSync("input.txt").toString().trim().split("\n"); // local 파일
// const input = fs.readFileSync(0, "utf-8").toString().trim().split("\n"); // 문제 제출 시

function exchange(x1, y1, x2, y2) {
  [candy[x1][y1], candy[x2][y2]] = [candy[x2][y2], candy[x1][y1]];
}

function getMaxCandyCount() {
  let max = 0;

  // row
  for (let i = 0; i < N; i++) {
    let count = 1;

    for (let j = 1; j < N; j++) {
      if (candy[i][j] === candy[i][j - 1]) {
        count++;
        max = Math.max(max, count);
      } else count = 1;
    }
  }

  // col
  for (let j = 0; j < N; j++) {
    let count = 1;

    for (let i = 1; i < N; i++) {
      if (candy[i][j] === candy[i - 1][j]) {
        count++;
        max = Math.max(max, count);
      } else count = 1;
    }
  }

  return max;
}

const N = Number(input[0]);
const candy = input.slice(1).map((row) => row.split(""));
let maxCandy = 0;

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    // 오른쪽
    if (j + 1 < N && candy[i][j] !== candy[i][j + 1]) {
      exchange(i, j, i, j + 1);
      maxCandy = Math.max(maxCandy, getMaxCandyCount());
      exchange(i, j, i, j + 1);
    }

    // 아래쪽
    if (i + 1 < N && candy[i][j] !== candy[i + 1][j]) {
      exchange(i, j, i + 1, j);
      maxCandy = Math.max(maxCandy, getMaxCandyCount());
      exchange(i, j, i + 1, j);
    }
  }
}

console.log(maxCandy);
