const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'LJJ/baekjoon/input.txt';
const input = fs.readFileSync(filePath, 'utf8').trim().toString().split('\n');

function getWord(C, R, isRow) {
    let rowWord = 'z'.repeat(R);
    for (let i = 0; i < R; i++) {
        let curWord = '';
        for (let j = 0; j < C; j++) {
            if (isRow) {
                curWord += crossWords[i][j];
            } else {
                curWord += crossWords[j][i];
            }
        }

        const temp = curWord.split('#');
        for (let j = 0; j < temp.length; j++) {
            const splitWord = temp[j];

            if (splitWord.length > 1 && rowWord > splitWord) {
                rowWord = splitWord;
            }
        }
    }
    return rowWord;
}

const [R, C] = input[0].split(' ').map(Number);
const crossWords = input.slice(1).map((line) => line.split(''));

const rowWord = getWord(C, R, true);
const colWord = getWord(R, C, false);
console.log(rowWord > colWord ? colWord : rowWord);
