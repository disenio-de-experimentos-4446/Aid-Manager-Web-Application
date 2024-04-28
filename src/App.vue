<script>
import Toolbar from "@/public/toolbar.component.vue";
import Sidebar from "@/public/sidebar.component.vue";
import Home from "@/pages/home.component.vue";

export default {
  name: 'App',
  components: {Home, Toolbar, Sidebar},
  data() {
    return {
      sidebarVisible: true,
    }
  },
  methods: {

    toggleNav() {
      console.log(this.sidebarVisible);
      this.sidebarVisible = !this.sidebarVisible;
    },

    updateSidebarVisible() {
      this.sidebarVisible = window.innerWidth > 1023;
    }
  },
  mounted() {
    this.updateSidebarVisible();
    window.addEventListener('resize', this.updateSidebarVisible);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.updateSidebarVisible);
  }
}
</script>

<template>
  <div class="app-container">
    <toolbar :toggleNav="toggleNav" class="toolbar"></toolbar>
    <sidebar :sidebarVisible="sidebarVisible" class="sidebar-content"></sidebar>
    <main class="main-content">
      <router-view></router-view>
    </main>
  </div>
</template>

<style>

/*para testing no borrar, estos estilos son gloables*/
.border {
  border: 1px solid blue;
}

.app-container {
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-columns: 350px 1fr;
  grid-template-areas:
    "toolbar toolbar"
    "sidebar main-content";
  min-height: 100vh;
  height: 100%;
}

.toolbar {
  grid-area: toolbar;
}

.sidebar-content {
  grid-area: sidebar;
  background-color: #FFFFFF;
}

.main-content {
  grid-area: main-content;
  min-height: 100%;
  padding: 20px;
}

/*para el style del scroll owo*/

::-webkit-scrollbar-track
{
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
  border-radius: 10px;
  background-color: #F5F5F5;
}

::-webkit-scrollbar
{
  width: 12px;
  background-color: #F5F5F5;
}

::-webkit-scrollbar-thumb
{
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
  background-color: #BABABA;
}

@media (max-width: 1024px) {
  .app-container {
    grid-template-rows: auto 1fr;
    grid-template-columns: 1fr;
    grid-template-areas:
    "toolbar"
    "main-content";
    min-height: 100vh;
  }

}

</style>
