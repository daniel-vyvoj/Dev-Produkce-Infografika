<script lang="ts">
    import { onMount } from 'svelte';
    import { Chart, registerables } from 'chart.js';
    import type { ChartData, ChartOptions } from 'chart.js';
  
    let chart: Chart;
    let timePeriod = 'monthly';
  
    function drawChart() {
      const ctx = document.getElementById('chart') as HTMLCanvasElement;
      if (!ctx) return;
  
      const data: ChartData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
          {
            label: 'Period 1',
            data: [50, 80, 60, 70, 90, 75, 85, 65, 70, 80, 60, 55],
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            fill: false,
            pointRadius: 4,
            pointHoverRadius: 6
          },
          {
            label: 'Period 2',
            data: [70, 60, 75, 55, 80, 85, 90, 65, 70, 60, 80, 75],
            borderColor: 'rgba(54, 162, 235, 1)',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            fill: false,
            pointRadius: 4,
            pointHoverRadius: 6
          }
        ]
      };
  
      const options: ChartOptions = {
        scales: {
          x: {
            ticks: {
              display: false
            }
          }
        }
      };
  
      chart = new Chart(ctx, {
        type: 'line',
        data,
        options
      });
    }
  
    function updateChart() {
      // Implement the logic to update the chart data here
      // Use chart.data.datasets[index].data to update the data
      chart.update();
    }
  
    function setChartTimePeriod(event: Event) {
      const target = event.target as HTMLSelectElement;
      timePeriod = target.value;
      updateChart();
    }
  
    onMount(() => {
      Chart.register(...registerables);
      drawChart();
    });
  </script>
  
  <div class="my-4">
    <canvas id="chart" width="400" height="80"></canvas>
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
      <div class="col-span-1 text-center">Jan</div>
      <div class="col-span-1 text-center">Feb</div>
      <div class="col-span-1 text-center">Mar</div>
      <div class="col-span-1 text-center">Apr</div>
      <div class="col-span-1 text-center">May</div>
      <div class="col-span-1 text-center">Jun</div>
      <div class="col-span-1 text-center">Jul</div>
      <div class="col-span-1 text-center">Aug</div>
      <div class="col-span-1 text-center">Sep</div>
      <div class="col-span-1 text-center">Oct</div>
      <div class="col-span-1 text-center">Nov</div>
      <div class="col-span-1 text-center">Dec</div>
    </div>
  </div>
  