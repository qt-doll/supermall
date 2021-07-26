<template>

  <div v-show="isShow" class="toast">
      {{message}}
  </div>
 
</template>

<script>

export default {
  name: 'Toast',
  data() {
      return {
          message: '',
          isShow: false
      }
  },
  methods: {
      show(message="默认文字", duration=3000) {
          this.isShow = true;
          this.message = message;

            setTimeout(() => {
            this.isShow = false;
            this.message = ''
            }, duration)
      }
  }
//   props: {  // 封装了，可以换成data了
//       message: {
//           type: String,
//           default: ''
//       },
//       show: {
//           type: Boolean,
//           default: false
//       }
//   }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.toast{
    background: rgba(0,0,0,.9);
    color: #fff;
    position: fixed;
    left:50%;
    top:50%;
    padding:10px;
    transform: translate(-50%, -50%);
    z-index: 9999;
}
</style>