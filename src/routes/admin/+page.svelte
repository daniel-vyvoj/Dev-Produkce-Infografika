<script lang="ts">

    import MfcTokens from "../../components/Boxes/MFCTokens.svelte";
    import TipsTokens from "../../components/Boxes/TipsTokens.svelte";
    import SpendersCount from "../../components/Boxes/SpendersCount.svelte";
    import Tips from "../../components/Boxes/Tips.svelte";
    import EditData from "../../components/Boxes/EditData.svelte";
	import ChartMain from "../../components/Charts/ChartMain.svelte";
	import MainTable from "../../components/Tables/MainTable.svelte";
</script>

<EditData />
<div class="grid grid-cols-4 gap-4">
    <div class="border p-4 flex flex-col">
      <MfcTokens />
    </div>
    <div class="border p-4 flex flex-col">
      <TipsTokens />
    </div>
    <div class="border p-4 flex flex-col">
      <SpendersCount />
    </div>
    <div class="border p-4 flex flex-col">
      <Tips />
    </div>
  </div>
  <ChartMain/>
  <MainTable/>