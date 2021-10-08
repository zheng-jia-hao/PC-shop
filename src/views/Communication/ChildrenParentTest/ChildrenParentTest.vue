<template>
  <div>
    <h2>BABA有存款: {{money}}</h2>
    <button @click="jqxm(100)">找小明借钱100</button><br>
    <button @click="jqxh(150)">找小红借钱150</button><br>
    <button @click="jq(200)">找所有孩子借钱200</button><br>

    <br>
    <Son ref="xm" />

    <br>
    <Daughter ref="xh" />
  </div>
</template>

<script>
  import Son from './Son'
  import Daughter from './Daughter'

  export default {
    name: 'ChildrenParentTest',
    data() {
      return {
        money: 1000
      }
    },

    methods: {
      jqxm(m) {
        this.money += m;
        this.$refs.xm.money -= m
      },
      jqxh(m) {
        this.money += m;
        this.$refs.xh.money -= m
      },
      jq(m) {
        this.money += m * 2;
        this.$refs.xh.money -= m
        this.$refs.xm.money -= m
      }
    },

    components: {
      Son,
      Daughter
    }
  }
</script>

<style>

</style>