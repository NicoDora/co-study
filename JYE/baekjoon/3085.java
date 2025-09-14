import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

class Main {
  static int[][] offset  = {{0, 1}, {1, 0}, {0, -1}, {-1, 0}};

  public static void main(String[] args) throws IOException {
    BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

    int N = Integer.parseInt(br.readLine());

    char[][] board = new char[N][N];
    boolean[][] used = new boolean[N][N];

    for (int i = 0; i < N; i++) {
      board[i] = br.readLine().toCharArray();
    }

    int answer = 1;

    for (int i = 0; i < N; i++) {
      for (int j = 0; j < N; j++) {
        char[][] buffer = new char[N][N];

        for(int k = 0; k < N; k++) {
          System.arraycopy(board[k], 0, buffer[k], 0, N);
        }

        for (int[] set : offset) {
          int newRow = i + set[0];
          int newCol = j + set[1];
          
          if (newRow >=0 && newRow < board.length &&
          newCol >= 0 && newCol < board.length && !used[newRow][newCol]) {
            if(buffer[i][j] != buffer[newRow][newCol]){
              char temp = buffer[i][j];
              buffer[i][j] = buffer[newRow][newCol];
              buffer[newRow][newCol] = temp;
    
              answer = Math.max(answer, judgeYeonSok(buffer));

              temp = buffer[i][j];
              buffer[i][j] = buffer[newRow][newCol];
              buffer[newRow][newCol] = temp;
            }
          }
        }

        used[i][j] = true;
      }
    }

    System.out.print(answer);
  }

  static int judgeYeonSok(char[][] board) {
    int maxYeonSok = 1;

    // 행
    for (int i = 0; i < board.length; i++) {
      char character = 'a';
      int acc = 1;

      for (int j = 0; j < board.length; j++) {
        if(character == 'a') {
          character = board[i][j];
          continue;
        }

        if (character == board[i][j]) {
          acc++;
        } else {
          character = board[i][j];
          maxYeonSok = Math.max(maxYeonSok, acc);
          acc = 1;
        }
        maxYeonSok = Math.max(maxYeonSok, acc);
      }
    }

    // 열
    for (int i = 0; i < board.length; i++) {
      char character = 'a';
      int acc = 1;

      for (int j = 0; j < board.length; j++) {
        if(character == 'a') {
          character = board[j][i];
          continue;
        }

        if (character == board[j][i]) {
          acc++;
        } else {
          maxYeonSok = Math.max(maxYeonSok, acc);
          character = board[j][i];
          acc = 1;
        }
        maxYeonSok = Math.max(maxYeonSok, acc);
      }
    }
    
    return maxYeonSok;
  }
}