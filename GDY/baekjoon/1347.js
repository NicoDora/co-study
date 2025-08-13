const fs = require('fs');
const filePath =
  process.platform === 'linux' ? '/dev/stdin' : 'GDY/baekjoon/input.txt';
const input = fs.readFileSync(filePath, 'utf8').trim().split('\n');
//시작시간 17:02
//문제파악 17:06
//미로를 만들어두고
//완: 16:40
//알고리즘: 각 LRFB 등등 키워드를 보고 배열에 그려나가기
//L, R 방향을 어떻게 조절하지
const N = Number(input[0]);
const note = input[1].trim();
const maze = Array.from({ length: 100 }, () => new Array(100).fill('#'));
const directions = ['N', 'E', 'S', 'W'];
let x = 49,
  y = 49;
let dirIndex = 2;
let minX = x;
let minY = y;
let maxX = x;
let maxY = y;

maze[x][y] = '.';
for (let i = 0; i < N; i++) {
  const command = note[i];
  if (command === 'F') {
    setPosition(directions[dirIndex]);
    setMaze();

    continue;
  }
  turn(command);
}
console.log(
  maze
    .slice(minY, maxY + 1)
    .map((row) => row.slice(minX, maxX + 1).join(''))

    .join('\n')
);
function setPosition(direction) {
  switch (direction) {
    case 'E':
      y += 1;
      break;
    case 'W':
      y -= 1;
      break;
    case 'S':
      x += 1;
      break;
    case 'N':
      x -= 1;
      break;
  }

  minX = Math.min(y, minX);
  minY = Math.min(x, minY);
  maxX = Math.max(y, maxX);
  maxY = Math.max(x, maxY);
}

function setMaze() {
  maze[x][y] = '.';
}

function turn(command) {
  if (command === 'L') {
    dirIndex = (dirIndex + 3) % 4;
  } else if (command === 'R') {
    dirIndex = (dirIndex + 1) % 4;
  }
}
