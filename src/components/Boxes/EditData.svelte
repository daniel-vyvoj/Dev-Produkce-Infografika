<script lang="ts">
    let timeRange = 'This month'; // Výchozí hodnota časového období
  
    // Funkce pro aktualizaci dat v boxech na základě výběru časového období
    function updateData() {
      // Zde můžete implementovat logiku pro aktualizaci dat v boxech
      console.log('Vybrané časové období:', timeRange);
      
      // Aktualizovat data v boxech na základě výběru časového období nebo vlastního data
      if (timeRange === 'This month') {
        // Aktualizovat data pro aktuální měsíc
        console.log('Aktualizovat data pro aktuální měsíc');
      } else if (timeRange === 'Last month') {
        // Aktualizovat data pro předchozí měsíc
        console.log('Aktualizovat data pro předchozí měsíc');
      } else if (timeRange === 'This year') {
        // Aktualizovat data pro aktuální rok
        console.log('Aktualizovat data pro aktuální rok');
      } else if (timeRange === 'Last year') {
        // Aktualizovat data pro předchozí rok
        console.log('Aktualizovat data pro předchozí rok');
      } else if (timeRange === 'Custom') {
        // Získat hodnotu vlastního data
        const customDateInput = document.getElementById('customDate');
        const customDate = customDateInput.value;
        
        // Aktualizovat data pro vlastní datum
        console.log('Aktualizovat data pro vlastní datum:', customDate);
      }
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
        <option value="This month">This month</option>
        <option value="Last month">Last month</option>
        <option value="This year">This year</option>
        <option value="Last year">Last year</option>
        <option value="Custom">Custom</option>
    </select>
</div>

{#if timeRange === 'Custom'}
    <div class="time-range-selector">
        <label for="customDate">Custom Date:</label>
        <input type="date" id="customDate" on:change={updateData}>
    </div>
{/if}
