import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import ConfirmationService from 'primevue/confirmationservice';
import ConfirmDialog from 'primevue/confirmdialog';

import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';   

const app = createApp(App).use(router);
app.use(PrimeVue);
// app.use(PrimeVue, { unstyled: true });
app.use(ConfirmationService);

app.component('ConfirmDialog', ConfirmDialog);

app.mount('#app');