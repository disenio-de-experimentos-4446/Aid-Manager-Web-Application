<script>
import AnalyticsCardProjects from "@/components/analytics/components/analytics-card/analytics-card-projects.component.vue";

export default {
  name: "analytics-content",
  components: {AnalyticsCardProjects},
}
</script>

<template>
  <section class="flex h-full flex-column p-3 lg:p-5 lg:pb-0">
    <div class="flex analytics-container border-round-xl">
    </div>
    <analytics-card-projects></analytics-card-projects>
  </section>
</template>

<style scoped>

section {
  background-color: #F7F7F7;
}

.analytics-container {
  position: relative;
}

.analytics-container::after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.3) 100%);
  border-radius: 15px;
}

</style>