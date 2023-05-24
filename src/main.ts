
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './assets/main.css'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import reset from './assets/css/reset.less?inline'
import mitt from 'mitt' // 引入mitt
import Loading from './components/loadingPlugin'

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

// 定义全局变量与全局函数
app.config.globalProperties.$env = 'dev'; // 设定当前的开发环境是dev

app.config.globalProperties.$filter = {
    format<T>(value: T) {
        return `chr1s的全局函数${value}`;
    }
}
// 为全局变量书写声明文件
type Filter = {
    format<T>(value: T): string
}
declare module 'vue' {
    export interface ComponentCustomProperties {
        $env: string,
        $filter: Filter
    }
}

// 通过app.use()注册插件
app.use(Loading);
type Lod = {
    show: () => void,
    hide: () => void
}
//编写ts loading 声明文件放置报错 和 智能提示
declare module '@vue/runtime-core' {
    export interface ComponentCustomProperties {
        $loading: Lod
    }
}



app.use(createPinia());

app.use(Antd).mount('#app');
