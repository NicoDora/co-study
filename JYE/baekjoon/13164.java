  import java.io.BufferedReader;
  import java.io.IOException;
  import java.io.InputStreamReader;
  import java.util.StringTokenizer;
  import java.util.Arrays;

  class Main {

    public static void main(String[] args) throws IOException {
      BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

      StringTokenizer st = new StringTokenizer(br.readLine());

      final int PEOPLE_COUNT = Integer.parseInt(st.nextToken());
      final int TEAM_COUNT = Integer.parseInt(st.nextToken());

      int[] people = new int[PEOPLE_COUNT];

      st = new StringTokenizer(br.readLine());

      for (int i = 0; i < PEOPLE_COUNT; i++) {
        people[i] = Integer.parseInt(st.nextToken());
      }

      Arrays.sort(people);

      if (TEAM_COUNT == 1) {
        System.out.print(people[PEOPLE_COUNT - 1] - people[0]);
        return;
      }

      int[] between = new int[PEOPLE_COUNT - 1];

      for (int i = 1; i < PEOPLE_COUNT; i++) {
        between[i - 1] = people[i] - people[i - 1];
      }

      Arrays.sort(between);
      
      int answer = 0;

      for (int i = 0; i < PEOPLE_COUNT - TEAM_COUNT; i++) answer += between[i];
      
      System.out.print(answer);
    }
  }

