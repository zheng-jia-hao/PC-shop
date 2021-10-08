<template>
    <div class="home">
        <TypeNav />
        <ListContainer />
        <TodayRecommend :recommends="recommends" />
        <Rank />
        <Like />
        <Floor v-for="(floor,index) in floors" :key="index" :floor="floor" />
        <Brand />

    </div>
</template>

<script>
    import {
        mapState
    } from "vuex"
    import Brand from "./Brand/Brand.vue";
    import Floor from "./Floor/Floor.vue";
    import Like from "./Like/Like.vue";
    import ListContainer from "./ListContainer/ListContainer.vue";
    import Rank from "./Rank/Rank.vue";
    import TodayRecommend from "./TodayRecommend/TodayRecommend.vue";
    export default {
        name: "Home",
        mounted() {
            this.$store.dispatch("getFloorsAction")
            this.$store.dispatch("getRecommendsAction")

        },
        computed: {
            ...mapState({
                floors: state => state.home.floors,
                recommends: state => state.home.recommends
            })
        },
        components: {
            Brand,
            Floor,
            Like,
            ListContainer,
            Rank,
            TodayRecommend
        }
    }
</script>

<style lang="less" scoped>

</style>