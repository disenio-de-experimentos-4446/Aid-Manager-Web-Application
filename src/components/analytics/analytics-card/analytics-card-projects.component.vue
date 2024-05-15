<script>
import AnalyticsChartVerticalBar
  from "@/components/analytics/analytics-chart/analytics-chart-vertical-bar.component.vue";
import AnalyticsChartLine from "@/components/analytics/analytics-chart/analytics-chart-line.component.vue";
import AnalyticsChartHorizontalBar
  from "@/components/analytics/analytics-chart/analytics-chart-horizontal-bar.component.vue";
import AnalyticsChartDoughnut
  from "@/components/analytics/analytics-chart/analytics-chart-doughnut.component.vue";
import {analytic} from "@/models/analytic.entity.js";
import {AnalyticsService} from "@/services/analytics.service.js";
import AnalyticsCardReport from "@/components/analytics/analytics-card/analytics-card-report.component.vue";

export default {
  name: "analytics-card-projects",
  components: {
    AnalyticsCardReport,
    AnalyticsChartVerticalBar, AnalyticsChartLine, AnalyticsChartHorizontalBar, AnalyticsChartDoughnut},
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
  <section class="h-full p-4 lg:p-5 w-full">
    <h2>Clean Carpayo Beach</h2>
    <h3 class="my-3 font-medium">Current projects:</h3>
    <div class="analytics-container">
      <pv-card class="card stats w-full">
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
              <p class="line">{{ an.values[0].time }}</p>
              <p class="line">{{ an.values[0].tasks }}</p>
              <p class="line">{{ an.values[0].workload }}</p>
              <p class="line">{{ an.values[0].progress }}</p>
              <p class="line">{{ an.values[0].cost }}</p>
            </div>
          </div>
        </template>
      </pv-card>
      <pv-card class="card tasks flex w-full flex-column">
        <template #header>
          <p class="text">Tasks:</p>
        </template>
        <template #content>
          <div class="flex w-full">
            <analytics-chart-doughnut></analytics-chart-doughnut>
          </div>
        </template>
      </pv-card>
      <pv-card class="card payments flex w-full flex-column w-full">
        <template #header>
          <p class="text">Expected payments:</p>
        </template>
        <template #content>
          <div class="graph">
            <analytics-chart-horizontal-bar></analytics-chart-horizontal-bar>
          </div>
        </template>
      </pv-card>
      <pv-card class="card progress flex w-full flex-column w-full">
        <template #header>
          <p class="text">Progress:</p>
        </template>
        <template #content>
          <div class="flex">
            <analytics-chart-line></analytics-chart-line>
          </div>
        </template>
      </pv-card>
      <pv-card class="card flex w-full flex-column cost">
        <template #header>
          <p class="text">Progress:</p>
        </template>
        <template #content>
          <div class="flex">
            <analytics-chart-vertical-bar></analytics-chart-vertical-bar>
          </div>
        </template>
      </pv-card>
    </div>
  </section>
</template>

<style scoped>

.analytics-container {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: auto 1fr;
  gap: 20px;
}

.stats {
  grid-column: 1 / 3;
  grid-row: 1 / 2;
}

.tasks {
  grid-column: 3 / 5;
  grid-row: 1 / 2;
}

.payments {
  grid-column: 5 / 7;
  grid-row: 1 / 2;
}

.progress {
  grid-column: 1 / 4;
  grid-row: 2 / 3;
}

.cost {
  grid-column: 4 / 7;
  grid-row: 2 / 3;
}

@media (max-width: 1024px) {
  .analytics-container {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(5, auto);
  }

  .stats, .tasks, .payments, .progress, .cost {
    grid-column: 1 / 2;
  }

  .stats {
    grid-row: 1 / 2;
  }

  .tasks {
    grid-row: 2 / 3;
  }

  .payments {
    grid-row: 3 / 4;
  }

  .progress {
    grid-row: 4 / 5;
  }

  .cost {
    grid-row: 5 / 6;
  }
}

.flex {
  display: flex;
  justify-content: center;
  width: 100%;
}

.text {
  padding-left: 30px;
  padding-top: 20px;
  padding-bottom: 10px;
}

.paragraph {
  margin-right: 6rem;
  padding-left: 40px;
}

.icon {
  padding-top: 5.5rem;
  padding-left: 11rem;
}

.line {
  margin-bottom: 1rem;
}
</style>