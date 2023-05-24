<template>
    <a-typography-title :level="2">19-全局变量以及全局函数</a-typography-title>
    <div>直接调用main.ts中的全局变量会导致报错,所以需要在其中书写声明文件</div>
    <div>
        {{ $env }}
    </div>
    <div>
        {{ $filter.format('的飞机') }}
    </div>
</template>

<script setup lang='ts'>
// getCurrentInstance()  获取当前组件实例
import { getCurrentInstance } from 'vue'

const Instance = getCurrentInstance();
console.log(Instance?.proxy?.$env);
// 调用全局组件
Instance?.proxy?.$loading.show()
setTimeout(() => {
    Instance?.proxy?.$loading.hide()
}, 5000)

</script>
<style scoped></style>