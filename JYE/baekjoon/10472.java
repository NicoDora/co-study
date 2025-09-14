import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Map;
import java.util.HashMap;
import java.util.Queue;
import java.util.ArrayDeque;

class Main {

  static Map<Integer,Integer> map;

  public static void main(String[] args) throws IOException {
    BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
    final int K = Integer.parseInt(br.readLine());

    map = new HashMap<>();
    initMap();

    for (int i = 0; i < K; i++) {
      int input = 0;

      int idx = 0;
      for (int j = 0; j < 3; j++) {
        char[] arr = br.readLine().toCharArray();

        for (int k = 0; k < 3; k++) {
          input += arr[k] == '*' ? Math.pow(2, idx) : 0;
          idx++;
        }
      }

      if (input == 0) {
        System.out.println(0);
        continue;
      }

      boolean[] visited = new boolean[512];
      
      Queue<Buffer> queue = new ArrayDeque<>();
      queue.add(new Buffer(0, input));
      visited[input] = true;

      while (!queue.isEmpty()) {
        Buffer polled = queue.poll();

        int count = polled.count;
        int number = polled.number;

        boolean flag = false;

        for (int value : map.values()) {
          int result = number ^ value;

          if(result == 0) {
            System.out.println(count + 1);
            flag = true;
            break;
          }

          if (!visited[result]) {
            queue.add(new Buffer(count + 1, result));
            visited[result] = true;
          }
        }

        if (flag) {
          break;
        }
      }
    }
  }

  static void initMap() {
    map.put(0, 11);
    map.put(1, 23);
    map.put(2, 38);
    map.put(3, 89);
    map.put(4, 186);
    map.put(5, 308);
    map.put(6, 200);
    map.put(7, 464);
    map.put(8, 416);
  }

  static class Buffer{
    int count;
    int number;

    Buffer(int count, int number) {
      this.count = count;
      this.number = number;
    }
  }
}
