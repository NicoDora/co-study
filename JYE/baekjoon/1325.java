import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;
import java.util.List;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Queue;
import java.util.ArrayDeque;

class Main {

  static List<List<Integer>> graph;
  static int NODE_COUNT, TRUST_COUNT;
  
  public static void main(String[] args) throws IOException {
    BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
    StringTokenizer st = new StringTokenizer(br.readLine());

    NODE_COUNT = Integer.parseInt(st.nextToken());
    TRUST_COUNT = Integer.parseInt(st.nextToken());

    graph = new ArrayList<>();
    for (int i = 0; i <= NODE_COUNT; i++) {
      graph.add(new ArrayList<>());
    }

    for (int i = 0; i < TRUST_COUNT; i++) {
      st = new StringTokenizer(br.readLine());

      int to = Integer.parseInt(st.nextToken());
      int from = Integer.parseInt(st.nextToken());

      graph.get(from).add(to);
    }

    List<Integer> answer = new ArrayList<>();
    int maxCount = 0;

    for (int i = 1; i <= NODE_COUNT; i++) {
      int buffer = bfs(i);
      
      if (buffer > maxCount) {
        answer.clear();
        answer.add(i);
        maxCount = buffer;
        continue;
      }
      
      if (buffer == maxCount) {
        answer.add(i);
      }
    }

    StringBuilder sb = new StringBuilder();
    for(int an: answer) {
      sb.append(an).append(" ");
    }

    sb.deleteCharAt(sb.length() - 1);
    System.out.print(sb);
  }


  static int bfs(int idx) { 
    Queue<Integer> queue = new ArrayDeque<>(); 
    boolean[] visited = new boolean[NODE_COUNT + 1]; 
    queue.add(idx); 
    visited[idx] = true;

    int result = 0; 
    while (!queue.isEmpty()) {
      int polled = queue.poll();
      result++; 

      for(int child : graph.get(polled)) {
        if (!visited[child]) {
          visited[child] = true; queue.add(child); 
        }
      }
    }
    
    return result;
  }
}