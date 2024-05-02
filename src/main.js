import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.css'

// Add PrimeVue
import PrimeVue from "primevue/config";

// Add PrimeVue Components
import Card         from 'primevue/card';
import Button       from 'primevue/button';
import SelectButton from 'primevue/selectbutton';
import Sidebar      from 'primevue/sidebar';
import Avatar       from 'primevue/avatar';
import Menu         from 'primevue/menu';
import MenuBar      from 'primevue/menubar';
import Toolbar      from 'primevue/toolbar';
import Rating from 'primevue/rating';

// App Theme
import 'primevue/resources/themes/md-light-indigo/theme.css';
import 'primevue/resources/primevue.min.css';

// PrimeIcons
import 'primeicons/primeicons.css';

// PrimeFlex
import 'primeflex/primeflex.css';
import router from "@/router/index.js";
import Chart from 'primevue/chart';

createApp(App)
    .use(PrimeVue, { ripple: true })
    .use(router)
    .component('pv-card', Card)
    .component('pv-button', Button)
    .component('pv-select-button', SelectButton)
    .component('pv-sidebar', Sidebar)
    .component('pv-avatar', Avatar)
    .component('pv-menu', Menu)
    .component('pv-menubar', MenuBar)
    .component('pv-toolbar', Toolbar)
    .component('pv-rating', Rating)
    .component('pv-chart', Chart)
    .mount('#app')