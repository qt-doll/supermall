<template>
  <div class="wrapper" ref="wrapper">
      <div class="content">
        <slot/>
      </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'Scroll',
  props: {
      probeType:{
          type: Number,
          default: 0
      },
      pullUpLoad:{
          type: Boolean,
          default: false
      }
  },
  data() {
    return {
      scroll: null
    }
  },
  // 组件创建完后调用
  created() {
    // 这个状态取不到dom
  },
  // 组件挂载完之后调用
  mounted() {
    // ref如果是绑定在组件中，那么通过this.$refs.refname获取到的是一个组件对象
    // ref如果是绑定在普通的元素中，那么通过this.$refs.refname获取到的是一个元素对象
    // 所以不要通过document.querySelector(".wrapper")去获取，多个.wrapper时容易混乱出错
    // this.scroll = new BScroll(document.querySelector(".wrapper"),{
    //   probeType: 3,
    //   pullUpLoad: true
    // }) 


    // 默认情况下，BScroll是不可以实时的监听滚动位置的，如果想要实现监控，
    // 需要在声明时加参数probeType, probe(探测)，默认值是0：不侦测; 1:不侦测;
    // 2:在手指滚动的过程中侦测，手指离开后的惯性滚动过程中不侦测
    // 3:只要是滚动，都侦测
    // click 属性，需要设置为true才可以监听事件, 看上面例子的注释

    // 1.创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper,{
    //   probeType: 3,
    //   pullUpLoad: true,
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    }) 
    // 2.监听滚动位置
    if(this.probeType === 2 || this.probeType === 3){
        this.scroll.on("scroll", (position) => {
            // console.log(position)
            this.$emit('scroll', position)
        })        
    }
    // 3.监听上拉加载更多
    if(this.pullUpLoad){
        this.scroll.on("pullingUp", () => {
            console.log('上拉加载更多')
            //  发送网络请求，请求更多页的数据
            
            //  等数据请求完成，并且将新的数据展示出来后
        
            //     bs.finishPullUp()
            this.$emit("pullingUp")
    
        })
    }
  },
  methods: {
      scrollTo(x, y, time=300){ //es6语法 ，time如果不传，用默认值300
        this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x, y, time)
      },
      finishPullUp() {
        this.scroll && this.scroll.finishPullUp && this.scroll.finishPullUp()
      },
      refresh() {
        // console.log('------refresh------')
        this.scroll && this.scroll.refresh && this.scroll.refresh()
      },
      getScrollY() {
        return this.scroll.y ? this.scroll.y : 0
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
</style>