const { join } = require("path");
const { readFileSync } = require("fs");

const [n, w, L, truckWeights] = input();

console.log(solution(n, w, L, truckWeights));

function solution(n, bridge_length, weight, truckWeights) {
  let time = 0;

  const onTheBridge = [];
  const outsideTheBridge = [];

  let bridgeRemainingWeight = weight;

  while (outsideTheBridge.length < n) {
    // 트럭 빼기
    if (onTheBridge.length) {
      for (let i = 0; i < onTheBridge.length; i++) {
        const truck = onTheBridge[i];

        if (truck.timeToPass === 0) {
          outsideTheBridge.push(onTheBridge.shift());

          bridgeRemainingWeight += truck.weight;
        }
      }
    }

    // 트럭 보내기
    if (onTheBridge.length) {
      onTheBridge.map((truck) => {
        truck.timeToPass = truck.timeToPass - 1;
      });
    }

    // 트럭 추가하기
    if (bridgeRemainingWeight - truckWeights[0] >= 0) {
      const truckWeight = truckWeights.shift();

      const truck = {
        timeToPass: bridge_length - 1,
        weight: truckWeight,
      };

      onTheBridge.push(truck);

      bridgeRemainingWeight = bridgeRemainingWeight - truck.weight;
    }

    time++;
  }

  return time;
}

function input() {
  const path =
    process.platform === "linux" ? "/dev/stdin" : join(__dirname, "input.txt");
  const lines = readFileSync(path, "utf8").trim().split("\n");
  const [n, w, L] = lines[0].split(" ").map(Number);
  const truckWeights = lines[1].split(" ").map(Number);

  return [n, w, L, truckWeights];
}
