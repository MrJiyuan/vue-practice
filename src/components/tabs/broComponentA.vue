<template>
    <div>
        第一种方法：以桥梁的方式实现兄弟组件数据传递(非常麻烦) <br>
        <a-button @click="emitToB()">A组件派发事件</a-button>
    </div>
    <div>
        第二种方法：<br>
        <a-button @click="emitByBus()">A组件使用emit派发事件</a-button>
    </div>
</template>

<script setup lang='ts'>
import { getCurrentInstance } from 'vue' // 第二种方法

// *** 方式一 ***
let flag = false
const emitToB = () => {
    const emit = defineEmits(['on-click'])
    flag = !flag
    emit('on-click', flag)
}
// ***  ↑  ***

// *** 方式二 ***
const instance = getCurrentInstance();
const emitByBus = () => {
    instance?.proxy?.$Bus.emit('on-bus', 'mitt')
}
// ***  ↑  ***

</script>
<style scoped></style>