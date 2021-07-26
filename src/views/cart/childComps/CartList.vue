<template>

  <div class="cart-list">
      <scroll class="content" ref="scroll">

        <cart-list-item  v-for="(item, index) in list" :product='item' :key='index' />
    
      </scroll>
  </div>

</template>

<script>
import Scroll from 'components/common/scroll/Scroll';

import CartListItem from './CartListItem'

import {mapGetters} from 'vuex'

export default {
  name: 'CartList',
  components: {
    Scroll,
    CartListItem
  },
  computed: {
    ...mapGetters({
      list: 'cartList'
    })
  },
  actived() {
      this.$refs.scroll.refresh()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cart-list{
    height: calc(100% - 44px - 49px - 40px);
}
 .content{
     height: 100%;
     overflow: hidden;
 }
</style>