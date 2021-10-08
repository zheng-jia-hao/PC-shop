<template>
  <div>
    <h2>效果一: 显示TODO列表时, 已完成的TODO为绿色</h2>
    <List :todos="todos">
      <template slot-scope="{todo}">
        <span :style="{color:todo.isComplete ? 'green':''}">{{todo.text}}</span>
      </template>
    </List>
    <hr>
    <!-- 步骤：
          1.先将todos传递到子组件中，子组件props接收后遍历渲染
          2.定义slot，在父组件中使用template的方式进行插槽内容的传递
          3. slot是可以将数据传递到template中的 直接在标签元素上 :todo="todo",
          而父组件中的template需要使用slot-scope去拿子组件传递过来的内容，
          再将其进行结构拿到todo进行处理后再由插槽将处理好的内容传递到子组件中
     -->

    <h2>效果二: 显示TODO列表时, 带序号, TODO的颜色为蓝绿搭配</h2>
    <List :todos="todos">
      <template slot-scope="{todo,index}">
        <span :style="{color:index%2==0 ? 'green':'red'}">{{todo.text}}</span>
      </template>
    </List>
  </div>
</template>

<script type="text/ecmascript-6">
  import List from './List'
  export default {
    name: 'ScopeSlotTest',
    data() {
      return {
        todos: [{
            id: 1,
            text: 'AAA',
            isComplete: false
          },
          {
            id: 2,
            text: 'BBB',
            isComplete: true
          },
          {
            id: 3,
            text: 'CCC',
            isComplete: false
          },
          {
            id: 4,
            text: 'DDD',
            isComplete: false
          },
        ]
      }
    },

    components: {
      List
    }
  }
</script>