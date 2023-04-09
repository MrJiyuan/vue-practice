<template>
    <div class="tree" v-for="item in data" @click.stop="clickTap(item, $event)">
        <input type="checkbox" v-model="item.checked">
        <span>{{ item.name }}</span>
        <chr1s-tree :data="item?.children" v-if="item?.children?.length"></chr1s-tree>
    </div>
</template>
// 如果递归的时候想自定义组件的名字，可以使用`name`属性
<script setup lang='ts' name="chr1s-tree">
interface Tree {
    name: string,
    checked: boolean,
    children?: Tree[]
}
// 接收传入的数据
defineProps<{
    data?: Tree[]
}>()

const clickTap = (item: any, e: any) => {
    console.log('当前点击的是：' + item.name + '，事件是：' + e.type + '，事件目标是：' + e.target.tagName)
}

</script>
<style scoped>
.tree {
    margin-left: 20px;
}
</style>