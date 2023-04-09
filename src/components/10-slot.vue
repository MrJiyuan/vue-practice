<template>
    <div>
        <slot></slot>
    </div>
    <div>
        <slot name="footer"></slot>
    </div>
    <a-typography-paragraph>
        <blockquote>
            作用域插槽
        </blockquote>
    </a-typography-paragraph>
    <div>
        让子组件在渲染时将一部分数据提供给插槽
    </div>
    <div v-for="(item, index) in slotData">
        <slot name="renderScope" :data="item" :index="index"></slot>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue'

type names = {
    name: string,
    age: number
}
const slotData = reactive<names[]>(
    [
        {
            name: 'Chr1s今年芳龄',
            age: 24
        },
        {
            name: 'Chr1s今年芳龄啊',
            age: 25
        },
        {
            name: 'Chr1s今年芳龄呀',
            age: 26
        }
    ]
)

</script>
<style scoped></style>