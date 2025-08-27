import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;
import java.util.List;
import java.util.ArrayList;

class Main {
  public static void main(String[] args) throws IOException {
    BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

    int N = Integer.parseInt(br.readLine());
    List<Column> column = new ArrayList<>();

    StringTokenizer st;

    int maxHeight = 0;
    int startLocation = 1001;
    int endLocation = 0;

    for (int i = 0; i < N; i++) {
      st = new StringTokenizer(br.readLine());

      int location = Integer.parseInt(st.nextToken());
      int height = Integer.parseInt(st.nextToken());

      startLocation = Math.max(startLocation, location);
      endLocation = Math.max(endLocation, location);
      maxHeight = Math.max(maxHeight, height);

      column.add(new Column(location, height));
    }

    column.sort(null);

    int[] heightArr = new int[endLocation + 1];

    int leftLocation = 0;
    int rightLocation = 0;

    Column temp = column.remove(column.size() - 1);

    boolean[] used = new boolean[endLocation + 1];

    heightArr[temp.location] = temp.height;
    
    leftLocation = temp.location;
    rightLocation = temp.location;
    
    used[temp.location] = true;

    while (!column.isEmpty()) {
      Column c = column.remove(column.size() - 1);

      int height = c.height;
      int location = c.location;

      if(used[location]) {
        continue;
      }
      
      if (location < leftLocation) {
        for (int i = location; i < leftLocation; i++) {
          heightArr[i] = height;
          used[i] = true;
        }
        leftLocation = location;
      } else if (rightLocation < location) {
        for (int i = rightLocation + 1; i <= location; i++) {
          heightArr[i] = height;
          used[i] = true;
        }
        rightLocation = location;
      }
    }

    int answer = 0;

    for(int i: heightArr) {
      answer += i;
    }

    System.out.print(answer);


  }

  static class Column implements Comparable<Column> {
    int location;
    int height;

    @Override
    public int compareTo (Column o) {
      return this.height - o.height;
    }

    Column (int location, int height) {
      this.location = location;
      this.height = height;
    }
  }
}

