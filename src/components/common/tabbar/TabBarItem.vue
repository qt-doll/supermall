<template>
    <!-- <div>
        <div class="tab-bar-item">
            <img src="../../assets/img/tabbar/home.png" />
            <div class="item-name">首页</div>
        </div>
        <div class="tab-bar-item">
            <img src="../../assets/img/tabbar/category.png" />
            <div class="item-name">分类</div>
        </div>
        <div class="tab-bar-item">
            <img src="../../assets/img/tabbar/cart.png" />
            <div class="item-name">购物车</div>
        </div>
        <div class="tab-bar-item">
            <img src="../../assets/img/tabbar/profile.png" />
            <div class="item-name">我</div>
        </div>
    </div> -->

    <div class="tab-bar-item" @click="itemClick">
        <div v-if="!isActive">
            <slot name="item-icon"></slot>
        </div>
        <div v-else>
            <slot name="item-icon-active"></slot>
        </div>
        <!-- <div :class="{acitve: isActive}">
            <slot name="item-text"></slot>
        </div>         -->

        <div :style="activeStyle">
            <slot name="item-text"></slot>
        </div>        
    </div>
</template>

<script>
export default {
  name: 'TabBarItem',
  props: {
      path: String,
      activeColor: {
          type: String,
          default: "#f00"
      }
  },
  data() {
      return{
        //   isActive: false
      }
  },
  computed: {
      isActive() {
          return this.$route.path.indexOf(this.path) !== -1
      },
      activeStyle() {
          return this.isActive ? {color: this.activeColor} : {}
      }
  },
  methods:{
      itemClick(){
        // console.log(this.path);
        this.$router.replace(this.path)
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .tab-bar-item{
    flex: 1;
    text-align:center;
    height: 49px; /*PS：移动端 开发tabbar，高度一般为49 */
    font-size: 14px;;
  }
  .tab-bar-item img{
      width:24px;
      height: 24px;
      margin-top: 3px;
      vertical-align: middle;
  }
  /* .acitve{
      color: #f00;
  } */
</style>
