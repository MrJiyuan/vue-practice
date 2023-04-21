<template>
    <a-typography-title :level="2">12-异步组件骨架屏</a-typography-title>
    <div class="sync">
        <div class="sync-content">
            <div><img :src="data.url"></div>
            <div class="sync-pop">
                <div>{{ data.name }}</div>
                <div>&nbsp;{{ data.age }}</div>
            </div>
        </div>
        <hr>
        <div>{{ data.desc }}</div>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue'
import { axios } from '../server/axios'

interface Data { //定义接口
    data: {
        name: string,
        age: number,
        url: string,
        desc: string
    }
}
const { data } = await axios.get<Data>('/imgData.json') //解构

</script>
<style scoped></style>