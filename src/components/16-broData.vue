<template>
    <a-typography-title :level="2">16-兄弟组件数据传递</a-typography-title>

    <div>
        <broComponentA @on-click="getFlag"></broComponentA>
        <broComponentB :flag="flag"></broComponentB>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue'
import broComponentA from './tabs/broComponentA.vue'
import broComponentB from './tabs/broComponentB.vue'

// 从A组件接收数据
let flag = ref(false)
const getFlag = (params: boolean) => {
    flag.value = params
}

// 传递数据到B组件

</script>
<style scoped></style>