import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;
import java.util.Queue;
import java.util.ArrayDeque;

public class Main {
        
    static int ROW_COUNT, COL_COUNT, TIME;
    static int[][] board;
    static boolean[][] visited;

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        StringTokenizer st = new StringTokenizer(br.readLine());
        ROW_COUNT = Integer.parseInt(st.nextToken());
        COL_COUNT = Integer.parseInt(st.nextToken());
        TIME = Integer.parseInt(st.nextToken());
        
        board = new int[ROW_COUNT][COL_COUNT];
        visited = new boolean[ROW_COUNT][COL_COUNT];

        for (int i = 0; i < ROW_COUNT; i++) {
            st = new StringTokenizer(br.readLine());
            for (int j = 0; j < COL_COUNT; j++) {
                board[i][j] = Integer.parseInt(st.nextToken());
            }
        }

        int[][] offset = {{1, 0},{0, 1},{-1, 0},{0, -1}};

        Queue<NodeJS> queue = new ArrayDeque<>();
        queue.add(new NodeJS(0, 0, 0, false));
        visited[0][0] = true;

        int answer = Integer.MAX_VALUE;

        while (!queue.isEmpty()) {
            NodeJS polled = queue.poll();

            int row = polled.row;
            int col = polled.col;
            int count = polled.count;
            boolean GOD = polled.GOD;

            if (row == ROW_COUNT - 1 && col == COL_COUNT - 1) {
                answer = Math.min(answer, count);
                continue;
            }

            if (GOD) {
                int rowMove = (ROW_COUNT - 1) - row;
                int colMove = (COL_COUNT - 1) - col;

                queue.add(new NodeJS(ROW_COUNT - 1, COL_COUNT - 1,
                count + rowMove + colMove, true));
                continue;
            }

            for (int[] set: offset) {
                int newRow = row + set[0];
                int newCol = col + set[1];

                if (newRow < 0 || newRow >= ROW_COUNT ||
                newCol < 0 || newCol >= COL_COUNT || 
                visited[newRow][newCol] || board[newRow][newCol] == 1) {
                    continue;
                }

                if (board[newRow][newCol] == 2) {
                    queue.add(new NodeJS(newRow, newCol, count + 1, true));
                    visited[newRow][newCol] = true;
                    continue;
                }

                queue.add(new NodeJS(newRow, newCol, count + 1, false));
                visited[newRow][newCol] = true;
            }
        }

        System.out.print(answer <= TIME ? answer : "Fail");
    }

    static class NodeJS {
        int row;
        int col;
        int count;
        boolean GOD;

        NodeJS(int row, int col, int count, boolean GOD){
            this.row = row;
            this.col = col;
            this.count = count;
            this.GOD = GOD;
        }
    }

}