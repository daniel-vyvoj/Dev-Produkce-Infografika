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

    tipData.sort((a, b) => b.percentage - a.percentage); // Sestupně podle podílu
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
    width: 100%;
    max-width: 300px;
    height: 300px;
    margin-bottom: 1rem;
  }

  .tip-list {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .tip-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0.5rem 1rem;
    margin-bottom: 0.5rem;
    background-color: #f3f3f3;
    border-radius: 4px;
  }

  .tip-type {
    font-weight: bold;
    font-size: 1.2rem;
  }

  .tip-tokens {
    font-size: 1rem;
    color: #555;
    margin-left: 0.5rem;
  }

  .tip-percentage {
    font-size: 1rem;
    color: #555;
    margin-left: 0.5rem;
  }
</style>

<div class="chart-container">
  <div class="chart">
    <canvas id="tipschart" />
  </div>

  <div class="tip-list">
    {#each tipData as tip}
      <div class="tip-item">
        <div class="tip-type">{tip.type}</div>
        <div class="tip-tokens">{tip.tokens.toLocaleString()}</div>
        <div class="tip-percentage">{tip.percentage.toFixed(2)}%</div>
      </div>
    {/each}
  </div>
</div>
