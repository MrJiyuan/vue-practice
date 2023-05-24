import type { App, VNode } from 'vue'      // 引入App类型和VNode类型
import Loading from './index.vue'          // 引入loading组件
import { createVNode, render } from 'vue'  // 引入createVNode方法,用于将Loading组件进行转码

// 注意,自定义插件还需要去main.ts中引入并注册
export default {
    install: (app: App) => {
        // 将Loading组件转码为VNode
        const VNode: VNode = createVNode(Loading);
        // 将VNode渲染到页面上(被挂载对象,挂载位置)
        render(VNode, document.body);
        app.config.globalProperties.$loading = {
            show: VNode.component?.exposed?.show,
            hide: VNode.component?.exposed?.hide
        };
        app.config.globalProperties.$loading;
    }
}