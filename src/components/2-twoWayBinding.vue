<!--
 * @ Author: Chr1s
 * @ Create Time: 2023-03-12 22:11:56
 * @ Modified time: 2023-03-16 02:05:46
 * @ Description:
 -->

<template>
    <a-typography-title :level="2">2、双向绑定：</a-typography-title>
    <div>
        <input type="text" v-model="textBind" />
        <div>{{ textBind }}</div>
        只渲染一次：
        <div v-once>{{ textBind }}</div>
    </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
const textBind = ref('Chr1s so hot') // 使用ref使变量变为响应式
</script>