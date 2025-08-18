import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.LinkedList;

class Main {
  static LinkedList<LinkedList<Character>> board;

  public static void main(String[] args) throws IOException {
    BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

    int key = Integer.parseInt(br.readLine());
    char[] query = br.readLine().toCharArray();

    board = new LinkedList<>();
    board.add(new LinkedList<>());
    board.get(0).add('.');

    // 0: 남, 1: 서, 2: 북, 3: 동
    int direction = 0;
    // 현재 위치 행, 열
    int[] curLocation = {0, 0}; 
    for (char q : query) {
      switch (q) {
        case 'L' :
        direction = (direction - 1) < 0 ? 3 : direction - 1;
        break;

        case 'R' :
        direction = (direction + 1) > 3 ? 0 : direction + 1;
        break;

        default :
        switch (direction) {
          // 남
          case 0 :
          curLocation[0]++;
          if (curLocation[0] < board.size()) {
            board.get(curLocation[0]).set(curLocation[1], '.');
            break;
          }

          board.add(new LinkedList<>());
          LinkedList<Character> buffer = board.get(board.size() - 1);
          
          for (int i = 0; i < board.get(0).size(); i++) {
            buffer.add('#');
          }
          buffer.set(curLocation[1], '.');

          break;

          // 서
          case 1 :
          curLocation[1]--;
          if (curLocation[1] >= 0) {
            board.get(curLocation[0]).set(curLocation[1], '.');
            break;
          }

          curLocation[1] = 0;

          for (int i = 0; i < board.size(); i++) {
            board.get(i).addFirst('#');
          }
          board.get(curLocation[0]).set(curLocation[1], '.');
          break;

          // 북
          case 2 :
          curLocation[0]--;
          if (curLocation[0] >= 0) {
            board.get(curLocation[0]).set(curLocation[1], '.');
            break;
          }

          curLocation[0] = 0;
          board.addFirst(new LinkedList<>());
          
          for (int i = 0; i < board.get(1).size(); i++) {
            board.get(0).add('#');
          }

          board.get(0).set(curLocation[1], '.');
          break;

          // 동
          case 3 :
          curLocation[1]++;
          if(curLocation[1] < board.get(0).size()){
            board.get(curLocation[0]).set(curLocation[1], '.');
            break;
          }

          for (int i = 0; i < board.size(); i++) {
            board.get(i).add('#');
          }
          board.get(curLocation[0]).set(curLocation[1], '.');
        }
      }
    }

    StringBuilder sb = new StringBuilder();
    for(LinkedList<Character> c : board){
      for(char cc: c){
        sb.append(cc);
      }
      sb.append("\n");
    }

    sb.deleteCharAt(sb.length()-1);
    System.out.print(sb);
  }
}