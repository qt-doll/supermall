<template>
    <div id="detail">
  
      <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="detailnav"/>

      <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">

        <!-- <ul>
          <li v-for="item in $store.state.cartList">{{item}}</li>
        </ul> -->


        <detail-swiper class="home-swiper" 
            :top-images="topImages" 
            @swiperImageLoad="swiperImageLoad"
            />

        <detail-base-info :goods="goods"/>

        <detail-other-info :top-images="topImages" 
                            @imageLoad="imageLoad"/>

         <detail-other-info :top-images="topImages" ref="params"
                            @imageLoad="imageLoad"/>

         <detail-other-info :top-images="topImages" ref="comment"
                            @imageLoad="imageLoad"/>

         <detail-other-info :top-images="topImages" ref="recommend"
                            @imageLoad="imageLoad"/>                           


      </scroll>

      <detail-bottom-bar @addCart="addToCart"/>

      <!-- 想要监听组件的原生事件时候，如：点击，需要加.native修饰符 -->
      <back-top @click.native="backClick" v-show="isShowBackTop"/>

      <toast :message="message" :show="show"/>

    </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'
// import BackTop from 'components/content/backTop/BackTop'; // mixin.js里了
import Toast from 'components/common/toast/Toast'

import DetailNavBar from 'views/detail/childComps/DetailNavBar';
import DetailBaseInfo from 'views/detail/childComps/DetailBaseInfo';
import DetailOtherInfo from 'views/detail/childComps/DetailOtherInfo';
import DetailBottomBar from 'views/detail/childComps/DetailBottomBar';

import DetailSwiper from './childComps/DetailSwiper';

import {getDetail, Goods} from 'network/detail'

import {debounce} from 'common/utils'
import {itemListenerMixin, backTopMixin} from 'common/mixin'

import {mapActions} from 'vuex'

// import {BACK_POSITION} from 'common/const'  // mixin.js里了

