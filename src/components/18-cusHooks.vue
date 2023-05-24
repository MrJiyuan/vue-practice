<template>
    <a-typography-title :level="2">18-自定义Hooks</a-typography-title>
    <div>
        <img src="../assets/images/lazyLoad1.jpg" width="300" height="400" id="img" alt="">
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue'
import useBase64 from '../Hooks'

useBase64({
    el: '#img'
}).then(res => {
    if (res.baseUrl) {
        console.log('base64转码成功');
    }
})

</script>
<style scoped></style>