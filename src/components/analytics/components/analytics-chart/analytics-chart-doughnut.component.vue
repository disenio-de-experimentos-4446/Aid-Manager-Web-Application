<script>
import {AnalyticsService} from "@/services/analytics.service.js";
import {analytic} from "@/models/analytic.entity.js";
export default {
  name: 'analytics-chart-doughnut',
  data() {
    return {
      chartData: null,
      analytics: analytic,
      AnalyticsApiService: new AnalyticsService(),
      chartOptions: {
        cutout: '60%'
      }
    };
  },
  async created() {
    const response = await this.AnalyticsApiService.getAnalytic();
    this.analytics = response.data;
    this.chartData = this.setChartData();
    this.chartOptions = this.setChartOptions();
  },

  methods: {
    setChartData() {
      const documentStyle = getComputedStyle(document.body);
      // Find the correct analytics object
      const progressAnalytics = this.analytics.find(analytic => analytic.title === 'Progress');

      // If the analytics object is found, use its values, otherwise use default values
      const data = [progressAnalytics.values[0]['to-do'], progressAnalytics.values[0]['in-progress'], progressAnalytics.values[0]['done']] ;

      return {
        labels: ['To-Do', 'In Progress', 'Done'],
        datasets: [
          {
            data: data,
            backgroundColor: [documentStyle.getPropertyValue('--teal-200'), documentStyle.getPropertyValue('--green-200'), documentStyle.getPropertyValue('--green-500')],
            hoverBackgroundColor: [documentStyle.getPropertyValue('--teal-200'), documentStyle.getPropertyValue('--green-200'), documentStyle.getPropertyValue('--green-500')]
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
              cutout: '60%',
              color: textColor
            }
          }
        },
        responsive: true,
        maintainAspectRatio: false
      };
    }
  }
};
</script>

<template>
    <pv-chart type="doughnut" :data="chartData" :options="chartOptions" class="w-full md:w-30rem" />

</template>

<style scoped>
</style>