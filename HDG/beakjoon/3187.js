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

  console.log(answer.sheep, answer.wolf);
}

function parseInput(raw) {
  const lines = raw.split("\n");
  const [R, C] = lines[0].trim().split(" ").map(Number);
  const board = lines.slice(1).map((line) => line.trim().split(""));
  return { R, C, board };
}

function solve({ R, C, board }) {
  const points = [];
  const visited = new Set();
  const answer = {
    sheep: 0,
    wolf: 0,
  };

  const dirs = [
    [-1, 0],
    [1, 0],
    [0, 1],
    [0, -1],
  ];

  function bfs(start) {
    if (!visited.has(`${start}`)) visited.add(`${start}`);
    else return;
    const queue = [start];

    let wolf = 0;
    let sheep = 0;

    while (queue.length) {
      const [i, j] = queue.shift();

      for (const [dirI, dirJ] of dirs) {
        const newI = i + dirI;
        const newJ = j + dirJ;

        if (newI < 0 || newJ < 0 || newI >= R || newJ >= C) continue;

        if (board[newI][newJ] === "#") continue;

        const node = [newI, newJ];

        if (!visited.has(`${node}`)) {
          queue.push(node);

          visited.add(`${node}`);
        }
      }

      if (board[i][j] === "v") wolf++;
      if (board[i][j] === "k") sheep++;
    }

    if (wolf >= sheep) {
      sheep = 0;
    } else {
      wolf = 0;
    }

    answer.sheep += sheep;
    answer.wolf += wolf;
  }

  board.forEach((elements, i) => {
    elements.forEach((element, j) => {
      if (element === "v" || element === "k") {
        points.push([i, j]);
      }
    });
  });

  for (let point of points) {
    bfs(point);
  }

  return answer;
}
