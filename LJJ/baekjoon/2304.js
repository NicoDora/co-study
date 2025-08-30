const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'LJJ/baekjoon/input.txt';
const input = fs.readFileSync(filePath, 'utf8').trim().split('\n');

const N = +input[0];
const pillars = input.slice(1).map((v) => v.split(' ').map(Number));

// 1. 위치 기준 정렬
pillars.sort((a, b) => a[0] - b[0]);

// 2. 가장 높은 기둥 찾기
const maxH = Math.max(...pillars.map((p) => p[1]));
const maxIndex = pillars.findIndex((p) => p[1] === maxH);
const lastMaxIndex = pillars.map((p) => p[1]).lastIndexOf(maxH);

// 3. 왼쪽 → maxIndex 까지 면적 누적
let area = 0;
let leftMaxH = pillars[0][1];
let leftMaxX = pillars[0][0];

for (let i = 1; i <= maxIndex; i++) {
    if (pillars[i][1] >= leftMaxH) {
        area += (pillars[i][0] - leftMaxX) * leftMaxH;
        leftMaxH = pillars[i][1];
        leftMaxX = pillars[i][0];
    }
}

// 4. 오른쪽 → lastMaxIndex 까지 면적 누적
let rightMaxH = pillars[pillars.length - 1][1];
let rightMaxX = pillars[pillars.length - 1][0];

for (let i = pillars.length - 2; i >= lastMaxIndex; i--) {
    if (pillars[i][1] >= rightMaxH) {
        area += (rightMaxX - pillars[i][0]) * rightMaxH;
        rightMaxH = pillars[i][1];
        rightMaxX = pillars[i][0];
    }
}

// 5. 가장 높은 기둥 구간 더하기
//    (최좌측 maxIndex 기둥 X 좌표부터 최우측 maxIndex 기둥 X 좌표까지)
area += (pillars[lastMaxIndex][0] - pillars[maxIndex][0] + 1) * maxH;

console.log(area);
