<script>
import { AnalyticsService } from "@/services/analytics.service.js";

export default {
  name: 'analytics-chart-doughnut',
  data() {
    return {
      chartData: null,
      chartOptions: null,
      AnalyticsApiService: new AnalyticsService()
    };
  },
  async created() {
    const response = await this.AnalyticsApiService.getAnalytic();
    const tasksAnalytics = response.data.find(analytic => analytic.title === 'Tasks');
    this.chartData = this.setChartData(tasksAnalytics.current);
    this.chartOptions = this.setChartOptions();
  },
  methods: {
    setChartData(currentData) {
      const documentStyle = getComputedStyle(document.documentElement);
      return {
        labels: ['To Do', 'In Progress', 'Done'],
        datasets: [
          {
            data: currentData,
            backgroundColor: [
              documentStyle.getPropertyValue('--teal-200'),
              documentStyle.getPropertyValue('--green-200'),
              documentStyle.getPropertyValue('--green-500')
            ],
            borderColor: [
              documentStyle.getPropertyValue('--teal-200'),
              documentStyle.getPropertyValue('--green-200'),
              documentStyle.getPropertyValue('--green-500')
            ]
          }
        ]
      };
    },
    setChartOptions() {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');
      return {
        plugins: {
          legend: {
            labels: {
              color: textColor
            }
          }
        }
      };
    }
  }
};
</script>

<template>
    <div class="card w-full h-full p-3 flex">
      <pv-chart type="doughnut" :data="chartData" :options="chartOptions" class="flex w-full h-12rem" />
    </div>
</template>

<style scoped>
</style>