<template>
  <div>
    <h1>EventTest组件</h1>
    <!-- 只要是添加到html标签身上的都是原生的事件 -->
    <button @click="test1">点击</button>
    <!-- 只要是绑定在组件标签身上的都是自定义事件，自定义事件是需要子组件自身触发调用 -->
    <Event1 @click="test1"></Event1>
    <!-- 如果想要子组件身上的事件变成原生的需要在绑定时添加.native -->
    <Event2 @click.native="test1"></Event2>
  </div>
</template>

<script type="text/ecmascript-6">
  import Event1 from './Event1.vue'
  import Event2 from './Event2.vue'

  export default {
    name: 'EventTest',
    methods: {
      test1() {
        console.log("1111");
      }
    },
    components: {
      Event1,
      Event2,
    },

  }
</script>