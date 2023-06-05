<script lang="ts">
  import { onMount } from 'svelte';
  import Chart from 'chart.js/auto';
  import data from '../../data.json';

  let spenders = [];

  onMount(() => {
    // Výpočet údajů o spenders
    const userTokenMap = new Map();
    data.forEach(entry => {
      const { user, tokens } = entry;
      if (userTokenMap.has(user)) {
        const currentTokens = userTokenMap.get(user);
        userTokenMap.set(user, currentTokens + parseInt(tokens));
      } else {
        userTokenMap.set(user, parseInt(tokens));
      }
    });

    spenders = Array.from(userTokenMap)
      .map(([user, tokens]) => ({ label: user, value: tokens }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 3); // Zobrazit pouze top 5 utrát

    // Vytvoření grafu
    const ctx = document.getElementById('spenderChart');
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: spenders.map(spender => spender.label),
        datasets: [
          {
            label: 'Spenders',
            data: spenders.map(spender => spender.value),
            backgroundColor: ['blue', 'purple', 'red'],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '80%',
      },
    });
  });
</script>

<style>
  .spender-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-bottom: 1rem;
  }

  .spender-chart {
    width: 300px;
    height: 300px;
    margin-bottom: 1rem;
  }
</style>

<div class="spender-container">
  <div class="spender-chart">
    <canvas id="spenderChart" />
  </div>

  <h2 class="text-xl font-semibold">Spenders (Count%)</h2>
  <hr class="my-2 border border-gray-400">
  {#each spenders as spender}
    <p>{spender.label}: {spender.value}</p>
  {/each}
</div>
