import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;
import java.util.Queue;
import java.util.ArrayDeque;

class Main {

  static int BOARD_LENGTH, MAX_VIRUS;
  static int[][] board;
  static int[][] offset = {{0, 1}, {1, 0}, {-1, 0}, {0, -1}};

  public static void main(String[] args) throws IOException {
    BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

    StringTokenizer st = new StringTokenizer(br.readLine());
    BOARD_LENGTH = Integer.parseInt(st.nextToken());
    MAX_VIRUS = Integer.parseInt(st.nextToken());

    board = new int[BOARD_LENGTH + 1][BOARD_LENGTH + 1];

    Queue<NodeJS> queue = new ArrayDeque<>();
    int mustPass = 0;

    
    for (int i = 1; i < BOARD_LENGTH + 1; i++) {
      st = new StringTokenizer(br.readLine());
    
      for (int j = 1; j < BOARD_LENGTH + 1; j++) {
        board[i][j] = Integer.parseInt(st.nextToken());
      }
    }

    for (int t = 1; t <= MAX_VIRUS; t++) {
      for (int i = 1; i < BOARD_LENGTH + 1; i++) {
        for (int j = 1; j < BOARD_LENGTH + 1; j++) {
          if(board[i][j] == t) {
            queue.add(new NodeJS(board[i][j], i, j));
            mustPass++;
          }
        }
      }  
    }

    st = new StringTokenizer(br.readLine());
    int second = Integer.parseInt(st.nextToken());
    int targetRow = Integer.parseInt(st.nextToken());
    int targetCol = Integer.parseInt(st.nextToken());


    for (int i = 1; i <= second; i++) {
      int buffer = 0;

      for (int j = 0; j < mustPass; j++) {
        NodeJS polled = queue.poll();
        int number = polled.number;
        int row = polled.row;
        int col = polled.col;

        for (int[] off: offset) {
          int newRow = row + off[0];
          int newCol = col + off[1];

          if(newRow > 0 && newRow < BOARD_LENGTH + 1 &&
          newCol > 0 && newCol < BOARD_LENGTH + 1) {
            if(board[newRow][newCol] == 0) {
              buffer++;
              board[newRow][newCol] = number;
              queue.add(new NodeJS(number, newRow, newCol));
            }
          }
        }
      }

      mustPass = buffer;
    }

    System.out.print(board[targetRow][targetCol]);
  }

  static class NodeJS {
    int number;
    int row;
    int col;

    NodeJS(int number, int row, int col) {
      this.number = number;
      this.row = row;
      this.col = col;
    }
  }
}

