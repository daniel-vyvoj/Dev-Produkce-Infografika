<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import Chart from 'chart.js/auto';
  import type { ChartConfiguration, ChartType, ChartData } from 'chart.js';
  import data from '../../data.json';

  let chart: Chart<keyof ChartType, ChartData<keyof ChartType>, ChartConfiguration<keyof ChartType>> | undefined;
  let chartDrawn = false;

  let tipData: { type: string; tokens: number; percentage: number }[] = [];

  onMount(() => {
    if (!chartDrawn) {
      prepareTipData();
      drawChart();
      chartDrawn = true;
    }
  });

  onDestroy(() => {
    if (chart) {
      chart.destroy();
    }
  });

  function prepareTipData() {
    const totalEarnings = data.reduce((sum, item) => sum + parseInt(item.tokens), 0);

    const tipTypes = Array.from(new Set(data.map((item) => item.type)));

    tipData = tipTypes.map((type) => {
      const tokens = data.filter((item) => item.type === type).reduce((sum, item) => sum + parseInt(item.tokens), 0);
      const percentage = (tokens / totalEarnings) * 100;
      return { type, tokens, percentage };
    });
  }

  function drawChart() {
    if (chart) {
      chart.destroy();
    }

    const ctx = document.getElementById('tipschart') as HTMLCanvasElement;
    chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: tipData.map((item) => item.type),
        datasets: [
          {
            data: tipData.map((item) => item.tokens),
            backgroundColor: ['purple', 'green', 'blue', 'orange', 'yellow', 'red'],
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
    <canvas id="tipschart" />
  </div>

  <h2 class="text-lg font-semibold">Tips</h2>
  <hr class="my-2 border border-gray-400">
  {#each tipData as tip}
    <li>
      {tip.type} - {tip.tokens} tokens - {tip.percentage.toFixed(2)}%
    </li>
  {/each}
</div>
