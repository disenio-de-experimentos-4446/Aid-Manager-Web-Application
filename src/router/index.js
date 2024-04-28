import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/home.component.vue'
import Calendar from '../pages/calendar.component.vue'
import Analytics from "@/pages/analytics.component.vue";
import Projects from "@/pages/projects.component.vue";
import Team from "@/pages/team.component.vue";


const routes = [
    { path: '/', component: Home },
    { path: '/calendar', component: Calendar },
    { path: '/projects', component: Projects },
    { path: '/analytics', component: Analytics },
    { path: '/team', component: Team },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router