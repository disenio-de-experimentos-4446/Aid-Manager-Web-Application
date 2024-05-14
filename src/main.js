import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.css'

// Add PrimeVue
import PrimeVue from "primevue/config";
import { store } from "@/store/store.js";

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
import Calendar from 'primevue/calendar';
import Chart from 'primevue/chart';
import Dialog from "primevue/dialog";
import InputNumber from "primevue/inputnumber";
import Textarea from "primevue/textarea";
// App Theme
import 'primevue/resources/themes/md-light-indigo/theme.css';
import 'primevue/resources/primevue.min.css';

// PrimeIcons
import 'primeicons/primeicons.css';

// PrimeFlex
import 'primeflex/primeflex.css';
import router from "@/router/index.js";

createApp(App)
    .use(PrimeVue, { ripple: true })
    .use(router)
    .use(store)
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
    .component('pv-dialog', Dialog)
    .component('pv-calendar', Calendar)
    .component('pv-input-number', InputNumber)
    .component('pv-text-area', Textarea)
    .mount('#app')