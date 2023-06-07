<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import Chart from 'chart.js/auto';
  import type { ChartConfiguration, ChartType, ChartData } from 'chart.js';
  import data from '../../data.json';

  let chart: Chart<keyof ChartType, ChartData<keyof ChartType>, ChartConfiguration<keyof ChartType>> | undefined;
  let chartDrawn = false;

  let tipData: { type: string; tokens: number; percentage: number; color: string }[] = [];

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
      const color = getTipColor(type);
      return { type, tokens, percentage, color };
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
            backgroundColor: tipData.map((item) => item.color),
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '80%',
        plugins: {
          legend: {
            labels: {
              pointStyle: 'circle',
              usePointStyle: true,
            },
          },
        },
      },
    });
  }

  function getTipColor(type: string): string {
    switch (type) {
      case 'MFC Share':
        return 'green';
      case 'Private':
        return 'blue';
      case 'Premium':
        return 'orange';
      case 'Tip':
        return 'yellow';
      case 'Voyeur':
        return 'red';
      case 'Group Show':
        return 'black';
      default:
        return 'purple,';
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
    width: 100%;
    max-width: 300px;
    height: 300px;
    margin-bottom: 1rem;
  }

  .tip-list {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 1rem;
  }

  .tip-item {
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;
  }

  .tip-label {
    display: flex;
    align-items: center;
    margin-right: 0.5rem;
  }

  .tip-label-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin-right: 0.25rem;
  }

  .tip-tokens {
    margin-right: 0.5rem;
  }

  .tip-percentage {
    color: #888;
  }
</style>

<div class="chart-container">
  <div class="chart">
    <canvas id="tipschart" />
  </div>

  <div class="tip-list">
    {#each tipData as tip}
      <div class="tip-item">
        <div class="tip-label">
          <span class="tip-label-dot" style="background-color: {tip.color};"></span>
          {tip.type}
        </div>
        <div class="tip-tokens">{tip.tokens.toLocaleString()}</div>
        <div class="tip-percentage">{tip.percentage.toFixed(2)}%</div>
      </div>
    {/each}
  </div>
</div>
