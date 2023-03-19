<template>
  <div class="box">
    <direct />
    <twoWayBinding />
    <refTemplate />
    <reactiveTemplate />
    <toTemplate />
  </div>
</template>

<script lang="ts">

import direct from './components/1-direct.vue'
import twoWayBinding from './components/2-twoWayBinding.vue';
import refTemplate from './components/3-ref.vue';
import reactiveTemplate from './components/4-reactive.vue';
import toTemplate from "./components/5-to.vue";
export default {
  name: 'App',
  components: {
    direct,
    twoWayBinding,
    refTemplate,
    reactiveTemplate,
    toTemplate
  }
}

</script>
<style>
.box {
  width: 500px;
  margin: 0 auto;
  padding: 15px;
  background: #f0f2f5;
}
</style>
