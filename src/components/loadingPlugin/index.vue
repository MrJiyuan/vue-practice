<template>
    <div v-if="isShow" class="loading">
        Loading...
    </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
const isShow = ref<boolean>(true)
const show = () => isShow.value = true
const hide = () => isShow.value = false
// defineExpose方法是在setup函数中使用的,用于向父组件或父级上下文暴露组件实例中的状态或方法
defineExpose({
    show,
    hide,
    isShow
})

</script>
<style scoped lang="less">
.loading {
    background: black;
    opacity: 0.8;
    font-size: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    color: white;
}
</style>