<template>
    <a-typography-title :level="2">11-动态组件</a-typography-title>
    <a-typography-paragraph>
        <blockquote>
            让多个组件使用同一个挂载点，并动态切换，在挂载点使用component标签，然后使用v-bindis='组件'
        </blockquote>
        <blockquote>
            a ?? b 如果 a 的值为 null 或 undefined，则返回 b 的值，否则返回 a 的值。
            ??之能处理null和undefined，不能处理0，''，false
        </blockquote>
    </a-typography-paragraph>
    <div style="display: flex;">
        <div class="tabs" v-for="(item, index) in data" :class="[active == index ? 'active' : '']"
            @click="swichComponent(item, index)">
            <div>{{ item.name }}</div>
        </div>
    </div>

    <component :is="componentID"></component>
</template>

<script setup lang='ts'>
import { ref, reactive, shallowRef } from 'vue'
import A from './tabs/AComponent.vue'
import B from './tabs/BComponent.vue'
import C from './tabs/CComponent.vue'

const componentID = shallowRef(A)

const active = ref(0)
const data = reactive([
    { name: 'A', component: A },
    { name: 'B', component: B },
    { name: 'C', component: C },
])
const swichComponent = (item: any, index: number) => {
    componentID.value = item.component
    active.value = index
}
</script>
<style scoped>
.active {
    background-color: #1890ff;
    color: #fff;
}

.tabs {
    width: 100px;
    height: 50px;
    border: 1px solid #000;
    margin: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>