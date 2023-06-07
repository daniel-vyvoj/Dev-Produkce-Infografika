<script lang="ts">
  import { onMount } from 'svelte';
  import { Chart, registerables } from 'chart.js';
  import type { ChartData, ChartDataset, ChartOptions } from 'chart.js';
  import data from '../../data.json';

  let chart: Chart;

  let comparisonType: string = 'tokens';
  let pastPeriod: string = 'weekly';
  let currentPeriod: string = 'weekly';

  interface DataEntry {
    UID: string;
    reference_id: string;
    date: string;
    tokens: string;
    user: string;
    type: string;
    notes: string;
  }

  function processChartData(data: DataEntry[], period: string): number[] {
    const chartData: number[] = Array(12).fill(0);

    data.forEach((entry) => {
      const monthIndex = new Date(entry.date).getMonth();
      const tokens = parseInt(entry.tokens);

      if (period === 'monthly') {
        chartData[monthIndex] += tokens;
      } else if (period === 'daily') {
        chartData[monthIndex] += tokens / 31;
      } else if (period === 'weekly') {
        chartData[monthIndex] += tokens / 4.33;
      } else if (period === 'yearly') {
        chartData[monthIndex] += tokens / 12;
      }
    });

    return chartData;
  }

  let chartData: ChartData<'line'> = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
      {
        label: 'Past Period',
        data: processChartData(data, pastPeriod),
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: false,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      {
        label: 'Current Period',
        data: processChartData(data, currentPeriod),
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: false,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const chartOptions: ChartOptions = {
    scales: {
      x: {
        ticks: {
          display: false,
        },
      },
    },
  };

  function updateChart() {
    chartData.datasets[0].data = processChartData(data, pastPeriod);
    chartData.datasets[1].data = processChartData(data, currentPeriod);
    chart.update();
  }

  function setChartParameters() {
    updateChart();
  }

  onMount(() => {
    Chart.register(...registerables);

    const ctx = document.getElementById('chartmain') as HTMLCanvasElement;
    if (!ctx) return;

    chart = new Chart(ctx, {
      type: 'line',
      data: chartData,
      options: chartOptions,
    });
  });
</script>

<div class="my-4">
  <canvas id="chartmain" width="600" height="80"></canvas>
</div>

<div class="flex items-center justify-center my-2">
  <select class="p-2 border rounded-md" bind:value={comparisonType} on:change={setChartParameters}>
    <option value="tokens">Total Tokens</option>
    <option value="users">Total Users</option>
    <!-- Add more comparison options as needed -->
  </select>

  <select class="p-2 border rounded-md ml-2" bind:value={pastPeriod} on:change={setChartParameters}>
    <option value="daily">Daily</option>
    <option value="weekly">Weekly</option>
    <option value="monthly">Monthly</option>
    <option value="yearly">Yearly</option>
    <!-- Add more period options as needed -->
  </select>

  <select class="p-2 border rounded-md ml-2" bind:value={currentPeriod} on:change={setChartParameters}>
    <option value="daily">Daily</option>
    <option value="weekly">Weekly</option>
    <option value="monthly">Monthly</option>
    <option value="yearly">Yearly</option>
    <!-- Add more period options as needed -->
  </select>
</div>

<div class="flex items-center justify-center">
  <div class="grid grid-cols-12 w-full">
    {#each ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'] as month}
      <div class="col-span-1 text-center">{month}</div>
    {/each}
  </div>
</div>
