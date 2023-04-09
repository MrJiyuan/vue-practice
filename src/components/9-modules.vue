<template>
    <a-typography-title :level="2">9-全局组件|局部组件|递归组件</a-typography-title>
    <div>
        <a-typography-paragraph>
            <blockquote>
                局部组件：拆分一个页面中的多个模块，每个模块都是一个组件
                <br>
                全局组件：高频组件，可以在任何页面中使用
                <br>
                递归组件：组件中调用自身，类似tree或者menu
                <br>
            </blockquote>
        </a-typography-paragraph>
    </div>
    <div>
        <card></card>
    </div>
    <a-typography-paragraph>
        <blockquote>
            借助插件vite-plugin-vue-setup-extend可以直接在script标签上定义name。
            <br>
            安装<br>
            npm i vite-plugin-vue-setup-extend -D<br>
            配置<br>
            // vite.config.ts<br>
            import VueSetupExtend from 'vite-plugin-vue-setup-extend'<br>
            plugins: [<br>
            VueSetupExtend()<br>
            ]<br>
            使用<br>
            &lt;script lang="ts" setup name="firstPage"&gt;<br>
            &lt;/script&gt;
        </blockquote>
        <pre>需要注意，如果在递归组件中加入click事件，需要使用@click.stop阻止冒泡</pre>
        <pre>如果要传入event事件，需要使用@click.stop="clickTap($event)</pre>
    </a-typography-paragraph>

    <tree :data="TreeData"></tree>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue'
import card from '../module/card.vue'
import tree from '../module/tree.vue'

interface Tree {
    name: string,
    checked: boolean,
    children?: Tree[]
}
const TreeData = reactive<Tree[]>([
    {
        name: '1',
        checked: false,
        children: [
            {
                name: '1-1',
                checked: false,
                children: [
                    {
                        name: '1-1-1',
                        checked: false,
                    },
                    {
                        name: '1-1-2',
                        checked: false,
                    },
                ]
            },
            {
                name: '1-2',
                checked: false,
            },
        ]
    },
    {
        name: '2',
        checked: false,
        children: [
            {
                name: '2-1',
                checked: false,
            },
            {
                name: '2-2',
                checked: false,
            },
        ]
    },
    {
        name: '3',
        checked: false,
        children: [
            {
                name: '3-1',
                checked: false,
            },
            {
                name: '3-2',
                checked: false,
            },
        ]
    },
])
</script>
<style scoped></style>