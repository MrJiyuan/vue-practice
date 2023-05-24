<template>
    <div>我是子组件</div>
    <div>从父组件接收的值为：{{ title }}</div>
    <div>从父组件接收的数组：{{ arr }}</div>
    <a-button @click="send()">给父组件传值</a-button>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue'

// 1.接收父组件传递的值
// 写法1：使用宏函数接收父组件传递的值
// defineProps({
//     title: {
//         type: String,
//         default: '我是默认值'
//     }
// })
// 写法2：
const props = defineProps<{
    title: string
    arr: number[]
}>()
console.log(props.title); // 父组件传递的值

// 如果写法2需要定义默认值,需要使用ts特有的函数withDefaults()
// const withDefaults: <unknown, InferDefaults<unknown>>(props: unknown, defaults: InferDefaults<unknown>) => {}
// 第一个参数接收一个props,第二个参数就是默认值,接收一个对象,如果是复杂类型的话需要用一个函数来接收,防止引用
// withDefaults(defineProps<{
//     title: string,
//     arr: number[]
// }>(), {
//     arr: () => [666]
// })

// 2.给父组件传值
const emit = defineEmits(['on-click']) // 预声明了组件所触发的事件
// ts写法
// const emit = defineEmits<{
//     (e: 'on-click', name: string): void
// }>()
const send = () => { // 触发事件
    emit('on-click', '我是子组件传递的值')
}

// 3.子组件暴露属性给父组件
// defineExpose是将子组件的属性或方法暴露给父组件,但是父组件如果要通过子组件的实例访问这些属性或方法,需要使用expose选项进行注册。
defineExpose({ age: 18 })


</script>
<style scoped></style>