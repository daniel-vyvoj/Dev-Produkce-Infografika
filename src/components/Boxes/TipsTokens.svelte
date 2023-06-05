<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import Chart from 'chart.js/auto';
  import type { ChartConfiguration, ChartType, ChartData } from 'chart.js';
  import data from '../../data.json';

  let tipsTokensPercentage = 0;
  let pvtPercentage = 0;
  let groupPercentage = 0;
  let truePvtPercentage = 0;
  let mfcSharePercentage = 0;
  let offlineTipsPercentage = 0;
  let chart: Chart<keyof ChartType, ChartData<keyof ChartType>, ChartConfiguration<keyof ChartType>> | undefined;
  let chartDrawn = false;

  // Highest tips
  let highestTips: { number: number; date: string; user: string }[] = [];

  onMount(() => {
    if (!chartDrawn) {
      drawChart();
      findHighestTips();
      chartDrawn = true;
    }
  });

  onDestroy(() => {
    if (chart) {
      chart.destroy();
    }
  });

  function drawChart() {
    // Calculate the percentage share of each section
    const totalEarnings = data.reduce((sum, item) => sum + parseInt(item.tokens), 0);
    tipsTokensPercentage =
      (data.filter((item) => item.type === 'Tips Tokens').reduce((sum, item) => sum + parseInt(item.tokens), 0) /
        totalEarnings) *
      100;
    pvtPercentage =
      (data.filter((item) => item.type === 'PVT').reduce((sum, item) => sum + parseInt(item.tokens), 0) / totalEarnings) *
      100;
    groupPercentage =
      (data.filter((item) => item.type === 'Group').reduce((sum, item) => sum + parseInt(item.tokens), 0) /
        totalEarnings) *
      100;
    truePvtPercentage =
      (data.filter((item) => item.type === 'True Pvt').reduce((sum, item) => sum + parseInt(item.tokens), 0) /
        totalEarnings) *
      100;
    mfcSharePercentage =
      (data.filter((item) => item.type === 'MFC Share').reduce((sum, item) => sum + parseInt(item.tokens), 0) /
        totalEarnings) *
      100;
    offlineTipsPercentage =
      (data.filter((item) => item.type === 'Offline Tips').reduce((sum, item) => sum + parseInt(item.tokens), 0) /
        totalEarnings) *
      100;

    if (chart) {
      chart.destroy();
    }


    const ctx = document.getElementById('tipschart') as HTMLCanvasElement;
    chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Tips Tokens','MFC Share',],
        datasets: [
          {
            data: [tipsTokensPercentage, pvtPercentage, groupPercentage, truePvtPercentage, mfcSharePercentage, offlineTipsPercentage],
            backgroundColor: ['purple','green',],
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

  function findHighestTips() {
    // Sort the data by tip amount in descending order
    const sortedData = data.sort((a, b) => parseInt(b.tokens) - parseInt(a.tokens));

    // Get the top 3 highest tips
    highestTips = sortedData
      .slice(0, 3)
      .map((item, index) => ({ number: parseInt(item.tokens), date: item.date, user: item.user }));
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
    width: 150px;
    height: 150px;
    margin-bottom: 1rem;
  }
</style>

<div class="chart-container">
  <div class="chart">
    <canvas id="tipschart" />
  </div>

  <h2 class="text-lg font-semibold">Highest Tips</h2>
  <hr class="my-2 border border-gray-400">
    {#each highestTips as tip, index (index)}
      <li>
        {index + 1}. <span>{tip.number} tokens</span> - <span>{tip.date}</span> - <span>{tip.user}</span>
      </li>
    {/each}
</div>
