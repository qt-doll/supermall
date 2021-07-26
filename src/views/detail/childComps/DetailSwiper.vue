<template>

    <swiper class="detial-swiper">
      <swiper-item v-for="item in topImages">
          <img :src="item" alt="" @load="imageLoad">
      </swiper-item>
    </swiper>

</template>

<script>
import {Swiper, SwiperItem} from 'components/common/swiper';

export default {
  name: 'DetailSwiper',
  props: {
    topImages: {
        type: Array,
        default() {
            return []
        }
    }
  },
  data() {
    return {
      isLoad: false
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  methods: {
    imageLoad() {
      if(!this.isLoad){
        // 对于轮播图来说，只要有一张图片加载完，就可以确定高度了，所以发一次事件就可以
        this.$emit("swiperImageLoad")
        this.isLoad = true        
      }

    }
  }
}
</script>

<style scoped>

.detial-swiper img{
    height: 230px;
}

</style>
