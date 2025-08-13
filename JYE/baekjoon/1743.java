import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;
import java.util.Queue;
import java.util.ArrayDeque;

class Main {

  static boolean[][] board;
  static int[][] offset = {{0, 1}, {1, 0}, {-1, 0}, {0, -1}};

  static int ROW_COUNT, COL_COUNT;

  public static void main(String[] args) throws IOException {
    BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

    StringTokenizer st = new StringTokenizer(br.readLine());
    
    ROW_COUNT = Integer.parseInt(st.nextToken());
    COL_COUNT = Integer.parseInt(st.nextToken());
    final int GARBAGE_COUNT = Integer.parseInt(st.nextToken());

    board  = new boolean[ROW_COUNT][COL_COUNT];

    for (int i = 0; i < GARBAGE_COUNT; i++) {
      st = new StringTokenizer(br.readLine());
      
      int row = Integer.parseInt(st.nextToken()) - 1;
      int col = Integer.parseInt(st.nextToken()) - 1;

      board[row][col] = true;
    }

    int answer = 0;
    Queue<NodeJS> queue = new ArrayDeque<>();
    for (int i = 0; i < ROW_COUNT; i++) {
      for (int j = 0; j < COL_COUNT; j++) {
        if (board[i][j]) {
          board[i][j] = false;
          queue.add(new NodeJS(i, j));
          answer = Math.max(answer, bfs(queue));
        }
      }
    }

    System.out.print(answer);
  }

  static int bfs(Queue<NodeJS> queue) {
    int result = 0;

    while (!queue.isEmpty()) {
      NodeJS polled = queue.poll();
      result++;

      int row = polled.row;
      int col = polled.col;

      for (int[] off : offset) {
        int newRow = row + off[0];
        int newCol = col + off[1];

        if (newRow >= 0 && newRow < ROW_COUNT && newCol >= 0 && newCol < COL_COUNT) {
          if (board[newRow][newCol]) {
            board[newRow][newCol] = false;
            queue.add(new NodeJS(newRow, newCol));
          }
        }
      }
    }
    return result;
  }

  static class NodeJS {

    int row;
    int col;

    NodeJS (int row, int col) {
      this.row = row;
      this.col = col;
    }
  }
}