<script>
import {analytic} from "@/models/analytic.entity.js";
import {AnalyticsService} from "@/services/analytics.service.js";
export default {
  name: 'analytics-chart-vertical-bar',
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

      const vertialBarChartAnalytics = this.analytics.find(analytic => analytic.title === 'ProgressBar');

      const currentData =  vertialBarChartAnalytics.current;
      const expectedData =  vertialBarChartAnalytics.expected;

      return {
        labels: ['Actual', 'Planned', 'Budget'],
        datasets: [
          {
            label: 'Current',
            backgroundColor: documentStyle.getPropertyValue('--green-300'),
            borderColor: documentStyle.getPropertyValue('--green-300'),
            data: currentData
          },
          {
            label: 'Expected',
            backgroundColor: documentStyle.getPropertyValue('--green-500'),
            borderColor: documentStyle.getPropertyValue('--green-500'),
            data: expectedData
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
        aspectRatio: 0.8,
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
              color: textColorSecondary,
              font: {
                weight: 500
              }
            },
            grid: {
              display: false,
              drawBorder: false
            }
          },
          y: {
            ticks: {
              color: textColorSecondary
            },
            grid: {
              color: surfaceBorder,
              drawBorder: false
            }
          }
        }
      };
    }
  }
};
</script>
<template>
  <div class="card w-full p-5 flex">
    <pv-chart type="bar" :data="chartData" :options="chartOptions" class="h-12rem w-full"  />
  </div>
</template>
<style scoped>
</style>