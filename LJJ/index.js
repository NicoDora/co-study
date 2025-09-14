// node index.js {{문제번호}}-{{문제이름}}

const path = require('path');
const fs = require('fs');

const problem = process.argv[2];

if (!problem) {
  throw new Error('{{문제번호}}-{{문제이름}} 형식으로 인자를 넘겨주세요.');
}

const [problemNumber, ...problemNameArr] = problem.split('-');

if (Number.isInteger(Number(problemNumber)) === false) {
  throw new Error('문제 번호는 정수여야합니다.');
}

const PRESET = `const fs = require('fs');
const filePath =
  process.platform === 'linux' ? '/dev/stdin' : 'LJJ/baekjoon/input.txt';
const input = fs.readFileSync(filePath, 'utf8').trim().toString().split('\\n');
/**
 * 문제 url: https://www.acmicpc.net/problem/${problemNumber}
 * 문제 이름: ${problemNameArr.join(' ')}
 * 시작 시각: ${new Date().toLocaleString()}
 * 1단계 (문제 이해 및 조건 분석): 분
 * 2단계 (알고리즘 선택): 분
 * 3단계 (구현 및 테스트): 분
 * 4단계 (디버깅 및 제출): 분
 */
function main() {}
main();
`;

const dir = path.join(
  __dirname,
  String(Math.floor(problemNumber / 1000) * 1000)
);

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
  console.log(`디렉토리가 생성됐습니다. dir_path: ${dir}`);
}

const fileName = `${problemNumber}-${problemNameArr.join('-')}.js`;
const problemFilePath = path.join(dir, fileName);

if (fs.existsSync(problemFilePath)) {
  throw new Error(`이미 존재하는 파일입니다. file_path: ${problemFilePath}`);
}

fs.writeFileSync(problemFilePath, PRESET);
console.log(`파일이 생성됐습니다. file_path ${problemFilePath}`);
