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
  },
  mounted() {
    this.chartData = this.setChartData();
    this.chartOptions = this.setChartOptions();
  },
  methods: {
    setChartData() {
      const documentStyle = getComputedStyle(document.body);

      return {
        labels: ['To-Do', 'In Progress', 'Done'],
        datasets: [
          {
            data: [540, 325, 702],
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