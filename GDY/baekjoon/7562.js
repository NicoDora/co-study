const fs = require('fs');
const filePath =
  process.platform === 'linux' ? '/dev/stdin' : 'GDY/baekjoon/input.txt';
const input = fs.readFileSync(filePath, 'utf8').trim().split('\n');

const testCase = Number(input.shift());

const dx = [-2, -2, -1, 1, 2, 2, -1, 1];
const dy = [1, -1, 2, 2, 1, -1, -2, -2];

function main(testCase) {
  for (let i = 0; i < testCase; i++) {
    const [I, start, end] = input.splice(0, 3);
    const numI = Number(I);
    const board = Array.from({ length: numI }, () => new Array(numI).fill(0));
    const startNode = start.split(' ').map(Number);
    const [x, y] = end.split(' ').map(Number);
    bfs(startNode, I, board, [x, y]);
    console.log(board[x][y]);
  }
}

function bfs(startNode, I, board, endNode) {
  const queue = [];
  queue.push(startNode);

  while (queue.length !== 0) {
    const [cx, cy] = queue.shift();

    for (let i = 0; i < 8; i++) {
      const nx = dx[i] + cx;
      const ny = dy[i] + cy;
      if (nx < 0 || ny < 0 || nx >= I || ny >= I) continue;
      if (board[nx][ny] !== 0) continue;
      queue.push([nx, ny]);
      board[nx][ny] = board[cx][cy] + 1;
      if (cx === endNode[0] && cy === endNode[1]) return;
    }
  }
}

main(testCase);

// const board = Array.from({ length: 8 }, () => new Array(8).fill(0));
// const a = bfs([0, 0], 8, board, 7, 0);
// console.log(board[7][0]);
