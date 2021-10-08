<template>
  <div>
    <Header></Header>
    <router-view></router-view>
    <Footer v-if="!$route.meta.NoShowFooter" />

  </div>
</template>

<script>
  import Header from "./components/Header/Header.vue"
  import Footer from "./components/Footer/Footer.vue"

  export default {
    components: {
      Header,
      Footer
    },

    created() {
      //使用modules之后还是直接dispatch即可
      this.$store.dispatch("getCategoryListAction");
      this.$store.dispatch("getBannerListAction");


    }

  }
</script>

<style lang="less" scoped>

</style>