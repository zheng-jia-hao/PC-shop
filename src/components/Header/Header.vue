<template>
    <header class="header">
        <!-- 头部的第一行 -->
        <div class="top">
            <div class="container">
                <div class="loginList">
                    <p>尚品汇欢迎您！</p>
                    <p v-if="isLogin.name">
                        <span>{{isLogin.name}}</span>
                        <a href="javascript:" class="register" @click="loginout">退出登录</a>
                    </p>
                    <p v-else>
                        <span>请</span>
                        <!-- <a href="###">登录</a> -->
                        <router-link to="/login">登录</router-link>
                        <router-link to="/register" class="register">免费注册</router-link>
                        <!-- <a href="###" class="register">免费注册</a> -->
                    </p>
                </div>
                <div class="typeList">
                    <!-- <a href="###">我的订单</a> -->
                    <router-link to="/center">我滴顶丹</router-link>
                    <router-link to="/shopcart">我滴购物擦</router-link>
                    <a href="###">我的尚品汇</a>
                    <a href="###">尚品汇会员</a>
                    <a href="###">企业采购</a>
                    <a href="###">关注尚品汇</a>
                    <a href="###">合作招商</a>
                    <a href="###">商家后台</a>
                </div>
            </div>
        </div>
        <!--头部第二行 搜索区域-->
        <div class="bottom">
            <h1 class="logoArea">
                <router-link to="/home" title="尚品汇">
                    <img src="./images/logo.png" alt="" />
                </router-link>
            </h1>
            <div class="searchArea">
                <form action="###" class="searchForm">
                    <!-- 可以在标签属性上用tirm -->
                    <input v-model.trim="keyWord" type="text" id="autocomplete" class="input-error input-xxlarge" />
                    <button class="sui-btn btn-xlarge btn-danger" @click="goSearch" type="button">
                        搜索
                    </button>
                </form>
            </div>
        </div>
    </header>
</template>

<script>
    export default {
        data() {
            return {
                keyWord: ''
            }
        },
        mounted() {
            this.$eventBus.$on("clearKeyWord", () => {
                this.keyWord = '';
            })
            if (this.$store.state.user.token) {
                console.log("tokencheked", this.$store.state.user.token);
                this.$store.dispatch("getUserInfoAction");
                // console.log(this.$store.state.user.userinfo);
            }
        },
        computed: {
            isLogin() {
                return this.$store.state.user.userinfo
            }
        },
        methods: {
            goSearch() {

                if (this.keyWord) {
                    this.$router.push({
                        // path: "/search",  !!!用对象的方式写，routes中必须定义name属性，并且对象内要指定对应的name
                        name: "search",
                        params: {
                            keyword: this.keyWord
                        },
                        query: this.$route.query //当前路由的query参数，如果没有则不会添加
                    })
                } else {
                    this.$router.push("/search")
                }

            },
            loginout() {
                this.$store.dispatch("loginOutAction")
                this.$store.commit("CLEARORDERS");
                this.$router.replace("/home")
            }
        },

        beforeDestroy() {
            this.$eventBus.$off("clearKeyWord");
        }
    }
</script>

<style lang="less" scoped>
    .header {
        &>.top {
            background-color: #eaeaea;
            height: 30px;
            line-height: 30px;

            .container {
                width: 1200px;
                margin: 0 auto;
                overflow: hidden;

                .loginList {
                    float: left;

                    p {
                        float: left;
                        margin-right: 10px;

                        .register {
                            border-left: 1px solid #b3aeae;
                            padding: 0 5px;
                            margin-left: 5px;
                        }
                    }
                }

                .typeList {
                    float: right;

                    a {
                        padding: 0 10px;

												// &+a  --->  a+a 选择的是紧跟后面的首个a标签，所以第一个拿不到
                        &+a {
                            border-left: 1px solid #b3aeae;
                        }
                    }

                }

            }
        }

        &>.bottom {
            width: 1200px;
            margin: 0 auto;
            overflow: hidden;

            .logoArea {
                float: left;

                .logo {
                    img {
                        width: 175px;
                        margin: 25px 45px;
                    }
                }
            }

            .searchArea {
                float: right;
                margin-top: 35px;

                .searchForm {
                    overflow: hidden;

                    input {
                        box-sizing: border-box;
                        width: 490px;
                        height: 32px;
                        padding: 0px 4px;
                        border: 2px solid #ea4a36;
                        float: left;

                        &:focus {
                            outline: none;
                        }
                    }

                    button {
                        height: 32px;
                        width: 68px;
                        background-color: #ea4a36;
                        border: none;
                        color: #fff;
                        float: left;
                        cursor: pointer;

                        &:focus {
                            outline: none;
                        }
                    }
                }
            }
        }
    }
</style>