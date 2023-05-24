<template>
    <a-typography-title :level="2">6、computed&watch：</a-typography-title>
    <div>
        <input v-model="firstName">
        <input v-model="lastName">
    </div>
    <div>
        我是ref：{{ firstName }}--{{ lastName }}
    </div>
    <div>
        {{ name }}
    </div>
    <div>
        {{ showName }}
    </div>

    <a-divider orientation="left">watch</a-divider>
    <div>
        case1: <input v-model="message" type="text" />
        <hr>
        case2: <input v-model="messageAnother" type="text" />
    </div>
    <a-divider orientation="left">watch监听对象</a-divider>
    <div>
        refObj: <input v-model="messageObj.foo.bar.name" type="text" />
    </div>
    <div>
        reactiveObj: <input v-model="reactiveObj.foo.bar.name" type="text" />
    </div>


    <a-divider orientation="left">watchEffect高级监听</a-divider>
    <div>
        effectVariate1: <input v-model="effectVariate_1" type="text" />
    </div>
    <div>
        effectVariate2: <input v-model="effectVariate_2" type="text" />
    </div>
    <a-button @click="stopWatch()">停止oninWatchEffect</a-button>
</template>

<script setup lang='ts'>
import { ref, computed, reactive, watch, watchEffect } from 'vue'

let firstName = ref('Chester')
let lastName = ref('Bennington')

const name = computed(() => {
    return '我是computed计算的结果：' + firstName.value + '--' + lastName.value
})
const showName = computed({
    get: () => {
        return '我是computed计算的结果：' + firstName.value + '--' + lastName.value
    },
    set: (val) => {
        let arr = val.split('--')
        firstName.value = arr[0]
        lastName.value = arr[1]
    }
})
// *********************************************************
let message = ref<string>('我是第一个数据源')
let messageAnother = ref<string>('我是第二个数据源')
// 用于监听响应式对象的变化,每次发生改变都会触发回调,得到新值和旧值
watch([message, messageAnother], (newVal, oldVal) => {
    console.log('newVal', newVal);
    console.log('oldVal', oldVal);
})
// 1、监听ref对象(深度监听)
let messageObj = ref({
    foo: {
        bar: {
            name: 'Chr1s_refObj'
        }
    }
})
watch(messageObj, (newVal, oldVal) => {
    console.log('newVal', newVal);
    console.log('oldVal', oldVal);
}, {
    deep: true // 如果是这种引用类型,需要添加配置项,深度监听
})
// 存在一个问题：深度监听时,前值和后值都是一样的

// 2、监听reactive对象
let reactiveObj = reactive({
    foo: {
        bar: {
            name: 'Chr1s_reactiveObj',
            age: 18
        }
    }
})
// reactive在源码中已经隐性实现了深度监听
watch(reactiveObj, (newVal, oldVal) => {
    console.log('newVal', newVal);
    console.log('oldVal', oldVal);
})
// 当要监听单一属性时,需要把它变为一个函数
watch(() => reactiveObj.foo.bar.name, (newVal, oldVal) => {
    console.log('newVal', newVal);
    console.log('oldVal', oldVal);
}, {
    //immediate: true, // 立即执行一次回调
    //flush: 'post' // 默认是pre,即在更新视图之前执行回调,post是在更新视图之后执行回调,sync是同步执行回调,用于控制watch在组件各个生命周期的行为
})

// 3、使用watchEffect监听message
let effectVariate_1 = ref('我是被watchEffect监听的变量1');
let effectVariate_2 = ref('我是被watchEffect监听的变量2');
// 直接监听变量
watchEffect(() => {
    console.log('watchEffect：' + effectVariate_1.value);
    console.log('watchEffect：' + effectVariate_2.value);
})
// watchEffec接收一个回调函数oninValidate,用于在监听前做一些操作
let oninWatchEffect = watchEffect((oninValidate) => {
    oninValidate(() => {
        console.log('我是触发监听前可以进行操作的函数');
    })
    console.log('oninWatchEffect：' + effectVariate_1.value);
    console.log('oninWatchEffect：' + effectVariate_2.value);
}, {
    // 1. immediate：Boolean 类型,表示该函数是否在初始渲染时立即运行一次,默认值为 true。
    // 2. deep：Boolean 类型,表示是否深度观察监控模型的变化,默认为 true。
    // 3. flush：枚举类型,表示更新侦听器时使用的策略。默认值为 "pre"。支持的选项包括："pre","post","sync"。
    // 1). "pre"：表示：
    //     - 对于组件更改,在 DOM 更新之前立即执行侦听器。这是默认选项。
    //     - 对于副作用更改,先立即执行侦听器,然后等待下一轮事件循环周期再执行 DOM 更新。
    // 2). "post"：表示：
    //     - 对于组件更改,在 DOM 更新之后立即执行侦听器。
    //     - 对于副作用更改,先等待 DOM 更新完成,然后立即执行侦听器。
    // 3). "sync"：表示立即执行侦听器,并立即执行 DOM 更新。
    // 通过 flush 配置项,我们可以灵活地控制何时更新侦听器,从而实现更细粒度的控制。比如,如果我们希望在组件更改后立即执行侦听器,可以将 flush 配置为 "post"；如果我们希望立即执行侦听器并立即更新 DOM,可以将 flush 配置为 "sync"。
    // 需要注意的是,如果 flush 配置为 "sync",则无法保证依赖项在执行侦听器时已更新。因此,它应该仅用于严格同步的场景中,如与自定义渲染函数一起使用。
    // 4. onTrack：Function 类型,表示 function (event) {},侦听器是否应在侦听器激活时运行。在此函数内部,可以获取当前观察目标的 getter 函数的计算结果以及不同工具的使用情况等信息。
    //    onTrack(e) {debugger}
    // 5. onError：Function 类型,表示 function (error, target) {},观察者更新时出现任何错误时调用的函数。
    // 6. onTrigger 是 Vue 3 中 watchEffect 使用的钩子函数,用于在观察副作用时捕获生命周期钩子事件。它可以指定一个函数,当观察的数据发生变化时立即执行。该函数接收一个参数：侦听器,您可以使用它来检查侦听器中观察的值。
    //    onTrigger(e) {debugger}
    // onTrigger 可以取以下两个参数之一：
    //  1). undefined：表示不捕获事件。
    //  2). Function 类型：表示希望触发的函数。
    // 需要注意的是,在生产环境下,onTrigger 钩子不会运行。只有在开发环境中才会运行。
})

let stopWatch = () => oninWatchEffect()

</script>
<style scoped></style>