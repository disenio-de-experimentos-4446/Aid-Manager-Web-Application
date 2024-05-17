<script>
import ProjectsService from "@/public/projects.service.js";
import projectsService from "@/public/projects.service.js";

export default {
  name: "dropdown-projects",
  data() {
    return {
      projectsService: new ProjectsService(),
      projectSelected: null,
      projects: []
    };
  },
  async mounted() {
    await this.projectsService.getProjects()
        .then(r => {
          if(!r) console.error('Error to get projects');
          else {
            this.projects = r.data.filter(p => p.name)
          }
        })
  }
}
</script>


<template>
  <div class="card flex justify-content-start">
    <pv-dropdown v-model="projectSelected" :options="projects" filter optionLabel="name" placeholder="Select a project" class="w-full md:w-14rem">
      <template #value="slotProps">
        <div v-if="slotProps.value" class="flex align-items-center">
          <div>{{ slotProps.value.name }}</div>
        </div>
      </template>
    </pv-dropdown>
  </div>
</template>

<style scoped>
  .card {
    margin-bottom: 2rem;
  }
</style>