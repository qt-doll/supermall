<template>
     <div class="bottom-bar">  
        <div class="bar-item">客服</div>
        <div class="bar-item">店铺</div>
        <div class="bar-item">收藏</div>
        <div class="bar-item" @click="addCart">加入购物车</div>
        <div class="bar-item">购买</div>
     </div>
</template>

<script>
export default {
  name: 'DetailBottomBar',
  data() {
    return {
        titles: ["商品", "参数", "评论", "推荐"],
        currentIndex: 0
    }
  },
  methods: {
    addCart() {
        this.$emit("addCart")
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bottom-bar{
    position: relative;
    /* bottom: 49px; */
    z-index: 600;
    height: 49px;
    background: rgb(159, 207, 230);
    display: flex;
}
.bar-item{
    flex: 1;
    text-align: center;
}
</style>
