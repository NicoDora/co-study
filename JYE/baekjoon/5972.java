import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.List;
import java.util.Arrays;
import java.util.Queue;
import java.util.PriorityQueue;
import java.util.ArrayList;
import java.util.StringTokenizer;

public class Main {

    static int NODE_COUNT, EDGE_COUNT;

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());
        List<List<NodeJS>> graph = new ArrayList<>();

        NODE_COUNT = Integer.parseInt(st.nextToken());
        EDGE_COUNT = Integer.parseInt(st.nextToken());

        for (int i = 0; i <= NODE_COUNT; i++) {
            graph.add(new ArrayList<>());
        }

        for (int i = 0; i < EDGE_COUNT; i++) {
            st = new StringTokenizer(br.readLine());

            int from = Integer.parseInt(st.nextToken());
            int to = Integer.parseInt(st.nextToken());
            int curCost = Integer.parseInt(st.nextToken());

            graph.get(from).add(new NodeJS(to, curCost));
            graph.get(to).add(new NodeJS(from, curCost));
        }

        int[] cost = new int[NODE_COUNT + 1];
        Arrays.fill(cost, Integer.MAX_VALUE);
        
        Queue<Status> queue = new PriorityQueue<>();
        queue.add(new Status(1, 0));
        cost[1] = 0;

        while (!queue.isEmpty()) {
            Status polled = queue.poll();
            
            int from = polled.from;
            int curCost = polled.cost;

            for (NodeJS node: graph.get(from)) {
                int curTo = node.to;
                int nodeCost = node.cost;

                int newCost = curCost + nodeCost;

                if (cost[curTo] <= newCost) {
                    continue;
                }

                cost[curTo] = newCost;
                queue.add(new Status(curTo, newCost));
            }
        }

        System.out.print(cost[NODE_COUNT]);
    }

    static class Status implements Comparable<Status> {
        int from;
        int cost;

        @Override
        public int compareTo (Status o)  {
            return this.cost - o.cost;
        }

        Status (int from, int cost) {
            this.from = from;
            this.cost = cost;
        }
    }

    static class NodeJS {
        int to;
        int cost;

        NodeJS (int to, int cost) {
            this.to = to;
            this.cost = cost;
        }
    }
}