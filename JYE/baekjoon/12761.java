  import java.io.BufferedReader;
  import java.io.IOException;
  import java.io.InputStreamReader;
  import java.util.StringTokenizer;
  import java.util.Queue;
  import java.util.ArrayDeque;

  class Main {

    public static void main(String[] args) throws IOException {
      BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

      StringTokenizer st = new StringTokenizer(br.readLine());

      final int A = Integer.parseInt(st.nextToken());
      final int B = Integer.parseInt(st.nextToken());
      final int N = Integer.parseInt(st.nextToken());
      final int M = Integer.parseInt(st.nextToken());
    
      Queue<NodeJS> queue = new ArrayDeque<>();
      boolean[] visited = new boolean[100_001];

      visited[N] = true;
      queue.add(new NodeJS(N,0));

      int[] offset = {-1, 1, -A, A, B, -B};

      while (!queue.isEmpty()) {
        NodeJS polled = queue.poll();

        int location = polled.location;
        int count = polled.count;

        if (location == M) {
          System.out.print(count);
          break;
        }

        for (int set: offset) {
          int newLocation = location + set;
          
          if (newLocation < 0 || newLocation > 100_000 || visited[newLocation]) {
            continue;
          }

          queue.add(new NodeJS(newLocation, count + 1));
          visited[newLocation] = true;
        }

        int AL = location * A;
        int BL = location * B;

        if(AL <= 100_000 && !visited[AL]) {
          queue.add(new NodeJS(AL, count + 1));
          visited[AL] = true;
        }

        if(BL <= 100_000 && !visited[BL]) {
          queue.add(new NodeJS(BL, count + 1));
          visited[BL] = true;
        }
      }
    }

    static class NodeJS {
      int location;
      int count;

      NodeJS (int location, int count) {
        this.location = location;
        this.count = count;
      }
    }
  }