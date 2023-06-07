<script lang="ts">
  import { onMount } from 'svelte';
  import Chart from 'chart.js/auto';
  import type { ChartConfiguration } from 'chart.js/auto';
  import data from '../../data.json';

  interface Entry {
    UID: string;
    reference_id: string;
    date: string;
    tokens: string;
    user: string;
    type: string;
    notes: string;
  }

  interface TipType {
    value: number;
    count: number;
    percentage: number;
  }

  let tipTypes: TipType[] = [];

  onMount(() => {
    const tipTypeMap: Map<number, number> = new Map();

    data.forEach((entry: Entry) => {
      const { type, tokens } = entry;

      if (type === 'Tip') {
        const tipValue: number = parseInt(tokens);
        if (tipTypeMap.has(tipValue)) {
          const currentCount: number = tipTypeMap.get(tipValue) || 0;
          tipTypeMap.set(tipValue, currentCount + 1);
        } else {
          tipTypeMap.set(tipValue, 1);
        }
      }
    });

    const totalTips: number = Array.from(tipTypeMap.values()).reduce((a, b) => a + b, 0);

    tipTypes = Array.from(tipTypeMap)
      .map(([value, count]: [number, number]) => ({
        value,
        count,
        percentage: (count / totalTips) * 100,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 3); // Zobrazit pouze 3 nejlepší typy tipů

    const tipChartCtx: HTMLCanvasElement | null = document.getElementById('tipChart') as HTMLCanvasElement;

    if (tipChartCtx) {
      const chartConfig: ChartConfiguration = {
        type: 'doughnut',
        data: {
          labels: tipTypes.map((tipType) => `${tipType.value}tks`),
          datasets: [
            {
              data: tipTypes.map((tipType) => tipType.count),
              backgroundColor: ['red', 'green', 'blue', 'orange'], // Upravit barvy podle potřeby
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: '80%',
        },
      };

      const chart = new Chart(tipChartCtx, chartConfig);
    }
  });
</script>

<style>
  .tip-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-bottom: 1rem;
  }

  .tip-chart {
    width: 300px;
    height: 300px;
    margin-bottom: 1rem;
  }
</style>

<div class="tip-container">
  <div class="tip-chart">
    <canvas id="tipChart" />
  </div>

  <h2 class="text-xl font-semibold">Tip Types</h2>
  <hr class="my-2 border border-gray-400">
  {#each tipTypes as tipType}
    <p>{tipType.value}tks - {tipType.count} - {tipType.percentage.toFixed(2)}%</p>
  {/each}
</div>
