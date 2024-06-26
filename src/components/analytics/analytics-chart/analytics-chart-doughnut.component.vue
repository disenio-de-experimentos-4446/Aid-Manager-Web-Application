<script>
import { AnalyticsService } from "@/services/analytics.service.js";
import {fetchTaskData} from "@/services/projects-api.services.js";

export default {
  name: 'analytics-chart-doughnut',
  data() {
    return {
      chartData: null,
      chartOptions: null,
      AnalyticsApiService: new AnalyticsService(),
      ToDo: 0,
      InProgress: 0,
      Done: 0
    };
  },
  async created() {
    this.chartOptions = this.setChartOptions();
    try {
      const response = await fetchTaskData(this.projectId);
      let emittedData = response;
      this.ToDo = response.filter(task => task.state === 'TODO').length;
      this.InProgress = response.filter(task => task.state === 'DOING').length;
      this.Done = response.filter(task => task.state === 'DONE').length;
      this.chartData = this.setChartData([this.ToDo, this.InProgress, this.Done]);
      console.log('AnalyticsChartDoughnut created:', this.chartData);
      this.getTasks(emittedData); // Emit the chart data to the parent component
    } catch (error) {
      console.error('Error getting tasks:', error);
    }

  },
  methods: {
    setChartData(currentData) {
      const documentStyle = getComputedStyle(document.documentElement);
      return {
        labels: ['To Do', 'In Progress', 'Done'],
        datasets: [
          {
            data: currentData,
            backgroundColor: [
              documentStyle.getPropertyValue('--teal-200'),
              documentStyle.getPropertyValue('--green-200'),
              documentStyle.getPropertyValue('--green-500')
            ],
            borderColor: [
              documentStyle.getPropertyValue('--teal-200'),
              documentStyle.getPropertyValue('--green-200'),
              documentStyle.getPropertyValue('--green-500')
            ]
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
              color: textColor
            }
          }
        }
      };
    },
    getTasks(data){
      console.log("DATA EMITTED", data);
      this.$emit('tasksData', data);
    }
  },
  props: {
    projectId: {
      type: Number,
      required: true
    }
  }
};
</script>

<template>
    <div class="card w-full h-full p-3 flex">
      <pv-chart type="doughnut" :data="chartData" :options="chartOptions" class="flex w-full h-12rem" />
      <p class="smallLabel">Todo: {{ToDo}} | In Progress: {{InProgress}} | Done: {{Done}}</p>
    </div>
</template>

<style scoped>

.card{
  flex-direction: column;
  justify-content: center;
}

.smallLabel{
  font-size: 0.8rem;
  color: var(--text-color-secondary);
  margin-top: 1rem;
  text-align: center;
}

</style>