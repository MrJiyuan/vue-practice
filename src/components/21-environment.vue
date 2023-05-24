<template>
    <a-typography-title :level="2">21-环境变量</a-typography-title>
    <a-typography-text type="success">显示当前环境 </a-typography-text>
    <div>
        {{ _envTitle }}
    </div>
    <a-typography-paragraph>
        <blockquote>
            1. BASE_URL: 这是应用程序的基本URL路径.在开发环境下,默认值为 "/",在生产环境下,它应该设置为应用程序在服务器上的根路径.更多选项包括：<br>
                1) publicPath: 设置应用程序的公共路径,用于在构建时处理静态资源.默认值为 "/".<br>
                2) MODE: 这个环境变量指示应用程序当前的模式,可以是开发模式或生产模式.默认值为"development".
                更多选项包括: production: 生产模式,会进行代码压缩和优化.<br>
                3) test: 测试模式,用于运行测试.<br>
            2. DEV : 一个布尔值,表示应用程序当前是否处于开发模式. 默认值为true.<br>
            3. PROD: 一个布尔值,表示应用程序当前是否处于生产模式. 默认值为false.<br>
            4. SSR : 一个布尔值,表示应用程序是否支持服务器端渲染. 默认值为false.更多选项包括: <br>
                1) client: 客户端渲染模式,不进行服务器端渲染.          <br>
                2) server: 服务器端渲染模式,用于在服务器上渲染应用程序. <br> 
        </blockquote>
    </a-typography-paragraph>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue'

const _envTitle = ref(import.meta.env)

</script>
<style scoped></style>