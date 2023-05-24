<!--
 * @ Author: Chr1s
 * @ Create Time: 2023-03-15 13:19:15
 * @ Modified time: 2023-05-23 22:18:12
 * @ Description:
-->

<template>
    <a-typography-title :level="2">3、ref：</a-typography-title>
    <div>{{ _name }}</div>
    <a-button type="primary" @click="change()">非响应式修改</a-button>

    <a-divider orientation="left">ref</a-divider>
    <div>{{ _nameRef }}</div>
    <a-space>
        <a-button type="primary" @click="changeRef()">响应式修改</a-button>
    </a-space>


    <a-divider orientation="left">shallowRef</a-divider>
    <div>{{ _nameShallowRef }}</div>
    <a-space>
        <a-button type="primary" @click="changeShallowRef('Shallow')">shallowRef修改深层</a-button>
        <a-button type="dashed" @click="changeShallowRef('Shallow')">shallowRef修改第一层</a-button>
    </a-space>
    <a-typography-paragraph>
        <blockquote>
            为什么要使用shallowRef? <br>
            ref和reactive都属于递归监听,使所有属性都具备响应性,如果数据量大,非常消耗性能,非递归监听只会监听数据的第一层
        </blockquote>
    </a-typography-paragraph>
    <a-divider orientation="left">ref和shallowRef在同一函数中使用</a-divider>
    <div>{{ _nameRef }}</div>
    <div>{{ _nameShallowRef }}</div>
    <a-button type="dashed" @click="changeRefThenShallow()">同一函数中修改.value.name</a-button>

    <a-divider orientation="left">triggerRef</a-divider>
    <div>{{ _nameShallowRef }}</div>
    <a-button type="primary" @click="changeTriggerRef()">triggerRef更新ShallowRef</a-button>

    <a-divider orientation="left">customRef</a-divider>
    <div>{{ customObj }}</div>
    <a-space>
        <a-button type="primary" @click="changeCustomRef()">changeCustomRef</a-button>
        <a-button type="primary" @click="changeDebounceCustomRef()">debounceCustomRef防抖版</a-button>
    </a-space>

    <a-divider orientation="left">Ref获取dom元素</a-divider>
    <div ref="domRef">我是dom中的元素</div>
    <a-button type="primary" @click="getDomRef()">获取dom元素</a-button>
</template>

<script setup lang='ts'>
// ref使变量变为响应式
// isRef判断一个东西是不是一个ref对象
// shallowRef进行浅层次的ref
import { ref, isRef, shallowRef, triggerRef, customRef } from 'vue';
import type { Ref } from 'vue';                             // *推荐类型比较复杂的时候使用这种方式推导类型

const _name = { name: '我是普通对象' }
const change = () => {
    _name.name = 'Chr1stine';
    console.log(_name);
}

type C = { name: string }
const _nameRef = ref<C>({ name: '我是Ref' })
const _nameIsRef = isRef(_nameRef)
const _nameRefDeduction: Ref<C> = ref({ name: 'Chr1sRef' }) // *推荐类型比较复杂的时候使用这种方式推导类型
const changeRef = () => {
    _nameRef.value.name = 'Chr1stineRef'                    // 因为ref返回的是一个对象,所以必须加.value取值
    console.log('ref:' + _nameRef.value.name);
    console.log('_nameRef isRef?：' + isRef(_nameRef));
}

const _nameShallowRef = shallowRef({ name: '我是shallowRef' })
const changeShallowRef = (which: string) => {
    which == 'Shallow' ?
        _nameShallowRef.value.name = '我是未更新的视图'       // shallowRef修改深层属性时,并不会更新视图
        : _nameShallowRef.value = { name: '我是更新后的视图' }; // 想要更新视图,必须给value赋值,直接替换整个对象
}

// ref和shallowRef不可以一起写,否则会影响shallowRef造成视图的更新,原因是ref在源码中会调用triggerRef强制更新视图
const changeRefThenShallow = () => {
    _nameRef.value.name = '我是ref';
    _nameShallowRef.value.name = '我是Shallow被影响了';
}

const changeTriggerRef = () => {
    _nameShallowRef.value.name = '我是被Trigger影响的RefShallow';
    triggerRef(_nameShallowRef)
}

function useCustomRef<T>(value: T) {
    // customRef是一个回调函数
    return customRef((track, trigger) => {
        return {
            get() {       // 收集依赖
                track()
                return value
            },
            set(newVal) { // 触发依赖
                console.log('我没有防抖');
                value = newVal
                trigger()
            }
        }
    })
}
const customObj = useCustomRef<string>('我是自定义Ref')
const changeCustomRef = () => {
    customObj.value = '我是被修改后的CustomRef'
}

// 防抖版CustomRef
function debounceCustomRef<T>(value: T, delay: number = 200) {
    let timer: number | undefined;
    return customRef((track, trigger) => {
        return {
            get() {
                track();        // 收集依赖
                return value;
            },
            set(newValue) {
                clearTimeout(timer);
                timer = setTimeout(() => {
                    console.log('爷的接口有防抖哈哈哈哈');
                    value = newValue;
                    trigger();  // 触发依赖
                }, delay);
            },
        };
    });
}
const customDebounceObj = debounceCustomRef<string>('我是自定义防抖Ref', 800)
const changeDebounceCustomRef = () => {
    customDebounceObj.value = '我是被修改后的防抖CustomRef'
    console.log(customDebounceObj);

}

const domRef = ref<HTMLDivElement>() // 此处需要类型断言成HTMLDiv元素,否则value后获取不到相应的属性
const getDomRef = () => {
    console.log(domRef.value?.innerHTML);

}

</script>
<style scoped></style>
