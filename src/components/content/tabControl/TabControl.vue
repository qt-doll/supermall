<template>
   <div class="tab-control">
       <div class="tab-control-item" 
            v-for="(item,index) in titles" 
            :class="{active: index === currentIndex}" 
            @click="tabClick(index)">
           <span>{{item}}</span>
       </div>


   </div>
</template>

<script>
export default {
  name: 'TabControl',
  props: {
      titles: {
          type: Array,
          default() {
              return []
          }
      }
  },
  data() {
      return {
          currentIndex: 0
      }
  },
  methods: {
      tabClick(index) {
          this.currentIndex = index;
          this.$emit('tabClick', index)
      }
  }
}
</script>


<style scoped>
.tab-control{
    display: flex;
    text-align: center;
    font-size: 15px;
    background: #fff;
}
.tab-control-item{
    flex: 1;
    height: 40px;
    line-height: 40px;
}
.active span{
    color: #ff8198;
    /* color: var(--color-high-text) */
}
.active span{
    border-bottom: 3px solid #ff8198;
    padding: 5px;
}
</style>
