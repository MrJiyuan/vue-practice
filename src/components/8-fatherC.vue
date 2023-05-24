<template>
    <a-typography-title :level="2">8-父子组件数据传递</a-typography-title>
    <div>
        // @on-click为在子组件中定义的事件,getName为父组件中定义的方法
        <chrildC @on-click="getName" :title="name" :arr="[1, 2, 3]" ref="chrildCValue">
        </chrildC>
    </div>
    <div>
        <a-button @click="getVar()">获取从子组件暴露的属性</a-button>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive, onUpdated } from 'vue'
import chrildC from './chrildC.vue'

// 1.将变量name传递给子组件
let name = '父组件的值Chr1stine' // 通过:title="name"传递变量

// 2.接收子组件传递的值
const getName = (name: string) => {
    console.log('我是父组件从子组件接收的值：', name);
}

// 3.访问子组件实例中暴露出的属性属性
// ref的泛型是InstanceType,InstanceType的泛型通过typeof去读取chrildC里面的类型
const chrildCValue = ref<InstanceType<typeof chrildC>>() // 将子组件实例化
const getVar = () => console.log(chrildCValue.value?.age);

//  
</script>
<style scoped></style>