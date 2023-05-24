<template>
    <a-typography-title :level="2">17-图片懒加载</a-typography-title>
    <div>
        <img width="360" height="500" v-lazy="item" v-for="item in imageListArr" :src="item" alt="">
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue'
import type { Directive } from 'vue';
// glob     实现懒加载(异步)
// globEager是静态加载(同步),但是globEager会在编辑器中被划掉,所以可以使用
// import.meta.glob('./assets/images/*.*',{ eager: true })
let imageList: Record<string, { default: string }> = import.meta.glob('../assets/images/*.*', { eager: true })
let imageListArr = Object.values(imageList).map((v: { default: any; }) => v.default)

let vLazy: Directive<HTMLImageElement, string> = async (el, binding) => {
    const defImage = await import('../assets/logo.svg')
    el.src = defImage.default
    // 使用新增的js API来确定图片已经进入用户的可视区域
    const observer = new IntersectionObserver((entries) => {
        // 1.root：指定监测目标元素的祖先元素,通常为视窗,可以为空。
        // 2.rootMargin：表示监测目标元素相对于根元素的外边距。可以是长度,也可以是百分比,格式为 top right bottom left。例如："10px 20px 30px 40px",表示目标元素向根元素的四个方向分别增加了 10px、20px、30px 和 40px 的外边距。
        // 3.threshold：表示根元素与目标元素交叠的面积占目标元素面积的比例,取值范围为0到1之间的任何数字,可以是单个数字或数字的数组。例如,值为0.5时表示目标元素至少有 50% 的面积位于根元素内部时触发回调函数。
        // 4.isIntersecting：表示目标元素当前是否与根元素交叠。当它的值变为 true 时,即表示目标元素进入了根元素的范围内。
        // 5.intersectionRatio：表示目标元素与根元素交叠的面积占目标元素总面积的比例。
        // 6.boundingClientRect：表示目标元素的位置和大小信息,是一个 DOMRect 对象。
        // 7.intersectionRect：表示目标元素与根元素交叠部分的位置和大小信息,是一个 DOMRect 对象。
        // 8.rootBounds：表示根元素的位置和大小信息,是一个 DOMRect 对象。
        if (entries[0].intersectionRatio > 0) {
            setTimeout(() => {
                el.src = binding.value
            },2000)
            observer.unobserve(el)
        }
    })
    // observer有一个内置方法observe,用来观察目标元素是否进入可视区域
    observer.observe(el)
}

</script>
<style scoped></style>