const fs = require("fs");
const input = fs.readFileSync("input.txt").toString().trim().split("\n"); // local 파일
// const input = fs.readFileSync(0, "utf-8").toString().trim().split("\n"); // 문제 제출 시

function changeDirection(nextDirection) {
  if (nextDirection === "L") {
    if (direction === "W") direction = "A";
    else if (direction === "A") direction = "S";
    else if (direction === "S") direction = "D";
    else direction = "W";
  } else {
    if (direction === "W") direction = "D";
    else if (direction === "D") direction = "S";
    else if (direction === "S") direction = "A";
    else direction = "W";
  }
}

function marking() {
  const [x, y] = position;
  maze[x][y] = ".";
}

function moveForward() {
  const [x, y] = position;

  if (direction === "W") position = [x - 1, y];
  else if (direction === "A") position = [x, y - 1];
  else if (direction === "S") position = [x + 1, y];
  else position = [x, y + 1];

  const [nx, ny] = position;

  frontX = Math.min(frontX, nx);
  rearX = Math.max(rearX, nx);
  frontY = Math.min(frontY, ny);
  rearY = Math.max(rearY, ny);

  marking();
}

const N = Number(input[0]);
const move = input[1].split("");
const MAX = 100;
const mid = MAX / 2;
const maze = Array.from({ length: MAX }, () => Array(MAX).fill("#"));
let position = [mid, mid];
let direction = "S"; // 방향 (W:위, A:왼쪽, S:아래쪽, D: 오른쪽)
let frontX = mid;
let rearX = mid;
let frontY = mid;
let rearY = mid;

marking();

for (let i = 0; i < N; i++) {
  if (move[i] === "F") moveForward();
  else changeDirection(move[i]);
}

console.log(
  maze
    .slice(frontX, rearX + 1)
    .map((row) => row.slice(frontY, rearY + 1).join(""))
    .join("\n")
);
