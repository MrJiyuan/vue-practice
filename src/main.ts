
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './assets/main.css'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import reset from './assets/css/reset.less?inline'

const app = createApp(App)

app.use(createPinia())

app.use(Antd).mount('#app');
