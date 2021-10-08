<template>
  <div class="spec-preview" v-if="skuImageList[0]">
    <img :src="skuImageList[defaultIndex].imgUrl">
    <!-- event 是整个大图的div -->
    <div class="event" @mousemove="move"></div>
    <div class="big">
      <img :src="skuImageList[defaultIndex].imgUrl" ref="bigImage">

    </div>
    <!-- mask 是镜片 -->
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
  export default {
    name: "Zoom",
    props: {
      skuImageList: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        defaultIndex: 0
      }
    },
    mounted() {
      this.$eventBus.$on("changeIndex", this.changeIndex)
      this.$eventBus.$on("changeZoomImage", this.changeZoomImage)
    },

    methods: {
      changeIndex(type) { //判断是倒退还是前进
        if (type == 1) {
          if (this.defaultIndex < this.skuImageList.length - 1) {
            this.defaultIndex++
          } else {
            this.defaultIndex = 0;
          }
        } else {
          if (this.defaultIndex <= 0) {
            this.defaultIndex = this.skuImageList.length - 1
          } else {
            this.defaultIndex--;
          }
        }
      },
      changeZoomImage(index) {
        this.defaultIndex = index;
      },
      move(event) {
        //放大镜
        //拿到大图
        let bigImage = this.$refs.bigImage;
        //拿到图片的盒子的宽高
        let mouseX = event.offsetX;
        let mouseY = event.offsetY;

        //拿到镜片元素
        let mask = this.$refs.mask;
        //求出镜片在盒子中的距离
        let maskX = mouseX - mask.offsetWidth / 2
        let maskY = mouseY - mask.offsetHeight / 2

        //限定临界值
        if (maskX < 0) {
          maskX = 0
        } else if (maskX > mask.offsetWidth) {
          maskX = mask.offsetWidth
        }

        if (maskY < 0) {
          maskY = 0
        } else if (maskY > mask.offsetHeight) {
          maskY = mask.offsetHeight
        }

        //移动镜片
        mask.style.left = maskX + "px";
        mask.style.top = maskY + "px";

        //移动大图

        bigImage.style.left = -maskX * 2 + "px";
        bigImage.style.top = -maskY * 2 + "px";

      }
    },
    beforeDestroy() {
      this.$eventBus.$off("changeIndex");
      this.$eventBus.$off("changeZoomImage");
    }
  }
</script>

<style lang="less">
  .spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
      width: 100%;
      height: 100%;
    }

    .event {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 998;
    }

    .mask {
      width: 50%;
      height: 50%;
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #aaa;
      overflow: hidden;
      z-index: 998;
      display: none;
      background: white;

      img {
        width: 200%;
        max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .event:hover~.mask,
    .event:hover~.big {
      display: block;
    }
  }
</style>