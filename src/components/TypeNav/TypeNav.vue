<template>
    <div class="type-nav">
        <div class="container">
            <div @mouseleave="showContainer(false)" @mouseenter="showContainer(true)">
                <h2 class="all">全部商品分类</h2>
                <transition name="slide">
                    <div class="sort" v-show="isHome">
                        <div class="all-sort-list2" v-if="categoryList.length" @click="goSearch">

                            <div class="item" @mouseenter="showSubList(index)"
                                :class="{active : currentIndex === index}" v-for="(one,index) in categoryList"
                                :key="one.categoryId">
                                <h3>
                                    <!-- 自定义属性通过 data-xxx="xxx" 指定，只属于到当前元素标签身上的属性 -->
                                    <a href="javascript:" :data-categoryName="one.categoryName"
                                        :data-category1Id="one.categoryId">{{one.categoryName}}</a>
                                    <!-- 给太多的元素绑定了标签 <a @click="goSearch(one.categoryName,one.categoryId,1)">{{one.categoryName}}</a> -->
                                </h3>
                                <div class="item-list clearfix">
                                    <div class="subitem">
                                        <dl class="fore" v-for="(two,index) in one.categoryChild" :key="two.categoryId">
                                            <dt>
                                                <!-- 自定义属性通过 data-xxx="xxx" 指定，只属于到当前元素标签身上的属性 -->
                                                <a href="javascript:" :data-categoryName="two.categoryName"
                                                    :data-category2Id="two.categoryId">{{two.categoryName}}</a>
                                                <!--给太多的元素绑定了标签 <a @click="goSearch(two.categoryName,two.categoryId,2)">{{two.categoryName}}</a> -->
                                            </dt>
                                            <dd>
                                                <em v-for="(three,index) in two.categoryChild" :key="three.categoryId">
                                                    <!-- 自定义属性通过 data-xxx="xxx" 指定，只属于到当前元素标签身上的属性 -->
                                                    <a href="javascript:" :data-categoryName="three.categoryName"
                                                        :data-category3Id="three.categoryId">{{three.categoryName}}</a>
                                                    <!-- 给太多的元素绑定了标签 <a 
                                                @click="goSearch(three.categoryName,three.categoryId,3)">{{three.categoryName}}</a> -->
                                                </em>

                                            </dd>
                                        </dl>

                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                </transition>
            </div>

            <nav class="nav">
                <a href="###">服装城</a>
                <a href="###">美妆馆</a>
                <a href="###">尚品汇超市</a>
                <a href="###">全球购</a>
                <a href="###">闪购</a>
                <a href="###">团购</a>
                <a href="###">有趣</a>
                <a href="###">秒杀</a>
            </nav>

        </div>
    </div>
</template>

