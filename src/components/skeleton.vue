<template>
    <a-space>
        <a-skeleton-button :active="active" :size="size" :shape="buttonShape" :block="block" />
        <a-skeleton-avatar :active="active" :size="size" :shape="avatarShape" />
        <a-skeleton-input style="width: 200px" :active="active" :size="size" />
    </a-space>
    <br />
    <br />
    <a-skeleton-button :active="active" :size="size" :shape="buttonShape" :block="block" />
    <br />
    <br />
    <a-skeleton-image />
    <a-divider />
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue'
const active = ref(false)
const block = ref(false)
const size = ref('default')
const buttonShape = ref('default')
const avatarShape = ref('circle')
</script>
<style scoped></style>