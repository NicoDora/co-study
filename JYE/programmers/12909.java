import java.util.Queue;
import java.util.ArrayDeque;

class Solution {
    boolean solution(String s) {
        Queue<Character> queue = new ArrayDeque<>();
        char[] chars= s.toCharArray();
        
        for(char c: chars) {
            if (!queue.isEmpty() && queue.peek() == '(' && c == ')') {
                queue.poll();
            } else {
                queue.add(c);
            }
        }
        
        return queue.isEmpty() ? true : false;
    }
}