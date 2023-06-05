<script lang="ts">
  import { onMount } from 'svelte';
  import Chart from 'chart.js/auto';
  import data from '../../data.json';

  let totalTokens = 0;
  let chart;

  onMount(() => {
    // Výpočet celkového počtu tokenů
    totalTokens = data.reduce((sum, item) => sum + parseInt(item.tokens), 0);

    // Vytvoření grafu
    const ctx = document.getElementById('mfcchart');
    chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['MFC Tokens', '?'],
        datasets: [
          {
            data: [totalTokens, 1000000 - totalTokens], // Přizpůsobte maximálnímu počtu tokenů
            backgroundColor: ['blue', 'lightgray'],
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
  .chart-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-bottom: 1rem;
  }

  .chart {
    width: 150px;
    height: 150px;
    margin-bottom: 1rem;
  }
</style>

<div class="chart-container">
  <div class="chart">
    <canvas id="mfcchart" />
  </div>

  <h2 class="text-xl font-semibold">%MFC Tokens</h2>
  <hr class="my-2 border border-gray-400">
  <p>Total sum Tokens {totalTokens}</p>
</div>
