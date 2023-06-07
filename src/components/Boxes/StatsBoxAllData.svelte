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
    .rectangle {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 25%;
      height: 200px;
      border: 1px solid #ccc;
      border-radius: 4px;
      margin: 1rem;
      padding: 1rem;
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
        <p>{tip.tokens} - {tip.date} - {tip.user}</p>
      {/each}
    </div>
    <div class="rectangle">
      <h2 class="text-xl font-semibold">Longest Pvts</h2>
      {#each longestPvts as pvt}
        <p>{pvt.tokens.length} tokens - {pvt.date} - {pvt.user}</p>
      {/each}
    </div>
    <div class="rectangle">
      <h2 class="text-xl font-semibold">Best Spenders</h2>
      {#each bestSpenders as spender}
        <p>{spender.count} - {spender.user}</p>
      {/each}
    </div>
  </div>
  