import java.util.List;
import java.util.ArrayList;
import java.util.ArrayDeque;
import java.util.Queue;

class Solution {
    
    static List<List<Integer>> win;
    static List<List<Integer>> lose;
    static int N;
    
    public int solution(int n, int[][] results) {
        int answer = 0;
        N = n;
        
        win = new ArrayList<>();
        lose = new ArrayList<>();
        
        for (int i = 0; i <= n; i++) {
            win.add(new ArrayList<>());
            lose.add(new ArrayList<>());
        }
        
        for (int[] r : results) {
            win.get(r[0]).add(r[1]);
            lose.get(r[1]).add(r[0]);
        }
        
        for (int i = 1; i <= n; i++) {
            int size = win.get(i).size() + lose.get(i).size();
            if (size == n - 1) {
                answer++;
            } else {
                size = winBfs(i) + loseBfs(i);
                
                if (size == n - 1) {
                    answer++;
                }
            }
        }
        return answer;
    }
    
    static int winBfs(int input) {
        Queue<Integer> queue = new ArrayDeque<>();
        queue.add(input);
        boolean[] visited = new boolean[N + 1];
        visited[input] = true;
        
        int result = 0;
        while (!queue.isEmpty()) {
            int polled = queue.poll();
            
            for(int k: win.get(polled)) {
                if (!visited[k]) {
                    visited[k] = true;
                    result++;
                    queue.add(k);
                }
            }
            
        }
        
        return result;
    }
    
    static int loseBfs(int input) {
        Queue<Integer> queue = new ArrayDeque<>();
        boolean[] visited = new boolean[N + 1];
        visited[input] = true;
        queue.add(input); 
        
        int result = 0;
        while (!queue.isEmpty()) {
            int polled = queue.poll();
                        
            for(int k: lose.get(polled)) {
                if (!visited[k]) {
                    visited[k] = true;
                    result++;
                    queue.add(k);
                }
            }
        }

        return result;
    }
}