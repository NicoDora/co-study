const fs = require("fs");
const path = require("path");

template();

function template() {
  const filePath =
    process.platform === "linux"
      ? "/dev/stdin"
      : path.join(__dirname, "input.txt");
  const raw = fs.readFileSync(filePath, "utf8").trim();
  const answer = solve(raw);
  const out = formatOutput(answer);

  console.log(out);
}

function formatOutput(ans) {
  return String(ans);
}

function solve(string) {
  let max = 0;
  const set = new Set();

  permutation("", string);

  for (const value of set) {
    if (checkSameString(value)) {
      max++;
    }
  }

  return max;

  function permutation(prefix, string) {
    if (string.length === 0) {
      set.add(prefix);
    } else {
      for (let i = 0; i < string.length; i++) {
        permutation(
          prefix + string[i],
          string.substring(0, i) + string.substring(i + 1)
        );
      }
    }
  }

  function checkSameString(string) {
    for (let i = 0; i < string.length - 1; i++) {
      if (string[i] === string[i + 1]) return false;
    }

    return true;
  }
}
