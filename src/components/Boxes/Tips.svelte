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

  interface TopTipper {
    label: string;
    value: number;
  }

  let topTippers: TopTipper[] = [];

  onMount(() => {
    // Výpočet top tippers
    const userTipMap: Map<string, number> = new Map();

    data.forEach((entry: Entry) => {
      const { user, type } = entry;

      if (type === 'MFC Share') {
        if (userTipMap.has(user)) {
          const currentTips: number = userTipMap.get(user) || 0;
          userTipMap.set(user, currentTips + 1);
        } else {
          userTipMap.set(user, 1);
        }
      }
    });

    topTippers = Array.from(userTipMap)
      .map(([user, tipCount]: [string, number]) => ({ label: user, value: tipCount }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 3); // Zobrazit pouze top 3 tippers

    // Vytvoření grafu pro top tippers
    const tipperCtx: HTMLCanvasElement | null = document.getElementById('tipperChart') as HTMLCanvasElement;
    if (tipperCtx) {
      const chartConfig: ChartConfiguration = {
        type: 'doughnut',
        data: {
          labels: topTippers.map(tipper => tipper.label),
          datasets: [
            {
              label: 'Top Tippers',
              data: topTippers.map(tipper => tipper.value),
              backgroundColor: ['green', 'orange', 'pink'],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,  
          cutout: '80%',
        },
      };

      new Chart(tipperCtx, chartConfig);
    }
  });
</script>

<style>
  .spender-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-bottom: 1rem;
  }

  .spender-chart {
    width: 300px;
    height: 300px;
    margin-bottom: 1rem;
  }
</style>

<div class="spender-container">
  <div class="spender-chart">
    <canvas id="tipperChart" />
  </div>

  <h2 class="text-xl font-semibold">Top Tippers (Count)</h2>
  <hr class="my-2 border border-gray-400">
  {#each topTippers as tipper}
    <p>{tipper.label}: {tipper.value}</p>
  {/each}
</div>
