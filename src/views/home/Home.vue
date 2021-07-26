<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="left">back</div>
      <div slot="center">购物街</div>
      <div slot="right">right</div>
    </nav-bar>

      <tab-control :titles="['流行', '新品', '精选']" 
                  @tabClick="tabClick" 
                  ref="tabControl1" 
                  class="tab-control" 
                  v-show="isTabFixed"
                  />  

    <scroll class="content" ref="scroll" 
            :probe-type="3" 
            :pull-up-load="true" 
            @scroll="contentScroll" 
            @pullingUp="loadmore"
            >
      <home-swiper class="home-swiper" 
                  :banners="banners"
                  @swiperImageLoad="swiperImageLoad" 
                  />
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control :titles="['流行', '新品', '精选']" 
                  @tabClick="tabClick" 
                  ref="tabControl2" 
                  />    
      <goods-list :goods="showGoods"></goods-list>
    </scroll>

    <!-- 想要监听组件的原生事件时候，如：点击，需要加.native修饰符 -->
    <back-top @click.native="backClick" v-show="isShowBackTop"/>

  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar';
import Scroll from 'components/common/scroll/Scroll';
import TabControl from 'components/content/tabControl/TabControl';
import GoodsList from 'components/content/goods/GoodsList';
// import BackTop from 'components/content/backTop/BackTop'; //mixin.js里了

import HomeSwiper from './childComps/HomeSwiper';
import RecommendView from './childComps/RecommendView';
import FeatureView from './childComps/FeatureView';

import {getHomeMultidata, getHomeGoods} from 'network/home';
// import {debounce} from 'common/utils'
import {itemListenerMixin, backTopMixin} from 'common/mixin'

