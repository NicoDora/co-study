const fs = require("fs");
const path = require("path");

template();

function template() {
  const filePath =
    process.platform === "linux"
      ? "/dev/stdin"
      : path.join(__dirname, "input.txt");
  const raw = fs.readFileSync(filePath, "utf8").trim();

  const input = parseInput(raw);
  const answer = solve(input);
  const out = formatOutput(answer);

  if (out !== undefined) console.log(out);
}

function parseInput(raw) {
  const lines = raw.split("\n");
  const N = Number(lines[0]);
  const commends = lines[1].split("");
  return { N, commends };
}

function formatOutput(ans) {
  return String(ans.join("\n"));
}

function solve({ N, commends }) {
  const size = 2 * N + 1;
  const offset = Math.floor(size / 2);

  const miro = {
    board: Array.from({ length: size }, () => Array(size).fill("#")),
    minX: offset,
    maxX: offset,
    minY: offset,
    maxY: offset,

    updateBoard(hongjun) {
      this.minX = Math.min(this.minX, hongjun.x);
      this.maxX = Math.max(this.maxX, hongjun.x);
      this.minY = Math.min(this.minY, hongjun.y);
      this.maxY = Math.max(this.maxY, hongjun.y);

      this.board[hongjun.y][hongjun.x] = ".";
    },
  };

  const hongjun = {
    x: offset,
    y: offset,
    direction: "남",

    turnRight() {
      if (this.direction === "남") {
        this.direction = "서";
      } else if (this.direction === "서") {
        this.direction = "북";
      } else if (this.direction === "북") {
        this.direction = "동";
      } else if (this.direction === "동") {
        this.direction = "남";
      }
    },

    turnLeft() {
      if (this.direction === "남") {
        this.direction = "동";
      } else if (this.direction === "동") {
        this.direction = "북";
      } else if (this.direction === "북") {
        this.direction = "서";
      } else if (this.direction === "서") {
        this.direction = "남";
      }
    },

    moveForward() {
      if (this.direction === "남") {
        this.y--;
      }

      if (this.direction === "서") {
        this.x--;
      }

      if (this.direction === "북") {
        this.y++;
      }

      if (this.direction === "동") {
        this.x++;
      }

      miro.updateBoard(this);
    },
  };

  // 시작
  const answer = [];

  miro.board[hongjun.y][hongjun.x] = ".";

  for (let commend of commends) {
    if (commend === "R") hongjun.turnRight();
    if (commend === "L") hongjun.turnLeft();
    if (commend === "F") hongjun.moveForward();
  }

  for (let y = miro.minY; y <= miro.maxY; y++) {
    const allRow = miro.board[y];
    const miroRow = allRow.slice(miro.minX, miro.maxX + 1);

    answer.unshift(miroRow.join(""));
  }

  return answer;
}
