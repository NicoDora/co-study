function solution(n, results) {
    const graph = Array.from({ length: n + 1 }, () => []);
    const reverseGraph = Array.from({ length: n + 1 }, () => []);
    let answer = 0;
    
    for (const [a, b] of results) {
        graph[a].push(b);
        reverseGraph[b].push(a);
    }
    
    function dfs(start, graph) {
        const visited = Array(n + 1).fill(false);
        let count = 0;
        
        function traverse(node) {
            for (const next of graph[node]) {
                if (visited[next]) continue;
                
                count++;
                visited[next] = true;
                traverse(next);
            }
        }
        
        traverse(start);
        
        return count;
    }
    
    for (let i = 1; i <= n; i++) {
        const winCount = dfs(i, graph);
        const loseCount = dfs(i, reverseGraph);
        
        if (winCount + loseCount === n - 1) answer++;
    }
    
    return answer;
}
