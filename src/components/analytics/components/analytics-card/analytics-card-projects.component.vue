<script>
import AnalyticsChartVerticalBar from "@/components/analytics/components/analytics-chart/analytics-chart-vertical-bar.component.vue";
import AnalyticsChartLine from "@/components/analytics/components/analytics-chart/analytics-chart-line.component.vue";
import AnalyticsChartHorizontalBar from "@/components/analytics/components/analytics-chart/analytics-chart-horizontal-bar.component.vue";
import AnalyticsChartDoughnut from "@/components/analytics/components/analytics-chart/analytics-chart-doughnut.component.vue";
import {analytic} from "@/models/analytic.entity.js";
import {AnalyticsService} from "@/services/analytics.service.js";
export default {
  name: "analytics-card-projects",
  components: {AnalyticsChartVerticalBar, AnalyticsChartLine, AnalyticsChartHorizontalBar, AnalyticsChartDoughnut},
  data() {
    return {
      analytics: analytic,
      AnalyticsApiService: new AnalyticsService()
    }
  },
  async created() {
    const response = await this.AnalyticsApiService.getAnalytic();
    this.analytics = response.data;
  }
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
            <p class="line">Time</p>
            <p class="line">Tasks</p>
            <p class="line">Workload</p>
            <p class="line">Progress</p>
            <p class="line">Cost</p>
          </div>
          <div v-for="(an, index) in analytics" :key="index">
            <p class="line">{{an.values[0].time}}</p>
            <p class="line">{{an.values[0].tasks}}</p>
            <p class="line">{{an.values[0].workload}}</p>
            <p class="line">{{an.values[0].progress}}</p>
            <p class="line">{{an.values[0].cost}}</p>
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
  margin-right: 6rem;
  padding-left:40px;
}
.icon{
  padding-top: 5.5rem;
  padding-left: 11rem;
}
.line{
 margin-bottom: 1rem;

}
</style>