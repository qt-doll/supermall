<template>

    <swiper>
      <swiper-item v-for="item in banners">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imageLoad">
        </a>
      </swiper-item>
    </swiper>

</template>

<script>
import {Swiper, SwiperItem} from 'components/common/swiper';

export default {
  name: 'HomeSwiper',
  props: {
    banners: {
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
</style>
