<script lang="ts">
  import { onMount } from 'svelte';
  import { Chart, registerables} from 'chart.js';
  import type {ChartData, ChartDataset, ChartOptions} from 'chart.js'
  import data from '../../data.json';

  let chart: Chart; 
  
  let timePeriod: string = 'monthly';

  interface DataEntry {
    UID: string;
    reference_id: string;
    date: string;
    tokens: string;
    user: string;
    type: string;
    notes: string;
  }

  function processChartData(data: DataEntry[], timePeriod: string): number[] {
    const months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const chartData: number[] = Array(12).fill(0);

    data.forEach((entry) => {
      const monthIndex = new Date(entry.date).getMonth();
      const tokens = parseInt(entry.tokens);

      if (timePeriod === 'monthly') {
        chartData[monthIndex] += tokens;
      } else if (timePeriod === 'daily') {
        chartData[monthIndex] += tokens / 31; 
      } else if (timePeriod === 'weekly') {
        chartData[monthIndex] += tokens / 4.33; 
      }
    });

    return chartData;
  }

  let chartData: ChartData<'line'> = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
      {
        label: 'Period 1',
        data: processChartData(data, timePeriod),
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
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
    chartData.datasets[0].data = processChartData(data, timePeriod);
    chart.update();
  }

  function setChartTimePeriod(event: Event) {
    const target = event.target as HTMLSelectElement;
    timePeriod = target.value;
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
  <select class="p-2 border rounded-md" on:change={setChartTimePeriod}>
    <option value="weekly">Weekly</option>
    <option value="daily">Daily</option>
    <option value="monthly">Monthly</option>
  </select>
</div>

<div class="flex items-center justify-center">
  <div class="grid grid-cols-12 w-full">
    {#each ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'] as month}
      <div class="col-span-1 text-center">{month}</div>
    {/each}
  </div>
</div>
