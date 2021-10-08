<template>
  <div>
    <h2>自定义带Hover提示的按钮</h2>
    <!-- $attrs 能够拿到传递的属性，$listeners能拿到绑定的自定义事件
        v-bind 里面绑定 $attrs的属性， v-on 绑定自定义事件
     -->
    <HintButton type="warning" size="mini" icon="el-icon-edit" @click="test1"></HintButton>
  </div>
</template>

<script type="text/ecmascript-6">
  import HintButton from "./HintButton.vue"
  export default {
    name: 'AttrsListenersTest',
    components: {
      HintButton
    },
    methods: {
      test1() {
        console.log("sbsb");
      }
    },
  }
</script>