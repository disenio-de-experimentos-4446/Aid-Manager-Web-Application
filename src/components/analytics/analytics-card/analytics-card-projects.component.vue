<script>
import AnalyticsChartVerticalBar
  from "@/components/analytics/analytics-chart/analytics-chart-vertical-bar.component.vue";
import AnalyticsChartLine from "@/components/analytics/analytics-chart/analytics-chart-line.component.vue";
import AnalyticsChartHorizontalBar
  from "@/components/analytics/analytics-chart/analytics-chart-horizontal-bar.component.vue";
import AnalyticsChartDoughnut
  from "@/components/analytics/analytics-chart/analytics-chart-doughnut.component.vue";
import {analytic} from "@/models/analytic.entity.js";
import {AnalyticsService} from "@/services/analytics.service.js";
import AnalyticsCardReport from "@/components/analytics/analytics-card/analytics-card-report.component.vue";
import ModalCardContent from "@/components/analytics/modal-card/modal-card-content.component.vue";
import DropdownAnalytics from "@/components/analytics/dropdown-analytics/dropdown-analytics.component.vue";

export default {
  name: "analytics-card-projects",
  components: {
    DropdownAnalytics,
    ModalCardContent,
    AnalyticsCardReport,
    AnalyticsChartVerticalBar, AnalyticsChartLine, AnalyticsChartHorizontalBar, AnalyticsChartDoughnut},
  data() {
    return {
      analytics: analytic,
      AnalyticsApiService: new AnalyticsService(),
      selectedCard: null,
      projectId: null,
      showDialog: false,
      tasks: [],
      completed: 0,
      workload: 0,
      progress: 0,
      budget: 0,
      projectName: null
    }
  },
  methods: {
     updateProjectId(id, name) {
      this.projectId = id;
      this.projectName = name;
      this.fetchAnalytics();
    }, handleTaskData(data) {
      this.tasks = data;
      console.log('DATA RECEIVED', data);

      this.completed = data.filter(task => task.state === 'DONE').length;
      this.workload = data.filter(task => task.state === 'TODO').length;
      this.progress = (this.completed / data.length * 100).toFixed(2);
      let bud = this.analytics.find(analytic => analytic.title === 'statistics');
      console.log(bud, "SEXXXXXXXXXX")
      this.budget = (bud.current[1]/100 * bud.current[2]).toFixed(2);

    },
    async fetchAnalytics() {
      try {
        const response = await this.AnalyticsApiService.getAnalytic(this.projectId);
        this.analytics = response.data;
        console.log('AnalyticsCardProjects created:', response.data);
      } catch (error) {
        console.error('Error getting analytics:', error);
      }
    },
  }

}
</script>
<template>
  <section class="h-full p-4 lg:p-5 w-full relative" style="min-height: 100%">
    <div class="flex flex-row justify-content-between flex-wrap gap-0">
      <div class="flex flex-column gap-4" style="width: unset">
        <div><h2 v-if="projectName" class="title-analytics text-4xl">{{projectName}} Project </h2><h2 class="title-analytics text-4xl">Analytics</h2></div>

        <dropdown-analytics @project-selected="updateProjectId"></dropdown-analytics>
      </div>
      <div class="align-self-center border-1 flex align-items-center
        flex-row border-round-2xl text-white mb-2"
           style="width: unset; background-color: #293A80; padding: 15px 20px; gap: 10px">
        <p class="w-max">You can view</p>
        <i class="text-lg pi pi-eye text-green-100"></i>
      </div>
    </div>
    <div v-if="projectId" class="analytics-container">
      <pv-card class="card stats w-full p-4 cursor-pointer">
        <template #header>
          <p class="font-medium mb-3">Currents Status:</p>
        </template>
        <template #content>
          <ul class="flex flex-column flex-1 h-full gap-3">
            <li class="flex flex-row justify-content-between">
              <p></p>
            </li>
            <li class="flex flex-row justify-content-between">
              <p>Tasks</p>
              <span class="text-green-700 font-light">{{ completed }} tasks completed</span>
            </li>
            <li class="flex flex-row justify-content-between">
              <p>Workload</p>
              <span class="text-green-700 font-light"> {{ workload }} tasks in progress</span>
            </li>
            <li class="flex flex-row justify-content-between">
              <p>Progress</p>
              <span class="text-green-700 font-light">{{ progress }}% complete</span>
            </li>
            <li class="flex flex-row justify-content-between">
              <p>Over/Under</p>
              <span class="text-green-700 font-light">{{ budget }}% budget</span>
            </li>
          </ul>
        </template>
      </pv-card>
      <pv-card class="card tasks flex w-full flex-column cursor-pointer">
        <template #header>
          <p class="text">Tasks:</p>
        </template>
        <template #content>
          <div class="flex w-full">
            <analytics-chart-doughnut v-if="projectId" :projectId="projectId" @tasksData="handleTaskData"></analytics-chart-doughnut>
          </div>
        </template>
      </pv-card>
      <pv-card class="card payments flex w-full flex-column w-full cursor-pointer">
        <template #header>
          <p class="text">Expected Amounts:</p>
        </template>
        <template #content>
          <div class="graph">
            <analytics-chart-horizontal-bar v-if="projectId" :projectId="projectId"></analytics-chart-horizontal-bar>
          </div>
        </template>
      </pv-card>
      <pv-card class="card progress flex w-full flex-column w-full cursor-pointer">
        <template #header>
          <p class="text">Monthly Income Projections:</p>
        </template>
        <template #content>
          <div class="flex">
            <analytics-chart-line v-if="projectId" :projectId="projectId"></analytics-chart-line>
          </div>
        </template>
      </pv-card>
      <pv-card class="card flex w-full flex-column cost cursor-pointer">
        <template #header>
          <p class="text">Budget Planning:</p>
        </template>
        <template #content>
          <div class="flex">
            <analytics-chart-vertical-bar v-if="projectId" :projectId="projectId"></analytics-chart-vertical-bar>
          </div>
        </template>
      </pv-card>
    </div>
    <div v-if="!projectId">
      <p class="text-center">Select a project to view analytics</p>
    </div>
  </section>
</template>

<style scoped>

.card:hover {
  background-color: #F5F5F5;
}

.title-analytics {
  font-family: 'Lora', serif;
  color: #02513D;
  font-weight: 600 !important;
  letter-spacing: 1.05px;
}

.analytics-container {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: auto 1fr;
  gap: 20px;
}

.stats {
  grid-column: 1 / 3;
  grid-row: 1 / 2;
}

.tasks {
  grid-column: 3 / 5;
  grid-row: 1 / 2;
}

.payments {
  grid-column: 5 / 7;
  grid-row: 1 / 2;
}

.progress {
  grid-column: 1 / 4;
  grid-row: 2 / 3;
}

.cost {
  grid-column: 4 / 7;
  grid-row: 2 / 3;
}

@media (max-width: 1024px) {
  .analytics-container {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(5, auto);
  }

  .stats, .tasks, .payments, .progress, .cost {
    grid-column: 1 / 2;
  }

  .stats {
    grid-row: 1 / 2;
  }

  .tasks {
    grid-row: 2 / 3;
  }

  .payments {
    grid-row: 3 / 4;
  }

  .progress {
    grid-row: 4 / 5;
  }

  .cost {
    grid-row: 5 / 6;
  }
}

.flex {
  display: flex;
  justify-content: center;
  width: 100%;
}

.text {
  padding-left: 30px;
  padding-top: 20px;
  padding-bottom: 10px;
}

</style>