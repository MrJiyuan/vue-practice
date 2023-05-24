<template>
    <a-typography-text code>儿子级别组件</a-typography-text>
    <a-button @click="changeColor">修改provide的值为->yellow</a-button><br>
    如果不想子组件修改provide的值,可以使用readonly来修饰provide的值<br>
    provide('setColor', readonly(setColor) );
    <div class="box">
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive, inject } from 'vue'
// 仅仅使用inject('changeColor')时,color的类型是unknown,需要引入Ref来指定类型
import type { Ref } from 'vue'
// inject的值需要与provide的值一致
const color = inject<Ref<string>>('setColor');
const changeColor = () => {
    color!.value = 'yellow'; // 使用非空断言

}
</script>
<style scoped>
.box {
    width: 50px;
    height: 50px;
    border: 1px solid #000;
    margin: 10px;
    background: v-bind(color)
}
</style>