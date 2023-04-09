<template>
    <div class="card">
        <header>
            <div>我是局部组件标题</div>
            <div>副标题</div>
        </header>
        <section>
            如果要把局部组件注册为全局组件，在main.ts中注册：<br>
            import card from './components/card.vue'<br>
            const app = createApp(App)<br>
            app.component('card', card)<br>
            这样在项目的任意部分使用`card`标签就可以了
        </section>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue'

</script>
<style scoped lang="less">
@border: 1px solid #ccc; // 定义变量

.card {
    width: 300px;
    height: 300px;
    border: 1px solid #ccc;
    border-radius: 5px;
    overflow: hidden;

    header {
        width: 100%;
        height: 50px;
        background-color: #ccc;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 10px;
        box-sizing: border-box;
    }

    section {
        width: 100%;
        min-height: 250px;
        background-color: #eee;
        padding: 10px;
        box-sizing: border-box;
    }
}
</style>