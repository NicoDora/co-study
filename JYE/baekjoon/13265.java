import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;
import java.util.List;
import java.util.ArrayList;
import java.util.Queue;
import java.util.ArrayDeque;


public class Main {

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        final int COUNT = Integer.parseInt(br.readLine());

        for (int i = 0; i < COUNT; i++) {
            StringTokenizer st = new StringTokenizer(br.readLine());

            final int CIRCLE_COUNT = Integer.parseInt(st.nextToken());
            final int LINE_COUNT = Integer.parseInt(st.nextToken());

            int[] circle = new int[CIRCLE_COUNT + 1];

            List<List<Integer>> graph1 = new ArrayList<>();
            List<List<Integer>> graph2 = new ArrayList<>();

            for (int j = 0; j <= CIRCLE_COUNT; j++) {
                graph1.add(new ArrayList<>());
                graph2.add(new ArrayList<>());
            }

            for (int j = 0; j < LINE_COUNT; j++) {
                st = new StringTokenizer(br.readLine());

                int from = Integer.parseInt(st.nextToken());
                int to = Integer.parseInt(st.nextToken());
                
                graph1.get(from).add(to);
                graph2.get(to).add(from);
            }

            boolean flag = false;

            for (int j = 1; j <= CIRCLE_COUNT; j++) {
                Queue<Integer> queue = new ArrayDeque<>();
                boolean[] visited = new boolean[CIRCLE_COUNT + 1];

                queue.add(j);
                visited[j] = true;

                while (!queue.isEmpty()) {
                    int polled = queue.poll();

                    circle[polled] = circle[polled] == 0 ? 1 : circle[polled];

                    int targetColor = circle[polled] == 1 ? 2 : 1;

                    for (int node: graph1.get(polled)) {
                        if (circle[node] == circle[polled]) {
                            flag = true;
                            break;
                        }

                        if (visited[node]) {
                            continue;
                        }

                        circle[node] = targetColor;
                        queue.add(node);
                        visited[node] = true;
                    }

                    if (flag) {
                        break;
                    }
                    
                    for (int node: graph2.get(polled)) {
                        if (circle[node] == circle[polled]) {
                            flag = true;
                            break;
                        }

                        if (visited[node]) {
                            continue;
                        }

                        circle[node] = targetColor;
                        queue.add(node);
                        visited[node] = true;
                    }

                    if (flag) {
                        break;
                    }
                }

                if (flag) {
                    break;
                }
            }
            
            if (flag) {
                System.out.println("impossible");
                continue;
            }

            System.out.println("possible");
        }


    }

}