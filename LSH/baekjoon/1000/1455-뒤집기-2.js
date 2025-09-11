const fs = require('fs');
const input =
  process.platform !== 'linux'
    ? fs.readFileSync(`${__dirname}/../input.txt`).toString().trim().split('\n')
    : fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [_, ...arr] = input;

/**
 * 문제 url: https://www.acmicpc.net/problem/1455
 * 문제 이름: 뒤집기 2
 * 시작 시각: 2025. 9. 8. 오후 3:50:24
 * 1단계 (문제 이해 및 조건 분석): 11분
 * 2단계 (알고리즘 선택): 5분
 * 3단계 (구현 및 테스트): 32분
 * 4단계 (디버깅 및 제출): 0분
 */
function main(coinTable) {
  class CoinCollection {
    _coins;
    maxX;
    maxY;
    flipCount;

    constructor(coins) {
      this._coins = coins.map((coin) =>
        coin.map((el) => (el === '1' ? 'back' : 'front'))
      );
      this.maxX = coins[0].length;
      this.maxY = coins.length;
      this.flipCount = 0;
    }

    flip(x, y) {
      for (let i = 0; i <= y; i += 1) {
        for (let j = 0; j <= x; j += 1) {
          this._swap(j, i);
        }
      }
      this.flipCount += 1;
    }

    getCoin(x, y) {
      return this._coins[y][x];
    }

    _swap(x, y) {
      this._coins[y][x] === 'front'
        ? (this._coins[y][x] = 'back')
        : (this._coins[y][x] = 'front');
    }
  }

  const coinCollection = new CoinCollection(coinTable);

  for (let y = coinCollection.maxY - 1; y >= 0; y -= 1) {
    for (let x = coinCollection.maxX - 1; x >= 0; x -= 1) {
      if (coinCollection.getCoin(x, y) === 'back') {
        coinCollection.flip(x, y);
      }
    }
  }

  console.log(coinCollection.flipCount);
}

main(arr.map((el) => el.split('')));
