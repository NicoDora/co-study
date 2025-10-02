import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;
import java.util.List;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Set;
import java.util.HashSet;

public class Main {
    static int CITY_COUNT, ROAD_COUNT, FRIEND_COUNT;
    static List<List<NodeJS>> graph = new ArrayList<>();
    static List<Integer> answer = new ArrayList<>();
    
    static int[][] board;

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());

        CITY_COUNT = Integer.parseInt(st.nextToken());
        ROAD_COUNT = Integer.parseInt(st.nextToken());

        for (int i = 0; i <= CITY_COUNT; i++) {
            graph.add(new ArrayList<>());
        }

        for (int i = 0; i < ROAD_COUNT; i++) {
            st = new StringTokenizer(br.readLine());

            int from = Integer.parseInt(st.nextToken());
            int to = Integer.parseInt(st.nextToken());
            int cost = Integer.parseInt(st.nextToken());

            graph.get(from).add(new NodeJS(to, cost));
        }

        FRIEND_COUNT = Integer.parseInt(br.readLine());
        Set<Integer> set = new HashSet<>();
        
        st = new StringTokenizer(br.readLine());
        for (int i = 1; i <= FRIEND_COUNT; i++) {
            set.add(Integer.parseInt(st.nextToken()));
        }

        board = new int[CITY_COUNT + 1][CITY_COUNT + 1];

        for (int[] b: board) {
            Arrays.fill(b, Integer.MAX_VALUE);
        }

        for (int i = 1; i <= CITY_COUNT; i++) {
            board[i][i] = 0;
        }

        for (int i = 1; i <= CITY_COUNT; i++) {
            for (NodeJS list: graph.get(i)) {
                int to = list.to;
                int cost = list.cost;

                board[i][to] = Math.min(board[i][to], cost);
            }
        }

        for (int k = 1; k <= CITY_COUNT; k++) {
            for (int i = 1; i <= CITY_COUNT; i++) {
                for (int j = 1; j <= CITY_COUNT; j++) {
                    if (board[i][k] != Integer.MAX_VALUE && board[k][j] != Integer.MAX_VALUE) {
                        board[i][j] = Math.min(board[i][j], board[i][k] + board[k][j]);
                    }

                }
            }
        }

        int[] buffer = new int[CITY_COUNT + 1];
        Arrays.fill(buffer, -1);
    
        int min = Integer.MAX_VALUE;

        for (int i = 1; i <= CITY_COUNT; i++) {
            int max = 0;
            boolean flag = false;

            for (Integer s: set) {
                if (board[s][i] == Integer.MAX_VALUE || board[i][s] == Integer.MAX_VALUE) {
                    flag = true;
                    break;
                }

                max = Math.max(max, board[s][i] + board[i][s]);
            }

            if (flag) {
                continue;
            }

            buffer[i] = max;
            min = Math.min(min, max);
        }

        for (int i = 1; i < buffer.length; i++) {
            if (buffer[i] == min) {
                answer.add(i);
            }
        }

        StringBuilder sb = new StringBuilder();
        for (int a: answer) {
            sb.append(a).append(" ");
        }

        if(sb.length() != 0) {
            sb.deleteCharAt(sb.length() - 1);
        }

        System.out.print(sb);
    }

    static class NodeJS {
        int to;
        int cost;

        NodeJS(int to, int cost){
            this.to = to;
            this.cost = cost;
        }
    }

}