<script>
import {analytic} from "@/models/analytic.entity.js";
import {AnalyticsService} from "@/services/analytics.service.js";

export default {
  name: 'analytics-chart-line',
  data() {
    return {
      chartData: null,
      chartOptions: null,
      analytics: analytic,
      AnalyticsApiService: new AnalyticsService()
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
      const documentStyle = getComputedStyle(document.documentElement);

      const lineAnalytics = this.analytics.find(analytic => analytic.title === 'Progress-line');

      const currentData =  lineAnalytics.values[0]['current'];
      const expectedData =  lineAnalytics.values[0]['expected'];

      return {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'september','October', 'November','december'],
        datasets: [
          {
            label: 'Current',
            data: currentData,
            fill: false,
            backgroundColor: documentStyle.getPropertyValue('--green-300'),
            borderColor: documentStyle.getPropertyValue('--green-300'),
            tension: 0.4
          },
          {
            label: 'Expected',
            data: expectedData,
            fill: false,
            backgroundColor: documentStyle.getPropertyValue('--green-500'),
            borderColor: documentStyle.getPropertyValue('--green-500'),
            tension: 0.4
          }
        ]
      };
    },
    setChartOptions() {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');
      const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
      const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

      return {
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        plugins: {
          legend: {
            labels: {
              color: textColor
            }
          }
        },
        scales: {
          x: {
            ticks: {
              color: textColorSecondary
            },
            grid: {
              color: surfaceBorder
            }
          },
          y: {
            ticks: {
              color: textColorSecondary
            },
            grid: {
              color: surfaceBorder
            }
          }
        }
      };
    }
  }
};
</script>
<template>
  <div class="card">
    <pv-chart type="line" :data="chartData" :options="chartOptions" class="h-10rem" />
  </div>
</template>

<style scoped>

</style>