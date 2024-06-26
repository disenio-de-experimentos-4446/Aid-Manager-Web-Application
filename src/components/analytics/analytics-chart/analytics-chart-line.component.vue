<script>
import {analytic} from "@/models/analytic.entity.js";
import {AnalyticsService} from "@/services/analytics.service.js";

export default {
  name: 'analytics-chart-line',
  props: {
    analytics: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chartData: null,
      chartOptions: null,
    };
  },
  watch: {
    analytics: {
      handler() {
        this.updateChartData();
      },
      deep: true
    }
  },
  async created() {
    this.updateChartData();
  },
  methods: {

    updateChartData() {
      if (this.analytics && this.analytics.lines) {
        const currentData = this.analytics.lines.slice(0, 12);
        const expectedData = this.analytics.lines.slice(12, 24);

        this.chartData = this.setChartData(currentData, expectedData);
        this.chartOptions = this.setChartOptions(currentData, expectedData);
      }
    },

    setChartData(currentData, expectedData) {
      const documentStyle = getComputedStyle(document.documentElement);

      return {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'september', 'October', 'November', 'december'],
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
    setChartOptions(currentData, expectedData) {
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
        },
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
    }
  }
};
</script>
<template>
  <div class="card w-full flex p-3">
    <pv-chart type="line" :data="chartData" :options="chartOptions" class="w-full h-12rem"/>
  </div>
</template>

<style scoped>

</style>