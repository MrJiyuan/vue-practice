<template>
    <div>这个直播间氛围太好了，就像在恬静的乡下和邻里一起聊家长里短，偶尔还能听到后院的猪叫</div>
    <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-item label="Activity name">
            <a-input v-model:value="formState.name" />
        </a-form-item>
        <a-form-item label="Instant delivery">
            <a-switch v-model:checked="formState.delivery" />
        </a-form-item>
        <a-form-item label="Activity type">
            <a-checkbox-group v-model:value="formState.type">
                <a-checkbox value="1" name="type">Online</a-checkbox>
                <a-checkbox value="2" name="type">Promotion</a-checkbox>
                <a-checkbox value="3" name="type">Offline</a-checkbox>
            </a-checkbox-group>
        </a-form-item>
        <a-form-item label="Resources">
            <a-radio-group v-model:value="formState.resource">
                <a-radio value="1">Sponsor</a-radio>
                <a-radio value="2">Venue</a-radio>
            </a-radio-group>
        </a-form-item>
        <a-form-item label="Activity form">
            <a-input v-model:value="formState.desc" type="textarea" />
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
            <a-button type="primary" @click="onSubmit">Create</a-button>
            <a-button style="margin-left: 10px">Cancel</a-button>
        </a-form-item>
    </a-form>
</template>

<script lang="ts">
import { defineComponent, onActivated, onDeactivated, onMounted, onUnmounted, reactive, toRaw } from 'vue';
export default defineComponent({
    setup() {
        const formState = reactive({
            name: '',
            delivery: false,
            type: [],
            resource: '',
            desc: '',
        });
        const onSubmit = () => {
            console.log('submit!', toRaw(formState));
        };
        return {
            labelCol: {
                style: {
                    width: '150px',
                },
            },
            wrapperCol: {
                span: 14,
            },
            formState,
            onSubmit,
        };
    },
});
//新的两个
onActivated(() => {
    console.log('keep-alive的初始化')
})

onDeactivated(() => {
    console.log('keep-alive的卸载')
})
//对应有关联的两个生命周期
onMounted(() => {
    console.log('初始化')  //这个会随着onActivated一起生效
})
onUnmounted(() => {
    console.log('卸载')  //如果有onDeactivated，则优先生效onDeactivated，onUnMounted则不再生效
})
</script>
<style scoped></style>