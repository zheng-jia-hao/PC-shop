<template>
  <div>
    小明的爸爸现在有{{mn}}元

    <h2>不使用sync修改符</h2>
    <!-- 这个就是.sync 内部的做法，添加.sync修饰符后会以update:xxx为自定义函数进行传递，而子组件触发也是update:xxx 
    
        需要注意的是，update：xxx 这里的xxx最好使用数据本身，如果不是数据本身，那么触发时会失效
    -->
    <Child :mn="mn" @update:mn="mn = $event"></Child>
    <br>


    <h2>使用sync修改符</h2>
    <Child :mn.sync="mn"></Child>


    <h2>使用v-model修改符</h2>
    <Child2 v-model="mn"></Child2>
    <hr>

    <!-- 

        .sync和v-model的区别：
          .sync和v-model都能够实现父子组件数据同步，
          v-model更适用于表单元素

     -->
  </div>
</template>

<script type="text/ecmascript-6">
  import Child from './Child.vue'
  import Child2 from './Child2.vue'
  export default {
    name: 'SyncTest',
    data() {
      return {
        mn: 1000
      }
    },
    components: {
      Child,
      Child2
    }
  }
</script>