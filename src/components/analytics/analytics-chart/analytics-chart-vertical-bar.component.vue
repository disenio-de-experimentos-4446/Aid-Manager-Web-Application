<script>
import {analytic} from "@/models/analytic.entity.js";
import {AnalyticsService} from "@/services/analytics.service.js";
import ModalCardContent from "@/components/analytics/modal-card/modal-card-content.component.vue";
export default {
  name: 'analytics-chart-vertical-bar',
  components: {ModalCardContent},
  data() {
    return {
      chartData: null,
      chartOptions: null,
      analytics: analytic,
      AnalyticsApiService: new AnalyticsService(),
      selectedCard: null
    };
  },
  async created() {
    console.log('AnalyticsVert Id:', this.projectId);
    try{
      const response = await this.AnalyticsApiService.getAnalytic(this.projectId);
      this.analytics = response.data;
      this.chartData = this.setChartData();
      this.chartOptions = this.setChartOptions();
      console.log('AnalyticsChartVerticalBar created:', response.data);
    }catch (error) {
      console.error('Error getting analytics:', error);
    }

  },props: {
    projectId: {
      type: Number,
      required: true
    }
  },
  methods: {
    setChartData() {
      const documentStyle = getComputedStyle(document.documentElement);

      const verticalBarChartAnalytics = this.analytics.find(analytic => analytic.title === 'statistics');

      const currentData =  verticalBarChartAnalytics.current;
      const expectedData =  verticalBarChartAnalytics.expected;

      return {
        labels: ['Expenses', 'Budget', 'Over/Under'],
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
    },
    async updateAnalytics(){
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
  <div class="card w-full p-5 flex" >
    <pv-chart type="bar" :data="chartData" :options="chartOptions" class="card h-12rem w-full" style="z-index:unset;"/>
    <button class="p-button card" @click="selectedCard = 'statistics'">Edit</button>
  </div>
  <modal-card-content v-if="selectedCard" :selectedCard="selectedCard" :Data="this.analytics"
                      @close="selectedCard = null" @update="updateAnalytics"></modal-card-content>

</template>
<style scoped>
.card {
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