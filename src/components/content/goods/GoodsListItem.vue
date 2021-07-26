<template>
  <div class="goods-item" @click="itemClick">
      <!-- <a :href="gitem.link"> -->
        <!-- Vue中监听：@load=方法 -->
        <!-- <img :src="showImage" alt="" @load="imageLoad" /> -->
        <!-- 图片懒加载 -->
        <img v-lazy="showImage" alt="" @load="imageLoad" />
        <div class="goods-info">
            <p>{{gitem.title}}</p>
            <span class="price">￥59.00</span>
            <span class="collect">103</span>
        </div>
      <!-- </a> -->
  </div>


</template>

<script>
export default {
  name: 'GoodsListItem',
  props: {
      gitem: {
          type: Object,
          default() {
              return {}
          }
      }
  },
  computed: {
    showImage() {
      return this.gitem.image || this.gitem.show.img
    }
  },
  methods: {
      imageLoad() {

        //   console.log("imageLoad")
        //   PS:原生的JS监听图片是否加载完：img.onload=function(){}
        //      Vue中监听：@load=方法

        // 发送指令，给vuex（$store）或者事件总线（$bus）,然后发给首页指令，监听状态做相应的处理
        // 可跟参数

        // 对于向多个页面发指令时的处理
        // 第一种方式，通过路由判断
        if(this.$route.path.indexOf("/home")) {
          this.$bus.$emit("itemImageLoad")
        }else if(this.$route.path.indexOf("/detail")) {
          this.$bus.$emit("detailItemImageLoad")
        }

        // 第二种方式
        // 在home，当页面离开时，在deactived里，取消事件监听，
        // 这样处理后，当引用的其他页面加载完后，发出的指令不会互相影响
        this.$bus.$emit("itemImageLoad")

      },
      itemClick() {
        // console.log(this.gitem.iid)

        // params方式，需配合在映射中设置/detail//:iid
        this.$router.push("/detail/" + this.gitem.iid)

        // query方式，不用在映射中设置，可直接调
        // this.$router.push({
        //   path: '/detail',
        //   query: {
        //     iid: this.gitem.iid
        //   }
        // })
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .goods-item {
    padding-bottom: 40px;
    position: relative;
    width: 47%;
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;
    border:3px solid var(--color-tint);
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>
