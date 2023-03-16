
<template>
    <a-typography-title :level="2">4、reactive：</a-typography-title>
    <div>
        <a-form name="basic" autocomplete="off">
            <a-form-item label="name">
                <a-input v-model="form.name" />
            </a-form-item>
            <a-form-item label="age">
                <a-input v-model="form.age" />
            </a-form-item>

            <a-form-item>
                //
                <a-button type="primary" html-type="submit" @click.pre="submit()">提交</a-button>
            </a-form-item>
        </a-form>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue'

// ref 支持所有的类型               reactive支持引用类型(Array Object Map Set)
// ref 取值 赋值 都需要加 .value    reactive不需要加 .value
const form = reactive({
    name: 'Chr1s',
    age: 23
})
const submit = () => {
    console.log(form);

}

form.age = 88
</script>
<style scoped></style>