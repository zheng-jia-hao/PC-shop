<template>
  <div class="swiper-container">
    <swiper v-if="skuImageList" class="swiper gallery-thumbs" :options="swiperOptions" ref="swiperThumbs">
      <swiper-slide v-for="(item,index) in skuImageList" :key="index">
        <img :class="{active:currentIndex == index}" :src="item.imgUrl" @click="changeImage(index)">
      </swiper-slide>

      <div class="swiper-button-prev" slot="button-prev" @click="changeDefaultIndex(2)"></div>
      <div class="swiper-button-next" slot="button-next" @click="changeDefaultIndex(1)"></div>
    </swiper>
  </div>
</template>

<script>
  export default {
    name: "ImageList",
    props: {
      skuImageList: {
        type: Array
      }
    },
    data() {
      return {
        currentIndex: 0,
        swiperOptions: {
          slidesPerView: 6,
        }
      }
    },
    methods: {
      changeDefaultIndex(type) { //点击按钮修改图片
        //点击时触发
        if (type == 1) {
          if (this.currentIndex < this.skuImageList.length - 1) {
            this.currentIndex++
          } else {
            this.currentIndex = 0;
          }
        } else {
          if (this.currentIndex <= 0) {
            this.currentIndex = this.skuImageList.length - 1
          } else {
            this.currentIndex--;
          }
        }
        this.$eventBus.$emit("changeIndex", type);
      },
      changeImage(index) { //触发修改图片
        this.currentIndex = index
        this.$eventBus.$emit("changeZoomImage", index);
      }
    }

  }
</script>

<style lang="less" scoped>
  .swiper-container {
    height: 56px;
    width: 100% !important;
    box-sizing: border-box;
    padding: 0 12px;

    .swiper-slide {
      width: 56px;
      height: 56px;
      // margin-right: 0px !important;

      img {
        width: 100%;
        height: 100%;
        border: 1px solid #ccc;
        padding: 2px;
        width: 50px;
        height: 50px;
        display: block;

        &.active {
          border: 2px solid #f60;
          padding: 1px;
        }

        // &:hover {
        //   border: 2px solid #f60;
        //   padding: 1px;
        // }
      }
    }

    .swiper-button-next {
      left: auto;
      right: 0;
    }

    .swiper-button-prev {
      left: 0;
      right: auto;
    }

    .swiper-button-next,
    .swiper-button-prev {
      box-sizing: border-box;
      width: 12px;
      height: 56px;
      background: rgb(235, 235, 235);
      border: 1px solid rgb(204, 204, 204);
      top: 0;
      margin-top: 0;

      &::after {
        font-size: 12px;
      }
    }
  }
</style>