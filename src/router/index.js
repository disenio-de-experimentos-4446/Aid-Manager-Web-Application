import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/home.component.vue'
import Calendar from '../pages/calendar.component.vue'
import Analytics from "@/pages/analytics.component.vue";
import Team from "@/pages/team.component.vue";
import todoComponent from "@/components/projects/todo.component.vue";
import Login from "@/pages/login/login-content.component.vue";
import MainLayoutPage from "@/pages/main-layout/main-layout-page.vue";
import SignUp from "@/pages/signup/signup-content.component.vue";
import PaymentDetails from "@/pages/payment-details/payment-details.component.vue";
import Setup from "@/pages/preliminar-setup/setup-content.component.vue";
import NewPost from "@/pages/new-post.component.vue";
import Profile from "@/pages/profile.component.vue";
import ProjectsComponent from "@/pages/projects.component.vue";
import Subscription from "@/pages/subscription/subscription-content.component.vue";
import Identification from "@/pages/identification-frame/identification-frame.component.vue";

const routes = [
    { path: '/login', component: Login },
    { path: '/register', component: SignUp },
    { path: '/identification', component: Identification },
    { path: '/payment', component: PaymentDetails },
    { path: '/setup', component: Setup },
    { path: '/subscription', component: Subscription },
    { path: '/', redirect: '/login' },
    {
        path: '/',
        component: MainLayoutPage,
        children: [
            { path: 'home', component: Home },
            { path: 'calendar', component: Calendar },
            { path: 'projects', component: ProjectsComponent },
            { path: 'projects/:id/toDo', name: 'projectTodo', component: todoComponent, props: true },
            { path: 'analytics', component: Analytics },
            { path: 'team', component: Team },
            { path: 'new-post', component: NewPost },
            { path: 'profile/:id', name:'profile', component: Profile },
        ]
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})

export default router