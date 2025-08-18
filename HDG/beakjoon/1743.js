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

  console.log(out);
}

function parseInput(raw) {
  const lines = raw.split("\n");
  const [N, M, K] = lines[0].split(" ").map((string) => Number(string));
  const points = lines.slice(1).map((line) => line.trim().split(" "));
  return { N, M, K, points };
}

function formatOutput(ans) {
  return String(ans);
}

function solve({ N, M, K, points }) {
  const board = Array.from({ length: N }, () => Array(M).fill("."));
  const looked = [];
  let max = 0;
  let num = 0;

  points.map(([r, c]) => {
    const i = r - 1;
    const j = c - 1;

    board[i][j] = "#";
  });

  points.map(([r, c]) => {
    const i = r - 1;
    const j = c - 1;

    allLook(i, j);
    num = 0;
  });

  function look(i, j) {
    if (board[i][j] === "#") {
      num++;
      max = Math.max(max, num);
      looked.push({ lookedI: i, lookedJ: j });

      return true;
    }

    return false;
  }

  function nextLook(i, j) {
    if (looked.find(({ lookedI, lookedJ }) => lookedI === i && lookedJ === j))
      return;

    if (look(i, j)) allLook(i, j);
  }

  function allLook(i, j) {
    if (j + 1 < M) {
      const newJ = j + 1;

      nextLook(i, newJ);
    }

    if (i + 1 < N) {
      const newI = i + 1;

      nextLook(newI, j);
    }

    if (i - 1 >= 0) {
      const newI = i - 1;

      nextLook(newI, j);
    }

    if (j - 1 >= 0) {
      const newJ = j - 1;

      nextLook(i, newJ);
    }
  }

  return max;
}
