const fs = require("fs");
const input = fs.readFileSync(0, "utf8").trim().split("\n");

const [R, C] = input[0].split(" ").map(Number);
const puzzle = input.slice(1);

const horizontalWords = [];
const verticalWords = [];

for (let r = 0; r < R; r++) {
  const row = puzzle[r];
  const rowParts = row.split("#");

  for (const word of rowParts) {
    if (word.length >= 2) {
      horizontalWords.push(word);
    }
  }
}

for (let c = 0; c < C; c++) {
  let column = "";
  for (let r = 0; r < R; r++) {
    column += puzzle[r][c];
  }

  const colParts = column.split("#");
  for (const word of colParts) {
    if (word.length >= 2) {
      verticalWords.push(word);
    }
  }
}

const allWords = [...horizontalWords, ...verticalWords];
allWords.sort();
console.log(allWords[0]);
