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

    const spenderCounts = Array.from(userTokenMap.values());
    const uniqueSpenders = Array.from(userTokenMap.keys()).length;
    const thresholds = [50000, 100000, 150000, 200000];
    const spenderData = [];
    let previousThreshold = 0;

    for (const threshold of thresholds) {
      const spenderCount = spenderCounts.filter(tokens => tokens > previousThreshold && tokens <= threshold).length;
      const percentage = (spenderCount / uniqueSpenders) * 100;
      spenderData.push({ threshold, spenderCount, percentage });
      previousThreshold = threshold;
    }

    // Vytvoření grafu
    const ctx = document.getElementById('spenderChart');
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: spenderData.map(data => `${previousThreshold + 1}-${data.threshold}`),
        datasets: [
          {
            label: 'Spenders',
            data: spenderData.map(data => data.spenderCount),
            backgroundColor: ['blue', 'purple', 'red', 'green'],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '80%',
      },
    });

    spenders = spenderData;
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

  <h2 class="text-xl font-semibold">Spenders (Count %)</h2>
  <hr class="my-2 border border-gray-400">
  {#each spenders as spender}
    <p>{spender.threshold}: {spender.spenderCount} ({spender.percentage.toFixed(2)}%)</p>
  {/each}
</div>
