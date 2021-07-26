<template>
    <div class="content-box">
        <div v-for="item in topImages">
            <img :src="item" @load="imageLoad" />
        </div>
    </div>

</template>

<script>

export default {
  name: 'DetailOtherInfo',
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
      imagesLength: 0,
      counter: 0
    }
  },
  methods: {
    imageLoad() {
        // 判断是否都加载完了，全加载完了就进行一次回调
      if(++this.counter === this.imagesLength){
        // 对于轮播图来说，只要有一张图片加载完，就可以确定高度了，所以发一次事件就可以
        this.$emit("imageLoad")      
      }
    }
  },
  watch: {
      topImages() {
          this.imagesLength = this.topImages.length
      }
  }
}
</script>

<style scoped>

.content-box img{
  width: 100%;
}
</style>
