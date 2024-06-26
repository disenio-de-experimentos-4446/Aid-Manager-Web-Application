<script>
import {analytic} from "@/models/analytic.entity.js";
import {AnalyticsService} from "@/services/analytics.service.js";
import ModalCardContent from "@/components/analytics/modal-card/modal-card-content.component.vue";

export default {
  name: 'analytics-chart-line',
  components: {ModalCardContent},
  props: {
    projectId: {
      type: Number,
      required: true
    }
  },
  query:{
    ["analyticsData"]: {
      type: Object,
      required: false
    }
  },// Recibe los datos de analytics como una propiedad
  data() {
    return {
      chartData: null,
      chartOptions: null,
      analytics: this.analyticsData || analytic, // Usa los datos de analytics si están disponibles
      AnalyticsApiService: new AnalyticsService(),
      selectedCard: null

    };
  },
  async created() {
    console.log('AnalyticsCLine Id:', this.projectId);
    if (!this.analyticsData) { // Si no se proporcionaron datos de analytics, los obtiene
      try {
        const response = await this.AnalyticsApiService.getAnalytic(this.projectId);
        this.analytics = response.data;
        console.log('AnalyticsChartLine created:', response.data);
      }catch (e)
      {
        console.error('Error getting analytics:', e);
      }

    }
    this.chartData = this.setChartData();
    this.chartOptions = this.setChartOptions();
  },
  methods: {
    setChartData() {
      const documentStyle = getComputedStyle(document.documentElement);

      const lineChartAnalytics = this.analytics.find(analytic => analytic.title === 'progress');

      console.log(lineChartAnalytics);

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
    },
    async updateAnalytics(data){
      console.log(data)
      console.log('UPDATED:', this.projectId);
      try{
        const response = await this.AnalyticsApiService.getAnalytic(this.projectId);
        this.analytics = response.data;
        this.chartData = this.setChartData();
        this.chartOptions = this.setChartOptions();
        console.log('AnalyticsChartHorizontalBar created:', response.data);
      } catch (error) {
        console.error('Error getting analytics:', error);
      }
    }
  }

};
</script>

<template>
  <div class="card w-full flex p-5 z-6">
    <pv-chart type="line" :data="chartData" :options="chartOptions" class="card h-12rem w-full"  />
    <button class="p-button card" @click="selectedCard = 'progress'">Edit</button>
  </div>
  <modal-card-content v-if="selectedCard" :selectedCard="selectedCard" :Data ="this.analytics" @close="selectedCard = null" @update="updateAnalytics"></modal-card-content>

</template>

<style scoped>
.card{
  flex-direction: column;
  justify-content: center;
  position: unset !important;
  z-index: unset !important;
}
.p-button{
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
}
</style>