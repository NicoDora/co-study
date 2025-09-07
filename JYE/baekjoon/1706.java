  import java.io.BufferedReader;
  import java.io.IOException;
  import java.io.InputStreamReader;
  import java.util.StringTokenizer;
  import java.util.List;
  import java.util.ArrayList;

  class Main {

    public static void main(String[] args) throws IOException {
      BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

      StringTokenizer st = new StringTokenizer(br.readLine());
      
      final int ROW = Integer.parseInt(st.nextToken());
      final int COL = Integer.parseInt(st.nextToken());
      
      char[][] board = new char[ROW][COL];
      
      for (int i = 0 ; i < ROW; i++) {
        board[i] = br.readLine().toCharArray();
      }
      
      boolean[][] rowVisited = new boolean[ROW][COL];
      boolean[][] colVisited = new boolean[ROW][COL];
      
      List<String> answer = new ArrayList<>();

      for (int i = 0; i < ROW; i++) {
        for (int j = 0; j < COL; j++) {
          if (board[i][j] != '#') {
            if (!rowVisited[i][j] && j + 1 < COL && !rowVisited[i][j + 1] && board[i][j + 1] != '#') {
              int temp = j;
              String buffer = "";
              while (temp < COL) {
                if(board[i][temp] == '#') {
                  break;
                }
                buffer += board[i][temp];
                rowVisited[i][temp] = true;

                temp++;
              }
              answer.add(buffer);
            }

            if (!colVisited[i][j] && i + 1 < ROW && !colVisited[i + 1][j] && board[i + 1][j] != '#') {
              int temp = i;
              String buffer = "";
              while (temp < ROW) {
                if(board[temp][j] == '#') {
                  break;
                }
                buffer += board[temp][j];
                colVisited[temp][j] = true;

                temp++;
              }
              answer.add(buffer);
            }
          }
        }
      }

      answer.sort(null);

      System.out.print(answer.get(0));
    }
  }