<script lang="ts">
  import { onMount } from 'svelte';
  import { afterUpdate } from 'svelte';

  import Chart from 'chart.js/auto';
  import type { ChartConfiguration } from 'chart.js';

  import data from '../../data.json';

  let totalTokens = 0;
  let mfcTokens = 0;
  let chart: Chart | null = null;

  onMount(() => {
    calculateTokenCounts();
    createChart();
  });

  afterUpdate(() => {
    calculateTokenCounts();
    updateChart();
  });

  function calculateTokenCounts() {
    totalTokens = data.reduce((sum, item) => sum + parseInt(item.tokens), 0);
    mfcTokens = totalTokens;
  }

  function createChart() {
    const ctx = document.getElementById('mfcchart') as HTMLCanvasElement;
    chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['MFC Tokens'],
        datasets: [
          {
            data: [mfcTokens],
            backgroundColor: ['blue'],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '80%',
      },
    });
  }

  function updateChart() {
    if (chart) {
      chart.data.datasets[0].data = [mfcTokens];
      chart.update();
    }
  }
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
    width: 300px;
    height: 300px;
    margin-bottom: 1rem;
  }
</style>

<div class="chart-container">
  <div class="chart">
    <canvas id="mfcchart"></canvas>
  </div>

  <h2 class="text-xl font-semibold">%MFC Tokens</h2>
  <hr class="my-2 border border-gray-400">
  <p>Total sum Tokens: {totalTokens}</p>
</div>
