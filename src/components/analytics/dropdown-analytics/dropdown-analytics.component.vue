<script>
import ProjectsService from "@/public/projects.service.js";

export default {
  name: "dropdown-analytics",
  data() {
    return {
      projectsService: new ProjectsService(),
      projectSelected: null,
      projects: []
    };
  },
  async mounted() {
    const companyId = this.$store.state.user.companyId;
    await this.projectsService.getProjects(companyId)
        .then(r => {
          if(!r) console.log('No projects found')
          else {
            console.log(r.data)
            this.projects = r.data;
          }
        })
  }
}
</script>


<template>
  <pv-dropdown v-model="projectSelected" :options="projects" optionLabel="name" placeholder="Select a project" class="w-full md:w-14rem p-2 mb-4">
    <template #value="slotProps">
      <div v-if="slotProps.value" class="flex align-items-start">
        <div>{{ slotProps.value.name }}</div>
      </div>
    </template>
    <template #option="slotProps">
      <div class="p-2">{{ slotProps.option.name }}</div>
    </template>
  </pv-dropdown>
</template>

<style scoped>

</style>