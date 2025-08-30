import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;
import java.util.List;
import java.util.ArrayList;


class Main {

  static int SIZE;
  static int[][] BOARD;
  static long[][] DP;
  static List<Node> buffer = new ArrayList<>();

  public static void main(String[] args) throws IOException {
    BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

    SIZE = Integer.parseInt(br.readLine());

    BOARD = new int[SIZE][SIZE];
    DP = new long[SIZE][SIZE];

    StringTokenizer st;

    for (int i = 0; i < SIZE; i++) {
      st = new StringTokenizer(br.readLine());

      for (int j = 0; j < SIZE; j++) {
        BOARD[i][j] = Integer.parseInt(st.nextToken());
      }
    }

    int startRow = BOARD[0][0];
    int startCol = BOARD[0][0];

    if (startRow < SIZE && BOARD[startRow][0] != 0) {
      DP[startRow][0] = 1;
    }

    if (startCol < SIZE && BOARD[0][startCol] != 0) {
      DP[0][startCol] = 1;
    }

    while (true) {

      boolean flag = true;
      for (int i = 0; i < SIZE; i++) {
        for (int j = 0; j < SIZE; j++) {
          if(i == SIZE - 1 && j == SIZE - 1) {
            continue;
          }
  
          if (DP[i][j] != 0) {
            jump(i, j);
            DP[i][j] = 0;
            flag = false;
          } 
        }
      }

      for (Node b : buffer) {
        DP[b.row][b.col] += b.point;
      }
      buffer.clear();

      if(flag) {
        break;
      }
    }
  
    System.out.print(DP[SIZE - 1][SIZE - 1]);
  }

  static class Node{
    int row;
    int col;
    long point;

    @Override
    public String toString() {
      return row + " " + col + " " + point;
    }

    Node(int row, int col, long point){
      this.row = row;
      this.col = col;
      this.point = point;
    }
  }

  static void jump(int row, int col) {
    for (int i = 0; i < 2; i++) {
      int newRow = i == 0 ? row + BOARD[row][col] : row;
      int newCol = i == 1 ? col + BOARD[row][col] : col;

      if (newRow >= SIZE || newCol >= SIZE) {
        continue;
      }

      if (newRow != SIZE - 1 && newCol != SIZE - 1 && BOARD[newRow][newCol] == 0) {
        continue;
      }

      buffer.add(new Node(newRow, newCol, DP[row][col]));
    }
  }
}

