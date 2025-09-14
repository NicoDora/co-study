  import java.io.BufferedReader;
  import java.io.IOException;
  import java.io.InputStreamReader;
  import java.util.Queue;
  import java.util.StringTokenizer;
  import java.util.PriorityQueue;

  class Main {

    static boolean[][] board, visited;
    static int[][] offset = {{0, 1}, {1, 0}, {-1, 0}, {0, -1}};

    public static void main(String[] args) throws IOException {
      BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

      StringTokenizer st = new StringTokenizer(br.readLine());

      final int COL_COUNT = Integer.parseInt(st.nextToken());
      final int ROW_COUNT = Integer.parseInt(st.nextToken());

      board = new boolean[ROW_COUNT][COL_COUNT];
      visited = new boolean[ROW_COUNT][COL_COUNT];

      int answer = 0;

      for (int i = 0; i < ROW_COUNT; i++) {
        char[] chars = br.readLine().toCharArray();

        for (int j = 0; j < COL_COUNT; j++) {
          board[i][j] = chars[j] == '1';

          if (board[i][j] == true) {
            answer++;
          }
        }
      }

      Queue<NodeJS> queue = new PriorityQueue<>();
      queue.add(new NodeJS(0, 0, 0));
      visited[0][0] = true;

      while (!queue.isEmpty()) {
        NodeJS polled = queue.poll();
        int row = polled.row;
        int col = polled.col;
        int destroy = polled.destroy;

        if (row == ROW_COUNT - 1 && col == COL_COUNT - 1) {
          answer = Math.min(answer, destroy);
          break;
        }

        for (int[] set: offset) {
          int newRow = row + set[0];
          int newCol = col + set[1];

          if (newRow < 0 || newRow >= ROW_COUNT ||
              newCol < 0 || newCol >= COL_COUNT ||
              visited[newRow][newCol] || destroy >= answer) {
            continue;
          }

          if(board[newRow][newCol]) {
            queue.add(new NodeJS(newRow, newCol, destroy + 1));
          } else {
            queue.add(new NodeJS(newRow, newCol, destroy));
          }

          visited[newRow][newCol] = true;
        }
      }

      System.out.print(answer);
    }

    static class NodeJS implements Comparable<NodeJS>{
      int row;
      int col;
      int destroy;

      @Override
      public int compareTo(NodeJS o) {
        return this.destroy - o.destroy;
      }

      NodeJS (int row, int col, int destroy) {
        this.row = row;
        this.col = col;
        this.destroy = destroy;
      }

    }


  }