<script>
    import throttle from "lodash/throttle"
    import {
        mapState
    } from "vuex";
    export default {
        name: "TypeNav",

        data() {
            return {
                //通过js控制列表的显示
                // 当前鼠标进入的下标,未进入前一定不能 >= 0 当移入时才切为 >=0
                // -2 表示离开了当前区域
                currentIndex: -2,
                isHome: true
                // a: {
                //     trailing: false //最后一次事件不进行处理
                // }
            }
        },

        created() {
            //判断当前路由是否是 /或者/home 如果是进行显示
            if (this.$route.path !== "/home") {
                this.isHome = false
            }
        },

        computed: {
            //使用模块化的方式管理vuex之后，mapState只能使用对象的方式取值
            ...mapState({
                categoryList: state => {
                    return state.home.categoryList;
                }
            }),
        },

        methods: {
            goSearch(event) { 
								// goSearch分为输入框搜索和侧边栏点击   当前是侧边栏点击时的方法
								//event 事件对象，不传参数自带
                //这里为什么不写成router-link跳转？
                // 因为router-link是会产生组件对象的，会导致页面卡顿
                // 但是又多了一种问题，属性标签太多，而且都添加的点击事件，这样好吗？这样不好

                //能不能给一个元素绑定一个事件，实现全部的功能： 事件委派/事件代理

                //  1). 给他们的公共的父类绑定点击事件

                //  2). 确定点击的到底是什么标签元素
                const target = event.target;
                //如果目标元素不是a标签，不向下进行
                if (target.tagName.toUpperCase() !== "A") {
                    return;
                }
                // 3). 定义data的自定义属性，并且取出
                // target确定点击的元素，target.dataset能取出定义的自定义属性
                // 要注意 : target.dataset取出的数据都是小写的
                const {
                    categoryname,
                    category1id,
                    category2id,
                    category3id
                } = target.dataset;

                // 只给了a标签添加了自定义属性，如果有才继续进行
                if (categoryname) {
                    //因为categoryId是根据不同级别的菜单动态变换的所以单独定义
                    const query = {
                        categoryName: categoryname,
                    }

                    if (category1id) {
                        query.category1Id = category1id
                    } else if (category2id) {
                        query.category2Id = category2id
                    } else if (category3id) {
                        query.category3Id = category3id
                    }

                    if (this.$route.name !== "home") {
                        this.isHome = false
                    }

                    this.$router.push({
                        //当路由组件中定义了name属性，则对象的方式只能使用name进行路由的跳转
                        name: "search",

                        //它并不会因为没有携带参数而报错，因为占位符定义了，而query参数是选带
                        query,
                        params: this.$route.params //因为在路由中定义了占位后添加了?号，如果没有就不会显示params的参数
                    })



                }
            },

            /**
             *  关于鼠标移入typenav 中的效果和bug:
             * 
             *      1). 鼠标移入时，需要将当前的index传入，修改currentIndex，动态修改样式
             *      2). 添加了多个mouseenter 使用频率过高，通过 lodash进行节流
             *      
             *      3). 当鼠标移出typenav时，将currentIndex等于负数，则不会显示二级分类
             *      
             *      4). bug : 快速移除typenav ， currentIndex不等于负数 是因为使用了节流
             *      
             *      5). 解决方法的探索 ：  
             *              1. 给节流函数添加配置[options.trailing=true] (boolean): 最后一次不调用
             *                 BUG ： 当在typenav中的最后一次也将不调用
             * 
             *              2. 能否动态修改[options.trailing=true] ?
             *                  不行，因为内部无法访问this
             * 
             *              3. 通过以上两点得出，不能使用配置限制显示，只能手动设计数据控制显示
             *                 
             */
            showSubList: throttle(function (index) {

                if (this.currentIndex !== -2) {
                    this.currentIndex = index
                }

            }, 150), //, {  bug: 快速移除
            //     trailing: false
            // } /* this.a 内部无法访问this 所以通过data中的状态数据改变模式是行不通的*/ ),

            showContainer(isShow) {
                if (isShow) {
                    this.currentIndex = -1;
                    this.isHome = true;
                } else {
                    this.currentIndex = -2;
                    if (this.$route.path !== "/home") this.isHome = false;
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    .type-nav {
        border-bottom: 2px solid #e1251b;

        .container {
            width: 1200px;
            margin: 0 auto;
            display: flex;
            position: relative;

            .all {
                width: 210px;
                height: 45px;
                background-color: #e1251b;
                line-height: 45px;
                text-align: center;
                color: #fff;
                font-size: 14px;
                font-weight: bold;
            }

            .nav {
                a {
                    height: 45px;
                    margin: 0 22px;
                    line-height: 45px;
                    font-size: 16px;
                    color: #333;
                }
            }

            .sort {
                position: absolute;
                left: 0;
                top: 45px;
                width: 210px;
                height: 461px;
                position: absolute;
                background: #fafafa;
                z-index: 999;

                &.slide-enter-active,
                &.slide-leave-active {
                    transition: all .3s;
                }

                ;

                &.slide-enter,
                &.slide-leave-to {
                    opacity: 0;
                    height: 0;
                }

                .all-sort-list2 {
                    .item {

                        h3 {
                            line-height: 30px;
                            font-size: 14px;
                            font-weight: 400;
                            overflow: hidden;
                            padding: 0 20px;
                            margin: 0;

                            a {
                                color: #333;
                            }
                        }

                        .item-list {
                            display: none;
                            position: absolute;
                            width: 734px;
                            min-height: 460px;
                            background: #f7f7f7;
                            left: 210px;
                            border: 1px solid #ddd;
                            top: 0;
                            z-index: 9999 !important;

                            .subitem {
                                float: left;
                                width: 650px;
                                padding: 0 4px 0 8px;

                                dl {
                                    border-top: 1px solid #eee;
                                    padding: 6px 0;
                                    overflow: hidden;
                                    zoom: 1;

                                    &.fore {
                                        border-top: 0;
                                    }

                                    dt {
                                        float: left;
                                        width: 54px;
                                        line-height: 22px;
                                        text-align: right;
                                        padding: 3px 6px 0 0;
                                        font-weight: 700;
                                    }

                                    dd {
                                        float: left;
                                        width: 415px;
                                        padding: 3px 0 0;
                                        overflow: hidden;

                                        em {
                                            float: left;
                                            height: 14px;
                                            line-height: 14px;
                                            padding: 0 8px;
                                            margin-top: 5px;
                                            border-left: 1px solid #ccc;
                                        }
                                    }
                                }
                            }
                        }

                        &.active {
                            background-color: #ccc;

                            cursor: pointer;

                            .item-list {
                                display: block;
                            }
                        }
                    }
                }
            }
        }
    }
</style>