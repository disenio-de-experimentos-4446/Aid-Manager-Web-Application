import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.css'
import Clipboard from 'v-clipboard'
import { createGtag } from "vue-gtag";



// Add PrimeVue
import PrimeVue from "primevue/config";
import { store } from "@/store/store.js";

// import i18n from "@/i18n.js";
import i18n from "@/i18n.js";

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
import Dropdown from "primevue/dropdown";
// App Theme
import 'primevue/resources/themes/md-light-indigo/theme.css';
import 'primevue/resources/primevue.min.css';


// PrimeIcons
import 'primeicons/primeicons.css';

// PrimeFlex
import 'primeflex/primeflex.css';
import router from "@/router/index.js";

const gtagId = import.meta.env.VITE_GTAG;
console.log('Google Analytics ID:', gtagId); // Para debug


const gtag = createGtag({
  config: {
    id: gtagId,
    params: {
      send_page_view: true,
      custom_map: { custom_parameter: 'custom_value' }
    }
  },
  // Integración con router para tracking automático
  bootstrap: true
}, router); // ← Importante: pasar el router aquí



createApp(App)
    .use(PrimeVue, { ripple: true })
    .use(router)
    .use(store)
    .use(Clipboard)
    .use(i18n)
    .use(gtag)
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
    .component('pv-dropdown', Dropdown)
    .mount('#app')