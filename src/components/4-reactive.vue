
<template>
    <a-typography-title :level="2">4、reactive：</a-typography-title>
    <a-divider orientation="left">reactive</a-divider>
    <div>
        <a-form name="basic" autocomplete="off">
            <a-form-item label="name">
                <input v-model="form.name" />
            </a-form-item>
            <a-form-item label="age">
                <input v-model="form.age" />
            </a-form-item>

            <a-form-item>
                // 需要使用@click.prevent阻止一次默认的提交
                <a-button type="primary" html-type="submit" @click.prevent="submit()">提交</a-button>
            </a-form-item>
        </a-form>
    </div>
    <a-divider orientation="left">reactive List</a-divider>
    <div>
        <ul>
            <li v-for="item in listFor">{{ item }}</li>
        </ul>
        <a-button type="primary" html-type="submit" @click.prevent="add()">添加元素</a-button>
    </div>

    <a-divider orientation="left">readonly</a-divider>
    <a-button type="primary" html-type="submit" @click.prevent="showRead()">查看readOnly</a-button>

    <a-divider orientation="left">shallowReactive</a-divider>
    <div>{{ form_shallow }}</div>
    <a-button type="primary" html-type="submit" @click.prevent="editDeep()">修改shallowReactive第三层的值</a-button>

    <a-button type="primary" html-type="submit" @click.prevent="editShallow()">修改shallowReactive第一层的值</a-button>
</template>

<script setup lang='ts'>
import { ref, reactive, readonly, shallowReactive } from 'vue'

// ref 支持所有的类型               reactive支持引用类型(Array Object Map Set)
// ref 取值 赋值 都需要加 .value    reactive不需要加 .value
let form = reactive({
    name: 'Chr1s',
    age: 23
})
const submit = () => { console.log(form); }

let listFor = reactive<string[]>([])
let listFor2 = reactive<{ arr: string[] }>({ arr: [] })
const add = () => {
    setTimeout(() => {           // 模拟异步接口请求
        let res: string[] = ['CSGO', 'Apex', 'OW'];
        // listFor = res         // reactive是proxy代理的一个对象，不可以直接赋值，否则会破坏proxy的结构
        // console.log(listFor); // 可以打印出值，但是页面无数据
        // *解决方案1:数组使用push与解构
        listFor.push(...res)
        console.log(listFor);
        // *解决方案2:把数组作为一个属性
        // listFor2.arr=res
    }, 2000);
}

const read = readonly(form)
const showRead = () => {
    console.log(form, read); // Proxy(Object) {name: 'Chr1s', age: 23} *2
    form.name = 'chr1stine'
    console.log(form, read); // Proxy(Object) {name: 'chr1stine', age: 23} *2
    // ↑说明readonly虽然不可直接修改，但修改原始对象会影响到readonly
}

let form_shallow: any = shallowReactive({
    foo: {
        bar: {
            num: 1
        }
    }
})


const editDeep = () => {
    form_shallow.foo.bar.num = 69
    console.log('已修改第三层num为69');
}

const editShallow = () => {
    // shallowReactive与ref有共同问题，在此处使用reactive也会导致shallowReactive被修改
    form_shallow.foo = {
        name: '我是第一层的元素'
    }
    console.log('已修改第一层元素');
}

</script>
<style scoped></style>
