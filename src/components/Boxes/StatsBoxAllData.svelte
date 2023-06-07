<script lang="ts">
    import { onMount } from 'svelte';
    import data from '../../data.json';
  
    interface Entry {
      UID: string;
      reference_id: string;
      date: string;
      tokens: string;
      user: string;
      type: string;
      notes: string;
    }
  
    let sumTokensCount: number = 0;
    let highestTips: Entry[] = [];
    let longestPvts: Entry[] = [];
    let bestSpenders: { user: string; count: number }[] = [];
  
    onMount(() => {
      // Calculate sum of tokens count
      sumTokensCount = data.reduce((sum, entry) => sum + parseInt(entry.tokens), 0);
  
      // Find highest tips
      highestTips = data
        .filter((entry) => entry.type === 'Tip')
        .sort((a, b) => parseInt(b.tokens) - parseInt(a.tokens))
        .slice(0, 3);
  
      // Find longest pvts
      longestPvts = data
        .filter((entry) => entry.type === 'private' || entry.type === 'Private') // Přidáme další možné hodnoty typu pvts
        .sort((a, b) => b.tokens.length - a.tokens.length)
        .slice(0, 3);
  
      // Find best spenders
      const spendersMap: Map<string, number> = new Map();
      data.forEach((entry) => {
        const { user, tokens } = entry;
        if (spendersMap.has(user)) {
          const currentCount: number = spendersMap.get(user) || 0;
          spendersMap.set(user, currentCount + parseInt(tokens));
        } else {
          spendersMap.set(user, parseInt(tokens));
        }
      });
      bestSpenders = Array.from(spendersMap)
        .sort((a, b) => b[1] - a[1])
        .map(([user, count]) => ({ user, count }))
        .slice(0, 3);
    });
  </script>
  
  <style>
    .flex {
      display: flex;
      justify-content: space-between;
      margin-bottom: 1rem;
    }
  
    .rectangle {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 23%;
      height: 200px;
      border: 1px solid #ccc;
      border-radius: 4px;
      margin: 1rem;
      padding: 1rem;
    }
  
    .row {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 0.5rem;
    }
  
    .row p {
      margin: 0;
    }
  
    .number,
    .date,
    .nick {
      margin-right: 0.5rem;
    }
  
    .nick {
      font-weight: bold;
    }
  </style>
  
  <div class="flex">
    <div class="rectangle">
      <h2 class="text-xl font-semibold">SUM Tokens Count</h2>
      <p>{sumTokensCount}</p>
    </div>
    <div class="rectangle">
      <h2 class="text-xl font-semibold">Highest Tips</h2>
      {#each highestTips as tip}
        <div class="row">
          <p class="number">{tip.tokens}</p>
          <p class="date">{tip.date}</p>
          <p class="nick">{tip.user}</p>
        </div>
      {/each}
    </div>
    <div class="rectangle">
      <h2 class="text-xl font-semibold">Longest Pvts</h2>
      {#each longestPvts as pvt}
        <div class="row">
          <p class="number">{pvt.tokens.length} tokens</p>
          <p class="date">{pvt.date}</p>
          <p class="nick">{pvt.user}</p>
        </div>
      {/each}
    </div>
    <div class="rectangle">
      <h2 class="text-xl font-semibold">Best Spenders</h2>
      {#each bestSpenders as spender}
        <div class="row">
          <p class="number">{spender.count}</p>
          <p class="date"></p>
          <p class="nick">{spender.user}</p>
        </div>
      {/each}
    </div>
  </div>