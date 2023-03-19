<template>
    <a-typography-title :level="2">5、toRef，toRefs，toRaw&源码解析</a-typography-title>
    <div>{{ manUnRef }}</div>
    <a-button @click="changeUnRef()">toRef修改非响应式对象</a-button>
    <div>{{ manRef }}</div>
    <a-button @click="changeToRef()">toRef修改响应式对象</a-button>
    <a-button @click="logRefsObj()">输出解构后的toRefs对象</a-button>
</template>

<script setup lang='ts'>
import { toRef, reactive, toRefs, toRaw } from 'vue'

// toRef(obj,obj.key)只能修改响应式对象的值，对非响应式视图毫无变化
const manUnRef = { name: 'Chr1s', age: 25, like: 'Apex' }
const likeUnRef = toRef(manUnRef, 'like')
const changeUnRef = () => {
    likeUnRef.value = 'CSGO'
    console.log(manUnRef); // 值变化，视图无变化{name: 'Chr1s', age: 25, like: 'CSGO'}
}

const manRef = reactive({ name: 'Chr1s', age: 25, like: 'Apex' })
const likeToRef = toRef(manRef, 'like')
const changeToRef = () => {
    likeToRef.value = 'CSGO'
    console.log(manRef); // 值变化，视图变化 Proxy(Object) {name: 'Chr1s', age: 25, like: 'CSGO'}
}

// 手动实现一个toRefs
const toRefs = <T extends object>(object: T) => {
    const map: any = {}
    for (const key in object) { // 把对象的每个属性都转换成ref
        if (Object.prototype.hasOwnProperty.call(object, key)) {
            map[key] = toRef(object, key)
        }
    }
    return map
}
// 解构toRefs(man)
const { name, age, like } = toRefs(manRef)
const logRefsObj = () => {
    console.log(name, age, like);

}
</script>
<style scoped></style>