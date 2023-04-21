<template>
    <a-typography-title :level="2">14-keep alive</a-typography-title>
    <a-switch v-model:checked="flag" checked-children="A" un-checked-children="B" />切换组件

    <keep-alive>
        <A v-if="flag"></A>
        <B v-else></B>
    </keep-alive>
    <a-typography-paragraph>
        <blockquote>
            如果是keep-alive :include="['A']"的话，只有A组件会被缓存，B组件不会被缓存
        </blockquote>
        <blockquote>
            如果是keep-alive :exclude="['A']"的话，就是不缓存A组件
        </blockquote>
        <blockquote>
            如果是keep-alive :max="10"的话，也就是最多缓存10个组件，可我们keep-alive内部即将缓存的有11个组件，他有内置LRU算法会优先替换掉我们不常用的那一个
        </blockquote>
        开启keep-alive的时候才会出现的两个生命周期<br>
        //新的两个<br>
        onActivated(()=>{<br>
        console.log('keep-alive的初始化')<br>
        })<br>
        onDeactivated(()=>{<br>
        console.log('keep-alive的卸载')<br>
        })<br>
        //对应有关联的两个生命周期<br>
        onMounted(()=>{<br>
        console.log('初始化')//这个会随着onActivated一起生效<br>
        })<br>
        onUnMounted(()=>{<br>
        console.log('卸载')//如果有onDeactivated，则优先生效onDeactivated，onUnMounted则不再生效<br>
        })<br>
        //所以有一些卸载操作我们可以写在keep-alive独有的生命卸载周期里面<br>
        //一些一次性操作则写到onMounted里面，比如一些接口请求一次就行了。onMounted只会在刚开始的时候挂载一次，你组件之前的切换就不会在重新初始化了，但是这个keep-alive的onActivated初始化则会在组件切换的时候不断触发<br>
    </a-typography-paragraph>
</template>

<script setup lang='ts'>
import { ref, reactive, computed } from 'vue'
import A from './tabs/AComponent.vue'
import B from './tabs/BComponent.vue'

let flag = ref<boolean>(false);

</script>
<style scoped></style>