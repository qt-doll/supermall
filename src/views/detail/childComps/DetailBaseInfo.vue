<template>
     <div v-if="Object.keys(goods).length !== 0">  
       <div class="title">{{goods.title}}</div>
       <div>其他基本数据省略</div>
     </div>
</template>

<script>
export default {
  name: 'DetailBaseInfo',
  props: {
      goods: {
          type: Object,
          default() {
              return {}
          }
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title{
    background: #f7a0c4;
    padding: 10px;
    font-size: 13px;
}
</style>
