  import java.io.BufferedReader;
  import java.io.IOException;
  import java.io.InputStreamReader;
  import java.util.StringTokenizer;

  class Main {
    static boolean[][] board;

    public static void main(String[] args) throws IOException {
      BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

      StringTokenizer st = new StringTokenizer(br.readLine());

      final int ROW = Integer.parseInt(st.nextToken());
      final int COL = Integer.parseInt(st.nextToken());

      board = new boolean[ROW][COL];

      boolean isPerfect = true;
      
      for (int i = 0; i < ROW; i++) {
        char[] input = br.readLine().toCharArray();

        for (int j = 0; j < COL; j++) {
          board[i][j] = input[j] == '0' ? false : true;
          if (board[i][j]) {
            isPerfect = false;
          }
        }
      }

      if (isPerfect) {
        System.out.println(0);
        return;
      }

      int r = ROW - 1;
      int c = COL - 1;

      int answer = 0;

      while (true) {
        if (board[r][c]) {
          reverse(r, c);
          answer++;
        }
        
        for (int j = c; j >= 0; j--) {
          if (board[r][j]) {
            reverse(r, j);
            answer++;
          }
        }

        for (int i = r; i >= 0; i--) {
          if (board[i][c]) {
            reverse(i, c);
            answer++;
          }
        }

        if (r == 0 && c == 0) {
          break;
        }
        
        if (r > 0) {
          r--;
        }

        if (c > 0) {
          c--;
        }
      }

      System.out.print(answer);
    }

    static void reverse(int row, int col) {
      for (int i = 0; i <= row; i++) {
        for (int j = 0; j <= col; j++) {
        board[i][j] = !board[i][j];
      }
    }
    }
  }