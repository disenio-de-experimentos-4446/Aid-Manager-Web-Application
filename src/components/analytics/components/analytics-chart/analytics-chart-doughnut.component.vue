<script>
export default {
  name: 'analytics-chart-doughnut',
  data() {
    return {
      chartData: null,
      chartOptions: {
        cutout: '60%'
      }
    };
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
  <div class=" justify-content-center " style="margin-left:60px">
    <pv-chart type="doughnut" :data="chartData" :options="chartOptions" class="w-full md:w-13rem" />
  </div>
</template>

<style scoped>
</style>