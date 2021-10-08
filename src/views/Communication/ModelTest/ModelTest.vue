<template>
  <div>
    <h2>深入v-model</h2>
    <!-- v-model 内部就是这样写的 -->
    <input type="text" :value="msg" @input="msg = $event.target.value">
    <span>{{msg}}操你妈的</span>
    <br>
    <!-- v-model 正常的用法 -->
    <input type="text" v-model="msg">
    <span>{{msg}}操你妈的</span>
    <br>
    <!-- 将msg传递到子组件中，再把自定义事件传递到子组件中，子组件中props绑定msg,
        注意： 子组件是emit这个input事件，并且父组件中的形参必须是$event，

          子组件的props必须接收的是value !!!

        这样的写法就像是上面的原始的v-model
      -->
    <CustomInput :value="msg" @input="msg = $event"></CustomInput>
    <br>
    <!-- 
        v-model作用在子组件标签的目的是为了使父子组件数据同步,
      
      步骤：
              1.父组件的v-model是通过绑定value并且添加input事件完成的，
                在子组件身上传递value和input事件就跟在子组件直接写v-model一样的效果
              
              2. 子组件中还是需要声明接收，这个msg，并且要通过emit触发input事件，
              再将$event.target.value当中实参传递给父组件，并且父组件的形参必须是$event进行接收
               -->
    <CustomInput v-model="msg"></CustomInput>
  </div>
</template>

<script type="text/ecmascript-6">
  import CustomInput from './CustomInput.vue'
  export default {
    name: 'ModelTest',
    data() {
      return {
        msg: "A"
      }
    },
    components: {
      CustomInput
    }
  }
</script>