export default {
  name: 'Home',
  mixins: [itemListenerMixin, backTopMixin],
  components: {
    NavBar,
    Scroll,
    TabControl,
    GoodsList,
    // BackTop, //mixin.js里了
    HomeSwiper,
    RecommendView,
    FeatureView
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      },
      currentType: 'pop',
      // isShowBackTop: false, //mixin.js里了
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  created() {
    // 1.请求多个数据
    this.getHomeMultidata();

    // 2.请求商品数据
    this.getHomeGoods('pop');
    this.getHomeGoods('new');
    this.getHomeGoods('sell');

    // 手动代码点击一次
    // 写在create()里this.tabClick(0)，tabClick执行时，需要判断一下，具体见函数代码
    // this.tabClick(0)

  },
  mounted() {

    // 已经用了混入mixins，所以下面的代码可以省略

    // // goodsitem中的图片加载完成的事件监听
    // const refresh = debounce(this.$refs.scroll.refresh, 500)
    
    // // 对监听的事件进行保存
    // this.homeImgListener = () => {
    //   refresh() 
    // }

    // // this.$bus.$on("itemImageLoad", () => {
    // //   // console.log("itemImageLoad")
    // //   // console.log(this.$refs.scroll)

    // //   // 如果我们直接执行refresh, 那么refresh函数会被执行30次,所以需要处理一下防抖
    // //   // this.$refs.scroll.refresh()

    // //   // * 防抖debounce/节流throttle(课下研究一下)
    // //   // * 防抖函数起作用的过程:
    // //   //   * 如果我们直接执行refresh, 那么refresh函数会被执行30次.
    // //   //   * 可以将refresh函数传入到debounce函数中, 生成一个新的函数.
    // //   //   * 之后在调用非常频繁的时候, 就使用新生成的函数.
    // //   //   * 而新生成的函数, 并不会非常频繁的调用, 如果下一次执行来的非常快, 那么会将上一次取消掉
      
    // //   refresh()      
    // // })

    // this.$bus.$on("itemImageLoad", this.homeImgListener)

    this.tabClick(0)
  
 
  },
  destroyed() {

  },
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
    this.$refs.scroll.refresh()
  },
  deactivated() {
    // 1.保存Y值
    this.saveY = this.$refs.scroll.getScrollY()
    // 2.取消全局事件监听
    this.$bus.$off("itemImageLoad", this.homeImgListener)
  },
  methods: {

    /**
     * 事件监听相关的方法
     */
    tabClick(index) {
      switch(index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }

      // 第一种方式，this.tabClick(0)，写在create()里，需要判断一下，如下
      // if(this.$refs.tabControl1 !== undefined){
      //   this.$refs.tabControl1.currentIndex = index
      //   this.$refs.tabControl2.currentIndex = index
      // }

      // 第二种方式，this.tabClick(0)，写在mounted()里，不需要判断，因为已经挂载，直接写就可以了
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
    },
    // backClick() {  //mixin.js里了
    //   // 第三个参数500，是时间，在这个时间内完成滚动
    //   this.$refs.scroll.scrollTo(0, 0, 500) 
    // },
    contentScroll(pos) {
      // console.log(pos)

      // 显示回到顶部按钮
      // this.isShowBackTop = (-pos.y) > 300   // mixin.js
      this.listenShowBackTop(pos)

      // 决定tabControl是否吸顶（position: fixed;）
      this.isTabFixed = (-pos.y) > this.tabOffsetTop
    },

    loadmore() {
      this.getHomeGoods(this.currentType)
    },

    swiperImageLoad() {
    // 获取tabControl的offsetTop
    // 所有的组件都有一个属性$el，用于获取组件中的元素
    // 组件对象.$el: 组件的根元素对象
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      // console.log(this.tabOffsetTop)
    },

    // * 防抖debounce
    // debounce(func, delay) {
    //   let timer = null
    //   return function (...args) {
    //     if (timer) clearTimeout(timer)
    //     timer = setTimeout(() => {
    //       func.apply(this, args)
    //     }, delay)
    //   }
    // },

    /**
     * 网络请求相关的方法
     */

    getHomeMultidata() {
      getHomeMultidata().then(res => {
          // console.log(res)
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
      }).catch(() => {
          // console.log(err)
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(() => {
          // console.log(res)
          const goodsData = [
            {
              image: "https://s10.mogucdn.com/mlcdn/c45406/180926_45fkj8ifdj4l824l42dgf9hd0h495_750x390.jpg",
              link: "https://act.mogujie.com/huanxin0001?acm=3.mce.2_10_1jhwa.43542.0.ccy5br4OlfK0Q.pos_0-m_454801-sd_119",
              title: "焕新女装节",
              iid: '1lqxuvu'
            },
            {
              image: "https://s10.mogucdn.com/mlcdn/c45406/180926_45fkj8ifdj4l824l42dgf9hd0h495_750x390.jpg",
              link: "https://act.mogujie.com/huanxin0001?acm=3.mce.2_10_1jhwa.43542.0.ccy5br4OlfK0Q.pos_0-m_454801-sd_119",
              title: "焕新女装节",
              iid: '1lqxuv3'
            },
            {
              image: "https://s10.mogucdn.com/mlcdn/c45406/180926_45fkj8ifdj4l824l42dgf9hd0h495_750x390.jpg",
              link: "https://act.mogujie.com/huanxin0001?acm=3.mce.2_10_1jhwa.43542.0.ccy5br4OlfK0Q.pos_0-m_454801-sd_119",
              title: "焕新女装节",
              iid: '1lqxuv2'
            },
            {
              image: "https://s10.mogucdn.com/mlcdn/c45406/180926_45fkj8ifdj4l824l42dgf9hd0h495_750x390.jpg",
              link: "https://act.mogujie.com/huanxin0001?acm=3.mce.2_10_1jhwa.43542.0.ccy5br4OlfK0Q.pos_0-m_454801-sd_119",
              title: "焕新女装节",
              iid: '1lqxuv1'
            },
            {
              image: "https://s10.mogucdn.com/mlcdn/c45406/180926_45fkj8ifdj4l824l42dgf9hd0h495_750x390.jpg",
              link: "https://act.mogujie.com/huanxin0001?acm=3.mce.2_10_1jhwa.43542.0.ccy5br4OlfK0Q.pos_0-m_454801-sd_119",
              title: "焕新女装节",
              iid: '1lqxu2u'
            },
            {
              image: "https://s10.mogucdn.com/mlcdn/c45406/180926_45fkj8ifdj4l824l42dgf9hd0h495_750x390.jpg",
              link: "https://act.mogujie.com/huanxin0001?acm=3.mce.2_10_1jhwa.43542.0.ccy5br4OlfK0Q.pos_0-m_454801-sd_119",
              title: "焕新女装节",
              iid: '1lqx5vu'
            }
          ]
          this.goods[type].list.push(...goodsData);
          // console.log(type, this.goods[type].list)
          this.goods[type].page += 1

          // 完成上拉加载更多
          this.$refs.scroll.finishPullUp()
      }).catch(err => {
          console.log(err)
      })
    }
  }
}
</script>

<style scoped>
  #home{
    /* padding-top:44px; */
    /* padding-bottom: 50px; */
    height: 100vh; /*vh -> viewport height 视口高度 100vh：100%视口；50vh：50%视口*/
    position: relative;
  }
  .home-nav{
    /* background-color: var(--color-tint); */
    background: #ff8198;
    color: #fff;

    /* 在使用浏览器原生滚动时，为了让导航不跟随一起滚动，用下面的 */
    /* position: fixed;
    left: 0;
    right: 0;top: 0;
    z-index: 9; */
  }
  .tab-control{    
    /*比较新的属性，当到达指定高度，position设置成fixed,实现吸顶效果，
    移动端可以用，但是要适配IE等浏览器，要慎用，部分浏览器可能不支持*/
    position: sticky; /* /用better-scroll实现滚动后，这些设置就失效了*/
    /* top: 44px; */
    z-index: 66;
  }

  .tabFixed{
    position: fixed;
    left:0;
    right:0;
    top:44px;
  }

  .tab-control{
    position: relative;
    z-index: 9;
  }

  /* 第一种方式实现滚动高度，配合，#home：100vh */
  /*PS:calc(100% - 93px)开始不生效，原因是减号两边必须加个空格 */
  /* .content{
    height: calc(100% - 93px); 
    margin-top: 44px;
  } */

  /* 第二种实现方式  */
  .content{
    position: absolute;
    left:0;
    right:0;
    top:44px;
    bottom:49px;
    overflow: hidden;
  }
</style>
