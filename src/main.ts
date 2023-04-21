
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './assets/main.css'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import reset from './assets/css/reset.less?inline'
import mitt from 'mitt' // 引入mitt

const app = createApp(App);

const Mit = mitt(); // 初始化mitt
// 必须要拓展ComponentCustomProperties类型才能获得类型提示
declare module 'vue' {
    interface ComponentCustomProperties {
        // 获取Mit所有的类型
        $Bus: typeof Mit
    }
}
// Vue3挂载全局API
app.config.globalProperties.$Bus = Mit;

app.use(createPinia());

app.use(Antd).mount('#app');
