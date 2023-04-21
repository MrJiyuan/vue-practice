<template>
    <a-typography-text code>父亲级别组件</a-typography-text>
    <div class="box">
    </div>
    <provideB></provideB>
</template>

<script setup lang='ts'>
import { ref, reactive, inject } from 'vue'
import provideB from './provideB.vue'
// 仅仅使用inject('changeColor')时，color的类型是unknown，需要引入Ref来指定类型
import type { Ref } from 'vue'

// inject的值需要与provide的值一致
const color = inject<Ref<string>>('setColor');

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