

<script lang="ts">
    let timeRange = 'daily'; // Výchozí hodnota časového období
  
    // Funkce pro aktualizaci dat v boxech na základě výběru časového období
    function updateData() {
      // Zde můžete implementovat logiku pro aktualizaci dat v boxech
      console.log('Vybrané časové období:', timeRange);
    }
  </script>
  
  <style>
    .time-range-selector {
      text-align: right;
      margin-bottom: 16px;
    }
  </style>
  
  <div class="time-range-selector">
    <label for="timeRangeSelect">Select date time</label>
    <select id="timeRangeSelect" bind:value={timeRange} on:change={updateData}>
      <option value="daily">Daily</option>
      <option value="weekly">Weekly</option>
      <option value="monthly">Monthly</option>
    </select>
  </div>
  