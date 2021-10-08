<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="shopCart in shopCartList" :key="shopCart.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="shopCart.isChecked"
              @click="changeCartChecked(shopCart,$event.target.checked)">
          </li>
          <li class="cart-list-con2">
            <img :src="shopCart.imgUrl">
            <div class="item-msg">{{shopCart.skuName}}</div>
          </li>

          <li class="cart-list-con4">
            <span class="price">{{shopCart.cartPrice}}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="changeCartCount(shopCart,-1,true)">-</a>
            <input autocomplete="off" type="text" @change="changeCartCount(shopCart,$event.target.value *1,false)"
              :value="shopCart.skuNum" minnum="1" class="itxt">
            <a href="javascript:void(0)" class="plus" @click="changeCartCount(shopCart,1,true)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{shopCart.skuNum*shopCart.cartPrice}}</span>
          </li>
          <li class="cart-list-con7">
            <a href="javascript:" class="sindelet" @click="deleteCartItem(shopCart.skuId)">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>


    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" v-model="isCheckedAll">
        <!--  :checked="isCheckedAll" 上面的input如果是使用了checked的话,那么没有办法实现计算属性的set方法,所以要使用 v-model -->
        <span>全选</span>
      </div>
      <div class="option">
        <a href="#none" @click="deleteCheckedCart">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>{{allCount}}</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{allPrice}}</i>
        </div>
        <div class="sumbtn">
          <router-link to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    mapState
  } from "vuex"
  import {
    changeCartChecked,
    deleteCart
  } from "../../api/index"
  export default {
    name: 'ShopCart',
    created() {
      this.getCartList();
    },
    methods: {
      getCartList() {
        this.$store.dispatch("getShopCartListAction");
      },
      async changeCartChecked(cart, isChecked) { //修改选中状态
        //直接拿到的isChecked 是一直为 1的,是因为数据是后端的,前端没办法变
        // 所以决定拿input的checked属性进行判断
        let res = await this.$API.changeCartChecked(cart.skuId, isChecked ? 1 : 0);
        if (res.code == 200) {
          this.getCartList();
        }
      },
      async deleteCartItem(id) { //删除点击的购物车
        let res = await this.$API.deleteCart(id);
        if (res.code == 200) {
          this.getCartList();
        }
      },
      deleteCheckedCart() { //删除选中的购物车
        this.shopCartList.forEach(async item => {
          if (item.isChecked == 1) {
            let res = await this.$API.deleteCart(item.skuId);
            if (res.code == 200) {
              this.getCartList();
            }
          }
        })
      },

      async changeCartCount(cart, count, type) { //修改购物车数量
        //三个操作都放在了这个函数，添加，删除，直接输入
        let lastCount = 0;
        console.log(cart);
        if (!type) { //直接输入时的判断，因为后端只需要变化的数据所以需要做一些处理拿到变化的值
          if (/\d/.test(count)) {
            if (count <= 0) {
              lastCount = -cart.skuNum + 1
            } else {
              lastCount = count - cart.skuNum //   5 - 7
            }
          } else {
            lastCount = -cart.skuNum + 1
          }

        } else { //点击加号或者减号

          if (count + cart.skuNum == 0) {
            return
          } else {
            lastCount = count
          }
        }
        await this.$store.dispatch("AddShopinShopCartAction", {
          id: cart.skuId,
          count: lastCount
        });
        this.getCartList();
      }
    },
    computed: {
      ...mapState({
        shopCartList: state => state.shopCart.shopCartList
      }),
      allCount() { //获取所有选择状态的count
        return this.shopCartList.reduce((pre, item) => {

          if (item.isChecked == 1) {
            let a = item.skuNum
            pre += a;
            // return pre   reduce不能在if判断里面return,因为如果没有进入if 那么pre将变成NAN
          }
          return pre
        }, 0)

      },
      allPrice() { //获取所有选中状态的价格
        return this.shopCartList.reduce((pre, item) => {
          if (item.isChecked == 1) pre += item.skuNum * item.cartPrice;
          return pre
        }, 0)
      },


      // isCheckedAll() {   它还有个更新的方法，所以要写set
      //   //every方法判断数组的每一项是否都符合某个条件，符合则返回true
      //   return this.shopCartList.every(item => item.isChecked == 1)
      // }
      isCheckedAll: { //全选功能
        get() {
          //every方法判断数组的每一项是否都符合某个条件，符合则返回true
          return this.shopCartList.every(item => item.isChecked == 1)
        },
        set(newValue) {
          this.shopCartList.forEach(async (cart) => {
            await this.$API.changeCartChecked(cart.skuId, newValue ? 1 : 0);
            this.getCartList();
          });
          console.log(this.shopCartList);
        }

      }
    }
  }
</script>

<style lang="less" scoped>
  .cart {
    width: 1200px;
    margin: 0 auto;

    h4 {
      margin: 9px 0;
      font-size: 14px;
      line-height: 21px;
    }

    .cart-main {
      .cart-th {
        background: #f5f5f5;
        border: 1px solid #ddd;
        padding: 10px;
        overflow: hidden;

        &>div {
          float: left;
        }

        .cart-th1 {
          width: 25%;

          input {
            vertical-align: middle;
          }

          span {
            vertical-align: middle;
          }
        }

        .cart-th2 {
          width: 25%;
        }

        .cart-th3,
        .cart-th4,
        .cart-th5,
        .cart-th6 {
          width: 12.5%;

        }
      }

      .cart-body {
        margin: 15px 0;
        border: 1px solid #ddd;

        .cart-list {
          padding: 10px;
          border-bottom: 1px solid #ddd;
          overflow: hidden;

          &>li {
            float: left;
          }

          .cart-list-con1 {
            width: 15%;
          }

          .cart-list-con2 {
            width: 35%;

            img {
              width: 82px;
              height: 82px;
              float: left;
            }

            .item-msg {
              float: left;
              width: 150px;
              margin: 0 10px;
              line-height: 18px;
            }
          }



          .cart-list-con4 {
            width: 10%;

          }

          .cart-list-con5 {
            width: 17%;

            .mins {
              border: 1px solid #ddd;
              border-right: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }

            input {
              border: 1px solid #ddd;
              width: 40px;
              height: 33px;
              float: left;
              text-align: center;
              font-size: 14px;
            }

            .plus {
              border: 1px solid #ddd;
              border-left: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }
          }

          .cart-list-con6 {
            width: 10%;

            .sum {
              font-size: 16px;
            }
          }

          .cart-list-con7 {
            width: 13%;

            a {
              color: #666;
            }
          }
        }
      }
    }

    .cart-tool {
      overflow: hidden;
      border: 1px solid #ddd;

      .select-all {
        padding: 10px;
        overflow: hidden;
        float: left;

        span {
          vertical-align: middle;
        }

        input {
          vertical-align: middle;
        }
      }

      .option {
        padding: 10px;
        overflow: hidden;
        float: left;

        a {
          float: left;
          padding: 0 10px;
          color: #666;
        }
      }

      .money-box {
        float: right;

        .chosed {
          line-height: 26px;
          float: left;
          padding: 0 10px;
        }

        .sumprice {
          width: 200px;
          line-height: 22px;
          float: left;
          padding: 0 10px;

          .summoney {
            color: #c81623;
            font-size: 16px;
          }
        }

        .sumbtn {
          float: right;

          a {
            display: block;
            position: relative;
            width: 96px;
            height: 52px;
            line-height: 52px;
            color: #fff;
            text-align: center;
            font-size: 18px;
            font-family: "Microsoft YaHei";
            background: #e1251b;
            overflow: hidden;
          }
        }
      }
    }
  }
</style>