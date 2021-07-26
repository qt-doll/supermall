<template>
     <div>  
       <nav-bar>
         <div slot="left" class="back" @click="backClick">
            <img src="~assets/img/common/back.svg" />
         </div>
         <div slot="center" class="title">
             <div v-for="(item, index) in titles" 
                    class="title-item" 
                    :class="{active: currentIndex === index}" 
                    @click="itemClick(index)">
                 {{item}}
             </div>
         </div>
       </nav-bar>
     </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar';

export default {
  name: 'DetailNavBar',
  data() {
    return {
        titles: ["商品", "参数", "评论", "推荐"],
        currentIndex: 0
    }
  },
  components: {
    NavBar
  },
  methods: {
    itemClick(index) {
        this.currentIndex = index;
        this.$emit("titleClick", index)
    },
    backClick() {
        this.$router.go(-1)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title{
    display: flex;
    font-size: 13px;
}
.title-item{
    flex: 1;
}
.active{
    color:hotpink
}
.back img{
    margin-top: 12px;;
}
</style>
