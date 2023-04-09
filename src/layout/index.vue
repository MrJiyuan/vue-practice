<template>
    <div class="layout">
        <!-- 左侧菜单 -->
        <Menu></Menu>
        <div class="layout-right">
            <Header></Header>
            <Content></Content>
        </div>
    </div>
</template>

<script setup lang='ts'>
import Menu from "./Menu/index.vue";
import Header from "./Header/index.vue";
import Content from "./Content/index.vue";
</script>
<style lang="less" scoped>
// scoped的作用是防止不同组件中的同名属性样式污染
.layout {
    display: flex;
    height: 100%;
    // overflow: hidden;

    &-right {
        flex: 1;
        display: flex;
        flex-direction: column;
    }
}
</style>