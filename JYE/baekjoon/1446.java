  import java.io.BufferedReader;
  import java.io.IOException;
  import java.io.InputStreamReader;
  import java.util.StringTokenizer;
  import java.util.List;
  import java.util.ArrayList;
  import java.util.Map;
  import java.util.Arrays;
  import java.util.HashMap;

  class Main {

    static int COUNT, LENGTH;
    static int[] DP;

    public static void main(String[] args) throws IOException {
      BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

      StringTokenizer st = new StringTokenizer(br.readLine());
      COUNT = Integer.parseInt(st.nextToken());
      LENGTH = Integer.parseInt(st.nextToken());

      Map<Integer, List<Node>> graph = new HashMap<>();

      for (int i = 0; i < COUNT ; i++) {
        st = new StringTokenizer(br.readLine());

        int start = Integer.parseInt(st.nextToken());
        int end = Integer.parseInt(st.nextToken());
        int cost = Integer.parseInt(st.nextToken());

        if(end > LENGTH) {
          continue;
        }
        
        if (graph.containsKey(start)) {
          graph.get(start).add(new Node(end, cost));
          continue;
        }

        graph.put(start, new ArrayList<>());
        graph.get(start).add(new Node(end, cost));
      }

      // 지름 길을 타는 경우와 타지 않는 경우가 있을거임.
      // 탔을 때의 값과 타지 않았을 때의 값 중 작은 것을 취하면 됨.

      DP = new int[LENGTH + 1];

      Arrays.fill(DP, 100_000_00);
      DP[0] = 0;

      for (int start = 0; start < LENGTH ; start++) {

        if (graph.containsKey(start)) {
          for (Node n: graph.get(start)) {
            int end = n.end;
            int cost = n.cost;

            DP[end] = Math.min(DP[end], DP[start] + cost);
          }
        }

        DP[start + 1] = Math.min(DP[start] + 1, DP[start + 1]);
      }
      System.out.print(DP[LENGTH]);
    }

    static class Node {
      int end;
      int cost;

      Node(int end, int cost) {
        this.end = end;
        this.cost = cost;
      }
    }

  }

