<template>
    <a-typography-title :level="2">15-provide依赖注入</a-typography-title>
    <a-typography-text code>爷爷级别组件</a-typography-text>
    <a-radio-group v-model:value="setColor">
        <a-radio-button value="red">红色</a-radio-button>
        <a-radio-button value="pink">粉色</a-radio-button>
        <a-radio-button value="yellow">黄色</a-radio-button>
    </a-radio-group>
    <div class="box">
    </div>
    <provideA></provideA>
</template>

<script setup lang='ts'>
import { ref, reactive, provide } from 'vue'
import provideA from './providers/provideA.vue'

const setColor = ref<string>('red');
provide('setColor', setColor);
</script>
<style scoped>
.box {
    width: 50px;
    height: 50px;
    border: 1px solid #000;
    margin: 10px;
    background: v-bind(setColor)
}
</style>