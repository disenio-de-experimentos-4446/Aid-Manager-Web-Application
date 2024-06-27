<script>
import {AnalyticsService} from "@/services/analytics.service.js";
import {analytic} from "@/models/analytic.entity.js";
export default {
  name: 'analytics-chart-doughnut',
  props: {
    analytics: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chartData: null,
      chartOptions: {
        cutout: '60%'
      }
    };
  },
  watch: {
    analytics: {
      handler() {
        this.chartData = this.setChartData();
        this.chartOptions = this.setChartOptions();
      },
      deep: true
    }
  },
  async created() {
    this.chartData = this.setChartData();
    this.chartOptions = this.setChartOptions();
  },

  methods: {
    setChartData() {
      const documentStyle = getComputedStyle(document.body);

      const tasks = this.analytics.tasks;

      return {
        labels: ['To-Do', 'In Progress', 'Done'],
        datasets: [
          {
            data: tasks,
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
    <div class="card w-full h-full p-3 flex">
      <pv-chart type="doughnut" :data="chartData" :options="chartOptions" class="flex w-full h-12rem" />
    </div>
</template>

<style scoped>
</style>