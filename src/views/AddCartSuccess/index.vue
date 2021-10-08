<template>
  <div class="cart-complete-wrap">
    <div class="cart-complete">
      <h3><i class="sui-icon icon-pc-right"></i>商品已成功加入购物车！</h3>
      <div class="goods">
        <div class="left-good">
          <div class="left-pic">
            <img :src="attrs.skuDefaultImg">
          </div>
          <div class="right-info">
            <p class="title">{{attrsNames.name}}</p>
            <p class="attr" v-for="(attr,index) in attrsNames.attrs" :key="index">{{attr}}</p>
            <p class="title">总价：{{attrsNames.price}}</p>

          </div>
        </div>
        <div class="right-gocart">
          <a href="javascript:" class="sui-btn btn-xlarge" @click="$router.push(`/detail/${attrs.id}`)">查看商品详情</a>
          <router-link to="/shopcart">去购物车结算 > </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'AddCartSuccess',
    /***
     * 全局事件总线传递attrs 为什么不行？
     *  当我在别的路由组件触发时，当前组件还未绑定事件，所以触发时它并不会调用
     * 
     * 路由传参为什么不行？
     *  路由传参行，但是只行第一次，后面刷新页面params参数将丢失。
     * 
     * 所以只能考虑本地存储
     */
    data() {
      return {
        attrs: {},
        attrList: []
      }
    },
    created() {
      this.attrs = JSON.parse(sessionStorage.getItem("SKUINFO_KEY"));
      this.attrList = JSON.parse(sessionStorage.getItem("ATTRLIST_KEY"));
      console.log(this.attrs);
      console.log(this.attrList);
    },
    computed: {
      attrsNames() {
        let obj = {
          attrs: []
        }
        obj.name = this.attrs.skuName
        console.log(this.$route.params.count);
        obj.price = (this.$route.query.count * 1) * this.attrs.price
        this.attrList.forEach(attr => {
          attr.spuSaleAttrValueList.forEach(checked => {
            if (checked.isChecked == 1) {
              obj.attrs.push(checked.saleAttrName + ":" + checked.saleAttrValueName)
            }
          })
        })
        console.log(obj);
        return obj
      }
    }

  }
</script>

<style lang="less" scoped>
  .cart-complete-wrap {
    background-color: #f4f4f4;

    .cart-complete {
      width: 1200px;
      margin: 0 auto;

      h3 {
        font-weight: 400;
        font-size: 16px;
        color: #6aaf04;
        padding-top: 15px;
        padding-bottom: 15px;
        margin: 0;

        .icon-pc-right {
          background-color: #fff;
          border: 2px solid #6aaf04;
          padding: 3px;
          margin-right: 8px;
          border-radius: 15px;
        }
      }

      .goods {
        overflow: hidden;
        padding: 10px 0;

        .left-good {
          float: left;

          .left-pic {
            border: 1px solid #dfdfdf;
            width: 60px;
            float: left;

            img {
              width: 60px;
              height: 60px;
            }
          }

          .right-info {
            color: #444;
            float: left;
            margin-left: 10px;

            .title {
              width: 100%;
              line-height: 28px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              font-size: 14px;
            }

            .attr {
              color: #aaa;
            }
          }
        }

        .right-gocart {
          float: right;

          a {
            padding: 7px 36px;
            font-size: 15px;
            line-height: 22px;
            color: #333;
            background-color: #eee;
            text-decoration: none;
            box-sizing: border-box;
            border: 1px solid #e1e1e1;
          }

          a:hover {
            background-color: #f7f7f7;
            border: 1px solid #eaeaea;
          }

          a:active {
            background-color: #e1e1e1;
            border: 1px solid #d5d5d5;
          }

          .btn-danger {
            background-color: #e1251b;
            color: #fff;
          }

          .btn-danger:hover {
            background-color: #e1251b;
          }
        }

      }
    }
  }
</style>