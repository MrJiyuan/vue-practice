<template>
    <div class="B">
        <h1>B组件</h1>
        {{ flag }}
    </div>
</template>

<script setup lang='ts'>
import type { Handler } from 'mitt';
import { getCurrentInstance } from 'vue' // 第二种方法

// *** 方式一 ***
type Props = {
    flag: boolean
}
defineProps<Props>()
// ***  ↑  ***

// *** 方式二 ***
const instance = getCurrentInstance();
const BusEvent: Handler<unknown> = (event: unknown) => {
    console.log(event, '========>B组件');
}
// 1. 使用on开始接收事件
// instance?.proxy?.$Bus.on('on-bus', BusEvent)

// 2. *代表监听所有的事件
instance?.proxy?.$Bus.on('*', BusEvent)

// 3. off取消监听
// instance?.proxy?.$Bus.off('on-bus', BusEvent)

// 4. all.clear()取消所有事件的监听
// instance?.proxy?.$Bus.all.clear()

// ***  ↑  ***
</script>
<style scoped>
.B {
    width: 200px;
    height: 200px;
    background-color: #f0f0f0;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>