export default {
  name: 'Detail',
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
        iid: null,
        topImages: [],
        goods: {},
        createTime: '',
        themeTopYs: [],
        getThemeTopY: null,
        currentIndex: 0,
        message: '',
        show: false
    }
  },
  components: {
    Scroll,
    // BackTop,// mixin.js里了
    Toast,
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailOtherInfo,
    DetailBottomBar
  },
  // 组件创建完后调用
  created() {
    // 这个状态取不到dom
    // console.log("detail create")
    // 1. 保存传入的iid
    // console.log(this.$route.params.iid)
    // console.log(this.$route.query.iid)
    this.iid = this.$route.params.iid
    // console.log(this.iid)
    // 2. 根据iid请求详情数据
    this.getDetailData(this.iid)

    this.getThemeTopY = debounce(() => {
      this.themeTopYs = []
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      this.themeTopYs.push(Number.MAX_VALUE)
      // console.log("---getThemeTopY---:", this.themeTopYs)
    }, 100)
  },
  // 组件挂载完之后调用
  mounted() {
    
    // 已经用了混入mixins，所以下面的代码可以省略

    // const refresh = debounce(this.$refs.scroll.refresh, 500)
    // this.detailImgListener = () => {
    //   refresh()
    // }
    // this.$bus.$on("itemImageLoad", this.detailImgListener)




  },
  deactived() {
    // 由于页面不是keep-alive,所以执行不到这个函数
    // actived()和deactived()，都是在keep-alive模式下执行的，
    // 所以对于加载组件监听，在离开时，home用的是deactived()，
    // detail用的是destroyed()
  },
  destroyed() {
    this.$bus.$off("itemImageLoad", this.detailImgListener)
  },
  updated() {
    // 数据渲染完成，才执行updated()，所以会执行多次，也可以执行this.$nextTick(()=>{})
    this.themeTopYs = []
    this.themeTopYs.push(0);
    this.themeTopYs.push(this.$refs.params.$el.offsetTop);
    this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
    this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
   
    // console.log("---updated---:", this.themeTopYs)
  },
  filters: {
    showDate(val) {
        // 1.将时间戳转成Date对象
        const date = newDate(val*1000)
        // 2. 将date进行格式化，转成对应字符串
        // 引入 return formatDate(date, 'yyyy-MM-dd')
    }
  },
  methods: {
    ...mapActions(['addCart']),
    getDetailData(iid){
      getDetail(iid).then(res => {
        // console.log(res)

        const goods = {
          topImages: [
            "https://s11.mogucdn.com/mlcdn/c45406/170325_7a8725dgc0ga1hff110di155gia33_640x960.jpg",
            "https://s5.mogucdn.com/mlcdn/c45406/170817_1156l388egh37g1jf1ja242i72be6_640x960.jpg",
            "https://s5.mogucdn.com/mlcdn/c45406/170819_84k447l8i4192a9ddcd763b6fbh90_640x960.jpg",
            "https://s5.mogucdn.com/mlcdn/c45406/190802_2b0c0figjcl3c5i4h04c56i041bi1_640x960.jpg"
          ],
          itemInfo: {
            title: "LaMilee（莱玫）丝绒口红不掉色防水咬唇妆哑光雾面持久",
            desc: "【美丽女人只需要这一支 】在这个美貌与颜值齐飞的时代，找到一款合适自己的口红不容易。你必须带走的理由：↵①丝丝质感，触感丝滑、打造迷人的性感双唇。↵②几秒搞定，出门随时随地都可以使用。↵③不易断， 小巧玲珑的外形携带方便，令护唇效果加倍",
            newPrice: '35.00',
            oldPrice: '70.00',
            discount: "5折",
            realPrice: '35.00'
          },
          columns: [
            {
              desc: "销量 4894",
              icon: "https://s10.mogucdn.com/mlcdn/c45406/180417_25kbfg1c3hdbd120394ji4b11bk2k_36x36.png",
              name: "sales"
            },
            {
              desc: "免邮费",
              icon: "https://s10.mogucdn.com/mlcdn/c45406/180417_25kbfg1c3hdbd120394ji4b11bk2k_36x36.png",
              name: "express"
            }
          ],
          services: [
            {
              content: "",
              icon: "https://s10.mogucdn.com/mlcdn/c45406/180417_25kbfg1c3hdbd120394ji4b11bk2k_36x36.png",
              link: "https://www.mogu.com/rule/mogu?categoryId=326&ruleId=893",
              name: "72小时发货"
            },
            {
              content: "物流签收后30天内买家可无理由退货，需满足退货条件",
              icon: "https://s10.mogucdn.com/mlcdn/c45406/180417_25kbfg1c3hdbd120394ji4b11bk2k_36x36.png",
              link: "https://www.mogu.com/rule/mogu?categoryId=326&ruleId=892",
              name: "30天无理由退货"
            },
            {
              content: "极速发货、送货保障，若发货时间晚于商家承诺时间或快递派送时间晚于平台标准，可获得延误补贴。",
              icon: "https://s10.mogucdn.com/mlcdn/c45406/180417_25kbfg1c3hdbd120394ji4b11bk2k_36x36.png",
              name: "延误必赔"
            },
            {
              content: "用户发起退货且绑定提现银行卡，可获6-18元运费补贴",
              icon: "https://s10.mogucdn.com/mlcdn/c45406/180417_25kbfg1c3hdbd120394ji4b11bk2k_36x36.png",
              link: "https://www.mogu.com/rule/mogu?categoryId=326&ruleId=927",
              name: "退货补运费"
            },
            {
              content: "",
              icon: "https://s10.mogucdn.com/mlcdn/c45406/180417_25kbfg1c3hdbd120394ji4b11bk2k_36x36.png",
              link: "https://www.mogu.com/rule/mogu?categoryId=326&ruleId=895",
              name: "全国包邮"
            }
          ],
          createTime: 1535694719  //服务返回时间，以Unix元年为起点，返回对应的时间戳，单位为秒
        }

        this.topImages = goods.topImages;
        this.goods = new Goods(goods.itemInfo, goods.columns, goods.services)

        // 将时间戳转成时间格式化的字符串 （时间戳单位为秒—）
        // 1.将时间戳转成Date对象
        // 2. 将date进行格式化，转成对应字符串
        // const date = newDate(goods.createTime*1000)
        // 第一种方式
        // date.getFullYear()+date.getMonth()+1
        // 第二种方式： date -> FormatString, fmt.format(date, 'yyyy-MM-dd hh:mm:ss') 
        // y:year
        // M：Month，M必须 大写
        // d：date
        // h: hour , 有些是区别大小写的（h(12小时)/H(24小时)）
        // m：minutes 小写和月区分


        this.createTime = goods.createTime

        /////////////////////////////////////////////////////////

        // 这里获取offsetTop，也是不对的，因为只是赋值数据，
        // 并没有渲染，所以this.$refs.params.$el是undefinded
        // this.themeTopYs = []
        // this.themeTopYs.push(0);
        // this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        // console.log(this.themeTopYs)

        /////////////////////////////////////////////////////////////


        this.$nextTick(() => {  // 数据都渲染完成，才执行，也可以在updated()里执行
          // 根据最新的数据，对应的DOM是已经被渲染出来了
          // 但是图片依然是没有加载出来了，所以要获取offsetTop，也是不准确的
          // offsetTop值不对的时候，都是因为图稿的问题
          // this.themeTopYs = []
          // this.themeTopYs.push(0);
          // this.themeTopYs.push(this.$refs.params.$el.offsetTop);
          // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
          // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
          // console.log(this.themeTopYs)
        })

        //////////////////////////////////////////////////////////////////////


      }).catch(err => {
        console.log(err)
      })
    },
    // backClick() {  // mixin.js里了
    //   // 第三个参数500，是时间，在这个时间内完成滚动
    //   this.$refs.scroll.scrollTo(0, 0, 500) 
    // },
    imageLoad() {
      // 因为混入了mixins，所以可以直接用了
      // console.log("imageLoad")
      // this.$refs.scroll.refresh()

      this.newRefresh()
      this.getThemeTopY()
    },
    swiperImageLoad() {
      // 因为混入了mixins，所以可以直接用了
      // console.log("swiperImageLoad")
      // this.$refs.scroll.refresh()
      this.newRefresh()
    },
    titleClick(index) {
      // console.log(this.themeTopYs)
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 100)
    },
    contentScroll(pos) {
      const posY = -pos.y
      // for(let i in this.themeTopYs){
        // console.log(i) 
        // PS: i是字符串类型 i+1=01,for(let i in this.themeTopYs)
        // PS: 可以用for(var i=0;i<len;i++),也可以用parseInt(i)
        let len = this.themeTopYs.length;

        
      // 普通做法
      // for(let i=0;i<len;i++){
      //   if(this.currentIndex !== i && (( i < len-1 && posY >= this.themeTopYs[parseInt(i)] && posY < this.themeTopYs[i+1]) || 
      //       ( i === len-1 && posY >= this.themeTopYs[parseInt(i)]))){
      //         this.currentIndex = i
      //         console.log(i)

      //         this.$refs.detailnav.currentIndex = this.currentIndex;
      //   }
      // }

      // hack做法
      // 手动设置一个最大值 Number.MAX_VALUE
      for(let i=0;i<len-1;i++){
        if( this.currentIndex !== i && (posY >= this.themeTopYs[parseInt(i)] && posY < this.themeTopYs[i+1])){
          this.currentIndex = i
          this.$refs.detailnav.currentIndex = this.currentIndex;
        }
      }

   

      
      // 显示回到顶部按钮
      // this.isShowBackTop = (-pos.y) > BACK_POSITION //抽到了mixin.js里了

      // 是否显示回到顶部按钮
      this.listenShowBackTop(pos)
    },
    addToCart() {
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.newPrice
      product.iid = this.iid

      ///////////第一种//////////////
      // mutation用commit
      // this.$store.commit("addCart", product)
      // actions用dispatch
      // this.$store.dispatch("addCart", product).then(res => {
      //   console.log(res)
      // })


      /////////////第二种///////////////
      // 由于已经把actions.js映射进来，可以使用
      this.addCart(product).then(res => {
        console.log(res)
        // this.show = true;
        // this.message = res;

        // setTimeout(() => {
        //   this.show = false;
        //   this.message = ''
        // }, 3000)

        // 封装后的
        this.$toast.show(res)

      })


    }
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


.content{
  /* 第一种方式 */
  /* position: absolute;
  left:0;
  right:0;
  top:44px;
  bottom:49px;
  overflow: hidden; */

  /* 第二种方式 */
  height: calc(100% - 44px - 49px);

}

#detail{
  position: relative;
  z-index: 9;
  background: #fff;
  height: 100vh;
}
.detail-nav{
  position: relative;
  z-index: 9;
  background: #fff;
}

</style>
