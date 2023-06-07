<script lang="ts">
  import { onMount } from 'svelte';
  import { afterUpdate } from 'svelte';

  import Chart from 'chart.js/auto';
  import 'chartjs-plugin-datalabels';
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
            data: [mfcTokens, totalTokens - mfcTokens],
            backgroundColor: ['blue', 'transparent'],
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '80%',
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: false,
          },
          datalabels: {
            display: true,
            color: 'white',
            font: {
              weight: 'bold',
              size: 24,
            },
            formatter: (value) => value.toLocaleString(),
            anchor: 'center',
            align: 'center',
            offset: -10,
          },
        },
      },
    });
  }

  function updateChart() {
    if (chart) {
      chart.data.datasets[0].data = [mfcTokens, totalTokens - mfcTokens];
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
    position: relative;
    width: 100%;
    max-width: 300px;
    height: 300px;
    margin-bottom: 1rem;
  }
</style>

<div class="chart-container">
  <div class="chart">
    <canvas id="mfcchart"></canvas>
    <div class="chart-label">SUM TKS</div>
  </div>
</div>
