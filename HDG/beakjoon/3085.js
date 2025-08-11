const fs = require("fs");
const path = require("path");

template();

function template() {
  const filePath =
    process.platform === "linux"
      ? "/dev/stdin"
      : path.join(__dirname, "beakjoon", "input.txt");
  const raw = fs.readFileSync(filePath, "utf8").trim();

  const input = parseInput(raw);
  const answer = solve(input);
  const out = formatOutput(answer);

  if (out !== undefined) console.log(out);
}

function parseInput(raw) {
  const lines = raw.split("\n");
  const N = Number(lines[0]);
  const board = lines.slice(1).map((line) => line.trim().split(""));
  return { N, board };
}

function formatOutput(ans) {
  return String(ans);
}

// 3085 사탕게임
function solve({ N, board }) {
  let answer = 0;

  const updateAnswerByRowOrColSequence = (rowOrcol, newBoard) => {
    for (let i = 0; i < N; i++) {
      const arr =
        rowOrcol === "row" ? newBoard[i] : newBoard.map((row) => row[i]);
      updateAnswerByLineSequence(arr);
    }
  };

  const updateAnswerByDiagonalSequence = (newBoard) => {
    const length = newBoard.length;

    // 왼쪽 대각선
    const leftArr = Array.from({ length }, (_, i) => newBoard[i][i]);
    updateAnswerByLineSequence(leftArr);

    // 오른쪽 대각선
    const rightArr = Array.from(
      { length },
      (_, i) => newBoard[i][length - 1 - i]
    );
    updateAnswerByLineSequence(rightArr);
  };

  const updateAnswerByLineSequence = (arr) => {
    let max = 0;

    // C의 연속길이
    max = countCharSequence(arr, "C");
    if (answer < max) answer = max;

    // P의 연속길이
    max = countCharSequence(arr, "P");
    if (answer < max) answer = max;

    // Y의 연속길이
    max = countCharSequence(arr, "Y");
    if (answer < max) answer = max;

    // Z의 연속길이
    max = countCharSequence(arr, "Z");
    if (answer < max) answer = max;
  };

  const countCharSequence = (arr, color) => {
    let max = 0;
    let num = 0;

    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === color) {
        num++;
        if (num > max) max = num;
      } else {
        num = 0;
      }
    }

    return max;
  };

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      const newBoard = board.map((r) => r.slice());
      const nextJ = j + 1;

      if (nextJ >= N) break;
      if (newBoard[i][j] === newBoard[i][nextJ]) continue;

      // 색을 변경한다
      let temp = newBoard[i][j];
      newBoard[i][j] = newBoard[i][nextJ];
      newBoard[i][nextJ] = temp;

      // 행을 보고 연속길이를 찾는다
      updateAnswerByRowOrColSequence("row", newBoard);

      // 열을 보고 연속길이를 찾는다
      updateAnswerByRowOrColSequence("col", newBoard);

      // 대각선을 보고 연속길이를 찾는다
      updateAnswerByDiagonalSequence(newBoard);
    }

    for (let m = 0; m < N; m++) {
      const newBoard = board.map((r) => r.slice());
      const nextM = m + 1;

      if (nextM >= N) break;
      if (newBoard[m][i] === newBoard[nextM][i]) continue;

      // 색을 변경한다 (세로)
      let temp = newBoard[m][i];
      newBoard[m][i] = newBoard[nextM][i];
      newBoard[nextM][i] = temp;

      // 행을 보고 연속길이를 찾는다
      updateAnswerByRowOrColSequence("row", newBoard);

      // 열을 보고 연속길이를 찾는다
      updateAnswerByRowOrColSequence("col", newBoard);

      // 대각선을 보고 연속길이를 찾는다
      updateAnswerByDiagonalSequence(newBoard);
    }
  }

  return answer;
}
