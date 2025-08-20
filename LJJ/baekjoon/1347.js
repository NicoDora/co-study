const fs = require("fs");
const filePath =
  process.platform === "linux" ? "/dev/stdin" : "LJJ/baekjoon/input.txt";
const input = fs.readFileSync(filePath, "utf8").trim().toString().split("\n");

// F : 앞으로
// L, R: 완 오 90도 회전

// 시작 남쪽을 보고 서 있음

// 알고리즘: 브르투포스

// 아이디어
// 1. 배열을 미리 만들어 둔다?
// 2. F의 개수를 가지고 배열을 구성 -> 동일한게 빈 공간은 어캄? 에초에 움직인 부분만이잖아
// 3. 방향에 따라서 배열을 생성

// const N = input[0];
// const moves = input[1].split("");
// let maze = [[]];

// const direction = [
//   [-1, 0], //상
//   [0, 1], //우
//   [1, 0], //하
//   [0, -1], //좌
// ];

// //현재 방향
// let currentDirection = 2;

// let x = 0;
// let y = 0;
// maze[x][y] = ".";

// function changeDirection(currentDirection, move) {
//   if (move === "R") {
//     currentDirection++;
//   }
//   if (move === "L") {
//     currentDirection--;
//   }

//   if (currentDirection < 0) {
//     currentDirection = 3;
//   }
//   if (currentDirection > 3) {
//     currentDirection = 0;
//   }
//   return currentDirection;
// }

// for (let i = 0; i < N; i++) {
//   const currentMove = moves[i];

//   if (currentMove === "R" || currentMove === "L") {
//     currentDirection = changeDirection(currentDirection, currentMove);
//   } else {
//     const newX = x + direction[currentDirection][0];
//     const newY = y + direction[currentDirection][1];

//     if (!Array.isArray(maze[newX])) {
//       continue;
//     }
//     if (currentDirection === 0) {
//       maze.unshift([]);
//       newX++;
//     }
//     if (currentDirection === 2) {
//       maze.push([]);
//     }
//     maze[newX][newY] = ".";
//     y = newY;
//     x = newX;
//   }
// }

// console.log(maze);

const N = +input[0];
const moves = input[1].split("");

const direction = [
  [-1, 0], //상
  [0, 1], //우
  [1, 0], //하
  [0, -1], //좌
];

let x = 0;
let y = 0;

const visited = [[x, y]];

let minX = 0,
  maxX = 0,
  minY = 0,
  maxY = 0;

function changeDirection(currentDirection, move) {
  if (move === "R") {
    currentDirection++;
  }
  if (move === "L") {
    currentDirection--;
  }

  if (currentDirection < 0) {
    currentDirection = 3;
  }
  if (currentDirection > 3) {
    currentDirection = 0;
  }
  return currentDirection;
}

let currentDirection = 2;

for (let i = 0; i < N; i++) {
  const currentMove = moves[i];

  if (currentMove === "R" || currentMove === "L") {
    currentDirection = changeDirection(currentDirection, currentMove);
  } else {
    x += direction[currentDirection][0];
    y += direction[currentDirection][1];

    visited.push([x, y]);

    minX = Math.min(minX, x);
    maxX = Math.max(maxX, x);
    minY = Math.min(minY, y);
    maxY = Math.max(maxY, y);
  }
}

const rows = maxX - minX;
const cols = maxY - minY;

const maze = Array.from({ length: rows + 1 }, () =>
  new Array(cols + 1).fill("#")
);

for (const [vx, vy] of visited) {
  maze[vx - minX][vy - minY] = ".";
}

const result = maze.map((row) => row.join("")).join("\n");
console.log(result);
