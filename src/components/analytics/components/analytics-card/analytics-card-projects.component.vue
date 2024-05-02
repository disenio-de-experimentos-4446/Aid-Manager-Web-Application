<script>
import AnalyticsChartVerticalBar from "@/components/analytics/components/analytics-chart/analytics-chart-vertical-bar.component.vue";
import AnalyticsChartLine from "@/components/analytics/components/analytics-chart/analytics-chart-line.component.vue";
import AnalyticsChartHorizontalBar from "@/components/analytics/components/analytics-chart/analytics-chart-horizontal-bar.component.vue";
import AnalyticsChartDoughnut from "@/components/analytics/components/analytics-chart/analytics-chart-doughnut.component.vue";
export default {
  name: "analytics-card-projects",
  components: {AnalyticsChartVerticalBar, AnalyticsChartLine, AnalyticsChartHorizontalBar, AnalyticsChartDoughnut}
}
</script>
<template>
  <h2>Clean Carpayo Beach</h2>
  <h3>Current projects</h3>
  <div class="flex">
    <pv-card class="card">
      <template #header>
        <p class="text">Currents Status:</p>
      </template>
      <template #content>
        <div class="flex">
          <div class="paragraph">
            <p>Time</p>
            <p>Tasks</p>
            <p>Workload</p>
            <p>Progress</p>
            <p>Cost</p>
          </div>
          <div >
            <p>prueba</p>
            <p>prueba</p>
            <p>prueba</p>
            <p>prueba</p>
            <p>prueba</p>
          </div>
        </div>
      </template>
    </pv-card>
    <pv-card class="card">
      <template #header>
        <p class="text">Tasks:</p>
      </template>
      <template #content>
        <div class="flex">
         <analytics-chart-doughnut></analytics-chart-doughnut>
        </div>
      </template>
    </pv-card>
    <pv-card class="card">
      <template #header>
        <p class="text">Expected payments:</p>
      </template>
      <template #content>
        <div class="graph">
          <analytics-chart-horizontal-bar></analytics-chart-horizontal-bar>
        </div>
      </template>
    </pv-card>
  </div>
  <br>
  <div class="flex">
    <pv-card class="card">
      <template #header>
        <p class="text">Progress:</p>
      </template>
      <template #content>
        <div class="flex">
          <analytics-chart-line></analytics-chart-line>
        </div>
      </template>
    </pv-card>
    <pv-card class="card">
      <template #header>
        <p class="text">Progress:</p>
      </template>
      <template #content>
        <div class="flex">
          <analytics-chart-vertical-bar></analytics-chart-vertical-bar>
        </div>
      </template>
    </pv-card>
    <pv-card class="card">
      <template #content>
        <div class="icon">
          <i class="pi pi-plus" style="font-size: 3rem; color: green"></i>
        </div>
      </template>
    </pv-card>
  </div>
</template>

<style scoped>
.card{
  width: 25rem;
  height: 15rem;
  overflow: hidden;
  background-color: #E6F4E2;
  margin-right: 1rem;
}
.flex{
  display: flex;
}
.text{
  padding-left:30px;
  padding-top:20px;
  padding-bottom:10px;
}
.paragraph{
  margin-right: 10rem;
  padding-left:30px;
}
.icon{
  padding-top: 5.5rem;
  padding-left: 11rem;
}
</style>