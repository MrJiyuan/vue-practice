<!--
 * @ Author: Chr1s
 * @ Create Time: 2023-03-11 22:12:53
 * @ Modified time: 2023-05-23 22:16:48
 * @ Description:
 -->

<template>
  <a-typography-title :level="2">1、模板语法&vue指令：</a-typography-title>

  <a-divider orientation="left">模板中使用map</a-divider>

  <a-typography-text code>
    {{ expArray.map(v => ({ num: v })) }}
  </a-typography-text>

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
  <a-tag color="#2db7f5" v-for="i in expStringArray">{{ i }}</a-tag>
  <br>
  <br>
  <a-tag color="#2db7f5" v-for="(i, j) in expStringArray">{{ j }}-{{ i }}</a-tag>
  <br>
  <a-typography-text mark>
    v-memo:只有里面的条件不成立时才会发生改变,如果条件成立的话它会跳过这个更新,可以节省一定程度的性能↓
  </a-typography-text>
  <br>
  <a-tag color="#2db7f5" v-for="i in expStringArray" v-memo="[i == '抽']">{{ i }}
  </a-tag>
  <br>
  <br>

  <a-divider orientation="left">自定义指令</a-divider>
  <a-button @click="flag = !flag">激活指令</a-button>
  <div class="cusDir" v-move="{ backgroundColor: 'red' }" v-if="flag">
  </div>

  <a-divider orientation="left">指令-鉴权</a-divider>
  <!-- 如果匹配到的话就提供按钮权限,匹配不到就进行隐藏 -->
  <a-button v-has-show="'shop:create'">创建</a-button>
  <a-button v-has-show="'shop:edit'">编辑</a-button>
  <a-button v-has-show="'shop:delete'">删除</a-button>

  <a-divider orientation="left">指令-拖拽</a-divider>
  <div class="moveBox" v-drag>
    <div class="header">

    </div>
    <div>内容</div>
  </div>
</template>

<script setup lang="ts">
// ***************自定义指令开始****************
import { ref } from 'vue'
import type { Directive, DirectiveBinding } from 'vue'

let flag = ref<boolean>(false)
type Binding = {
  backgroundColor: string
}
// 自定义组件的命名必须以v开头
const vMove: Directive = {
  created() {
    console.log('v-move指令已创建');

  },
  mounted(el: HTMLElement, Binding: DirectiveBinding) {
    console.log('v-move指令已挂载');
    el.style.backgroundColor = Binding.value.backgroundColor
  },
  unmounted() {
    console.log('v-move指令已卸载');
  }
}
// ***************自定义指令结束****************

// ***************自定义指令-鉴权开始**************** 
localStorage.setItem('userID', 'linlin')
// 因为有可能取不到,就断言成string
const userID = localStorage.getItem('userID') as string
// 冒充后台返回的数据
const permission = [
  // 一个商品页,叫shop,后面跟上他的权限,如edit
  'linlin:shop:edit',
  'linlin:shop:create',
  'linlin:shop:delete'
]
// 这个例子中Directive接收两个泛型,一个是元素类型,一个是指令的值类型
const vHasShow: Directive<HTMLElement, string> = (el, binding) => {
  if (!permission.includes(userID + ':' + binding.value)) {
    //   el.style.display = 'inline-block'
    // } else {
    el.style.display = 'none'
  }
}
// ***************自定义指令-鉴权结束****************

// ***************自定义拖拽指令开始****************
const vDrag: Directive<any, void> = (el: HTMLElement, binding: DirectiveBinding) => {
  // 获取被拖拽的元素
  let dragElement = el.firstElementChild as HTMLDivElement
  // 事件触发后触发的回调函数
  const mouseDown = (e: MouseEvent) => {
    // 为防止点击后鼠标错位,需要获取鼠标的原始位置
    let X = e.clientX - el.offsetLeft
    let Y = e.clientY - el.offsetTop
    const move = (e: MouseEvent) => {
      el.style.left = e.clientX - X + 'px'
      el.style.top = e.clientY - Y + 'px'
    }
    document.addEventListener('mousemove', move)
    document.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', move)
    })
  }
  dragElement.addEventListener('mousedown', mouseDown)
}
// ***************自定义拖拽指令结束****************

const expArray: number[] = [1, 2, 3, 4, 5, 6, 7]
const expStringArray: string[] = ['我', '抽', '悦', '刻', '五', '芜', '湖']
// v-html不支持组件,只支持原生html标签
const expHTML: string = '<section style="color:blue">v-if的性能低于v-show,因为v-if是切换真假DOM,v-show是使用css隐藏</section>'
const expBoolean: boolean = true
// 动态事件
const event = 'click'
let chr1s_obj = {
  text_dom: '妈妈生的',
  clickEvent() {
    console.log(this.text_dom);
  },
  // 正常的js需要在clickEvent传入event,通过stopPropagation()阻止默认的冒泡
  // VUE3中要阻止冒泡的话,使用@[event].stop="chr1s_obj.clickEvent()"即可
  parent() {
    console.log('冒泡触发父级事件');
  }
}

const bindId: string = 'bind-Id'

</script>
<style lang="less">
.bindStyle1 {
  color: aquamarine;
}

.bindStyle2 {
  font-weight: 14px;
  border: 1px solid rgb(43, 204, 43);
  margin: 10px 0 10px 0;
}

.cusDir {
  width: 100px;
  height: 100px;
}

.moveBox {
  position: fixed;
  left: 10%;
  top: 30%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 200px;
  border: 3px solid #000;

  .header {
    width: 100%;
    height: 30px;
    background-color: #000;
  }
}
</style>