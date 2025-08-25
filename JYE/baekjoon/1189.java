import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

class Main {

  static int ROW_COUNT, COL_COUNT, DISTANCE;
  static char[][] chars;
  static int[][] offset = {{0, 1}, {1, 0}, {0, -1}, {-1, 0}};
  static int answer = 0;

  public static void main(String[] args) throws IOException {
    BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

    StringTokenizer st = new StringTokenizer(br.readLine());


    ROW_COUNT = Integer.parseInt(st.nextToken());
    COL_COUNT = Integer.parseInt(st.nextToken());
    DISTANCE = Integer.parseInt(st.nextToken());

    chars = new char[ROW_COUNT][COL_COUNT];

    for (int i = 0; i < ROW_COUNT; i++) {
      chars[i] = br.readLine().toCharArray();
    }

    boolean[][] visited = new boolean[ROW_COUNT][COL_COUNT];
    visited[ROW_COUNT - 1][0] = true;
    int distance = 1;

    back(ROW_COUNT - 1, 0, distance, visited);

    System.out.print(answer);
    
  }

  static void back(int row, int col, int distance, boolean[][] visited) {
    if (row == 0 && col == COL_COUNT - 1 && distance == DISTANCE) {
      answer++;
      return;
    }

    for (int[] off: offset) {
      int newRow = row + off[0];
      int newCol = col + off[1];
      
      if (newRow >= 0 && newCol >= 0 && newRow < ROW_COUNT && newCol < COL_COUNT) {
        if (!visited[newRow][newCol] && chars[newRow][newCol] == '.') {
          visited[newRow][newCol] = true;
          back(newRow, newCol, distance + 1, visited);
          visited[newRow][newCol] = false;
        }

      }
    }

  }
}

