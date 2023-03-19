<!--
 * @ Author: Chr1s
 * @ Create Time: 2023-03-11 22:12:53
 * @ Modified time: 2023-03-16 02:05:52
 * @ Description:
 -->

<template>
  <a-typography-title :level="2">1、模板语法&vue指令：</a-typography-title>

  <a-divider orientation="left">模板中使用map</a-divider>
  <div>
    {{ expArray.map(v => ({ num: v })) }}
  </div>

  <a-divider orientation="left">v-if & v-html</a-divider>
  <div v-html="expHTML" v-if="expBoolean"></div>
  <a-button type="primary" @click="chr1s_obj.clickEvent()">
    点击事件@click="xxx"
  </a-button>

  <a-divider orientation="left">动态事件</a-divider>
  <div @click="chr1s_obj.parent()">
    <!-- 动态事件 -->
    <a-button type="primary" @[event]="chr1s_obj.clickEvent()">
      动态事件@[event]="xxx"
    </a-button>
  </div>

  <a-divider orientation="left">阻止冒泡事件</a-divider>
  <!-- 阻止冒泡事件 -->
  <div @click="chr1s_obj.parent()">
    <!-- 动态事件 -->
    <a-button type="primary" @[event].stop="chr1s_obj.clickEvent()">
      阻止冒泡事件@[event].stop="chr1s_obj.clickEvent()"
    </a-button>
  </div>

  <a-divider orientation="left">v-bind</a-divider>
  <!-- v-bind -->
  <div :id="bindId" :class="['bindStyle1', 'bindStyle2']">我是bind绑定的元素</div>
  <div :class="[expBoolean ? 'bindStyle1' : 'bindStyle2']">我是bind绑定的元素</div>

  <a-divider orientation="left">v-for</a-divider>
  <!-- v-for -->
  <a-tag color="#2db7f5" v-for="i in expStringArray">{{ i }}</a-tag><br><br>
  <a-tag color="#2db7f5" v-for="(i, j) in expStringArray">{{ j }}-{{ i }}</a-tag>
  <a-typography-paragraph>v-memo:只有里面的条件不成立时才会发生改变，如果条件成立的话它会跳过这个更新，可以节省一定程度的性能↓</a-typography-paragraph>
  <a-tag color="#2db7f5" v-for="i in expStringArray" v-memo="[i == '抽']">{{ i }}</a-tag><br><br>
</template>

<script setup lang="ts">
const expArray: number[] = [1, 2, 3, 4, 5, 6, 7]
const expStringArray: string[] = ['我', '抽', '悦', '刻', '五', '芜', '湖']
// v-html不支持组件，只支持原生html标签
const expHTML: string = '<section style="color:blue">v-if的性能低于v-show,因为v-if是切换真假DOM，v-show是使用css隐藏</section>'
const expBoolean: boolean = true
// 动态事件
const event = 'click'
let chr1s_obj = {
  text_dom: '妈妈生的',
  clickEvent() {
    console.log(this.text_dom);
  },
  // 正常的js需要在clickEvent传入event，通过stopPropagation()阻止默认的冒泡
  // VUE3中要阻止冒泡的话，使用@[event].stop="chr1s_obj.clickEvent()"即可
  parent() {
    console.log('冒泡触发父级事件');
  }
}

const bindId: string = 'bind-Id'

</script>
<style>
.bindStyle1 {
  color: aquamarine;
}

.bindStyle2 {
  font-weight: 14px;
  border: 1px solid rgb(43, 204, 43);
  margin: 10px 0 10px 0;
}
</style>