<template>
    <a-typography-title :level="2">7、生命周期：</a-typography-title>
    <div ref="div">{{ str }}</div>
    <a-button @click="changeStr()">修改</a-button>
</template>

<script setup lang='ts'>
import {
    ref,
    onBeforeMount, onMounted,
    onBeforeUpdate, onUpdated,
    onBeforeUnmount, onUnmounted,
    onRenderTracked, onRenderTriggered
} from 'vue'

console.log('setup执行了');
const div = ref<HTMLDivElement>();
const str = ref('Chr1s so hot')
const changeStr = () => {
    str.value = 'Chr1s so cool'
}

// 创建之前 读不到DOM
onBeforeMount(() => {
    console.log('onBeforeMount执行了', div.value); // undefined
})
// 创建完成 可以读到DOM
onMounted(() => {
    console.log('onMounted执行了', div.value); // <div>Chr1s so cool</div>
})

// 更新之前
onBeforeUpdate(() => {
    console.log('onBeforeUpdate执行了', div.value?.innerText); // Chr1s so hot
})
// 更新完成
onUpdated(() => {
    console.log('onUpdated执行了', div.value?.innerText); // Chr1s so cool
})

// 销毁之前
onBeforeUnmount(() => {
    console.log('onBeforeUnmount执行了');
})
// 销毁完成
onUnmounted(() => {
    console.log('onUnmounted执行了');
})

// 调试 接收一个event参数
onRenderTracked((e) => {
    console.log('onRenderTracked=>', e); // {effect: ReactiveEffect, target: RefImpl, type: 'get', key: 'value'}
})
onRenderTriggered((e) => {
    console.log('onRenderTriggered=>', e);
})
</script>
<style scoped></style>