<template>
    <div class="content">
        <div class="scrollable-container">
            <direct />
            <twoWayBinding />
            <refTemplate />
            <reactiveTemplate />
            <toTemplate />
            <computedTemplate />
            <lifeCycleTemplate v-if="lifeCycleTemplateFlag"></lifeCycleTemplate>
            <a-button @click="lifeCycleTemplateFlag = !lifeCycleTemplateFlag">创建-销毁lifeCycleTemplate组件</a-button>
            <fatherC></fatherC>
            <treeComponent></treeComponent>
            <a-typography-title :level="2">10-插槽</a-typography-title>
            <slotComponent>
                <template v-slot>
                    为子组件传递一些模板片段，让子组件在它们的组件中渲染这些片段。
                    <a-typography-paragraph>
                        <blockquote>
                            匿名插槽
                        </blockquote>
                    </a-typography-paragraph>
                    <div>
                        我是父组件插入子组件的匿名插槽
                    </div>
                </template>
                <template #footer>
                    <a-typography-paragraph>
                        <blockquote>
                            具名插槽
                        </blockquote>
                    </a-typography-paragraph>
                    <div>
                        我是父组件插入子组件的具名插槽,可以使用v-slot:footer也可以使用#footer
                    </div>
                </template>
                <template v-slot:renderScope="{ data, index }">
                    <div>{{ data.name }}---{{ data.age }}---{{ index }}</div>
                </template>
            </slotComponent>
            <component :is="dynamicComponents"></component>
        </div>

    </div>
</template>
    
<script setup lang='ts'>
import {
    ref, reactive
} from 'vue'
import direct from '../../components/1-direct.vue'
import twoWayBinding from '../../components/2-twoWayBinding.vue';
import refTemplate from '../../components/3-ref.vue';
import reactiveTemplate from '../../components/4-reactive.vue';
import toTemplate from "../../components/5-to.vue";
import computedTemplate from "../../components/6-computed&watch.vue";
import lifeCycleTemplate from '../../components/7-lifeCycle.vue'
import fatherC from '../../components/8-fatherC.vue'
import treeComponent from '../../components/9-modules.vue'
import slotComponent from '../../components/10-slot.vue'
import dynamicComponents from '../../components/11-dynamicComponents.vue';

let lifeCycleTemplateFlag = ref<Boolean>(false);


</script>
<style lang="less" scoped>
.content {
    flex: 1;
    margin: 20px;
    border: 1px solid #ccc;
    padding: 2.25rem 2.25rem .75rem;
    background-color: #f7f9fc;
    overflow: auto;
}

::-webkit-scrollbar {
    width: 6px;
    height: 10px;
}

::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 10px;
}
</style>