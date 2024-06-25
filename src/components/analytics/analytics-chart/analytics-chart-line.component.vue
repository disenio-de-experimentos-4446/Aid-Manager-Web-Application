<script>
import {analytic} from "@/models/analytic.entity.js";
import {AnalyticsService} from "@/services/analytics.service.js";

export default {
  name: 'analytics-chart-line',
  props: ['analyticsData'], // Recibe los datos de analytics como una propiedad
  data() {
    return {
      chartData: null,
      chartOptions: null,
      analytics: this.analyticsData || analytic, // Usa los datos de analytics si están disponibles
      AnalyticsApiService: new AnalyticsService()
    };
  },
  async created() {
    if (!this.analyticsData) { // Si no se proporcionaron datos de analytics, los obtiene
      const response = await this.AnalyticsApiService.getAnalytic();
      this.analytics = response.data;
    }
    this.chartData = this.setChartData();
    this.chartOptions = this.setChartOptions();
  },
  methods: {
    async handleUpdateClick(graphicId, newGraphicData) {
      try {
        const response = await this.AnalyticsApiService.updateAnalytics(graphicId, newGraphicData);
        // Aquí puedes manejar la respuesta, por ejemplo, actualizando los datos locales
        this.chartData = this.setChartData(response.data);
      } catch (error) {
        console.error('Error updating graphic:', error);
      }
    },
    setChartData() {
      const documentStyle = getComputedStyle(document.documentElement);

      const lineChartAnalytics = this.analytics.find(analytic => analytic.title === 'Progress');

      const currentData =  lineChartAnalytics.current;
      const expectedData =  lineChartAnalytics.expected;

      return {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'Current',
            backgroundColor: documentStyle.getPropertyValue('--green-300'),
            borderColor: documentStyle.getPropertyValue('--green-300'),
            data: currentData,
            fill: false
          },
          {
            label: 'Expected',
            backgroundColor: documentStyle.getPropertyValue('--green-500'),
            borderColor: documentStyle.getPropertyValue('--green-500'),
            data: expectedData,
            fill: false
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
  <div class="card w-full flex p-5">
    <pv-chart type="line" :data="chartData" :options="chartOptions" class="h-12rem w-full"  />
  </div>
</template>

<style scoped>
</style>