import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router';
import {message,notification} from "ant-design-vue";
const app = createApp(App);
app.config.globalProperties.$message=message;
app.config.globalProperties.$notification=notification;
app.use(createPinia()).use(router).mount('#app')
