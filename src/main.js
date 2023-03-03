import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import store from './store';
import axios from './axios';

import Moment from './mixins/MomentController.vue';
import Toast from './mixins/ToastController.vue';

import BaseLayout from './views/components/BaseLayout.vue';

import { IonicVue } from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

// import { defineCustomElements } from '@ionic/pwa-elements/loader';


/* Theme variables */
import './theme/variables.css';
import './theme/custom.css';

const app = createApp(App)
    .use(IonicVue)
    .use(router)
    .use(store);

app.config.globalProperties.$axios = axios;

app.mixin(Moment);
app.mixin(Toast);

app.component('base-layout', BaseLayout);

router.isReady().then(() => {
    // defineCustomElements(window)
    app.mount('#app');
});