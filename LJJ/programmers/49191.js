function solution(n, results) {
    const winList = Array.from({length : n + 1}, () => []);
    const loseList = Array.from({length: n + 1}, () => []);
    
    for (let i = 0; i < results.length; i++) {
        const winner = results[i][0];
        const loser = results[i][1];
        
        winList[winner].push(loser);
        loseList[loser].push(winner);
        
    }
      
    function bfs(count, arrList) {
        const visited = Array.from({length: n+1}, () => false);
    
        const queue = [];
        queue.push(count);
        let rate = 0;
        
        while (queue.length > 0) {
            const cur = queue.shift();
                        
            if (!visited[cur]) {
                visited[cur] = true;
                rate++;
                const curList = arrList[cur];
                for (let i = 0; i < curList.length; i++) {
                    queue.push(curList[i]);
                }
            }
        }
        return rate - 1;
    }
    
    const rates = [];
    
    for (let i = 1; i <= n; i++) {
        const winCount = bfs(i, winList);
        const loseCount = bfs(i, loseList);
        if (winCount + loseCount === n - 1) {
            rates.push(winCount + loseCount);
        }

    }
    return rates.length
}