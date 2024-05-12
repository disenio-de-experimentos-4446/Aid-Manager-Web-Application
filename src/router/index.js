import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/home.component.vue'
import Calendar from '../pages/calendar.component.vue'
import Analytics from "@/pages/analytics.component.vue";
import Projects from "@/pages/projects.component.vue";
import Team from "@/pages/team.component.vue";
import todoComponent from "@/components/projects/components/todo.component.vue";
import loginContentComponent from "@/pages/login/login-content.component.vue";

const routes = [
    { path: '/', component: Home },
    { path: '/calendar', component: Calendar },
    { path: '/projects', component: Projects},
    { path: '/projects/:id/toDo',
        name: 'projectTodo',
        component: todoComponent, props: true
    },
    { path: '/analytics', component: Analytics },
    { path: '/team', component: Team },
    { path: '/login', component: loginContentComponent }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router