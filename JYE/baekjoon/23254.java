  import java.io.BufferedReader;
  import java.io.IOException;
  import java.io.InputStreamReader;
  import java.util.StringTokenizer;
  import java.util.Queue;
  import java.util.PriorityQueue;

  class Main {

    public static void main(String[] args) throws IOException {
      BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
      StringTokenizer st = new StringTokenizer(br.readLine());

      final int HOUR_MULTI = Integer.parseInt(st.nextToken());
      final int AMOUNT = Integer.parseInt(st.nextToken());

      int leftTime = HOUR_MULTI * 24;

      int[] leftScore = new int[AMOUNT];
      int[] plus = new int[AMOUNT];

      st = new StringTokenizer(br.readLine());

      for (int i = 0; i < AMOUNT; i++) {
        leftScore[i] = 100 - Integer.parseInt(st.nextToken());
      }
      
      st = new StringTokenizer(br.readLine());

      for (int i = 0; i < AMOUNT; i++) {
        plus[i] = Integer.parseInt(st.nextToken());
      }

      int answer = 100 * AMOUNT;

      Queue<Subject> queue = new PriorityQueue<>();

      for (int i = 0; i < AMOUNT; i++) {
        queue.add(new Subject(i, leftScore[i], plus[i]));
      }

      while (leftTime > 0) {
        Subject polled = queue.poll(); 

        int i = polled.idx;
        int polledScore = polled.leftScore;
        int polledPlus = polled.plus;

        // System.out.println("i: " + i + "  score :" + polledScore + "  plus: " + polledPlus);
        leftScore[i] = polledScore - polledPlus;

        queue.add(new Subject(i, leftScore[i], polledPlus));
        leftTime--;
      }

      for (int s: leftScore) {
        if(s < 0) continue;
        answer -= s;
      }

      System.out.print(answer);
    }

    static class Subject implements Comparable<Subject> {
      int idx;
      int leftScore;
      int plus;

      @Override
      public int compareTo(Subject o) {
        int thisValue = Math.min(this.leftScore, this.plus);
        int otherValue = Math.min(o.leftScore, o.plus);
  
        return otherValue - thisValue;
      }

      Subject(int idx, int leftScore, int plus) {
        this.idx = idx;
        this.leftScore = leftScore;
        this.plus = plus;
      }
    }
  }