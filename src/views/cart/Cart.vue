<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <!-- <div slot="center">购物车({{cartLength}})</div> -->
      <div slot="center">购物车({{length}})</div>
    </nav-bar>

    <cart-list/>

    <cart-bottom-bar/>

  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar';

import CartList from './childComps/CartList';
import CartBottomBar from './childComps/CartBottomBar.vue';

import {mapGetters} from 'vuex'


export default {
  name: 'Cart',
  components: {
    NavBar,
    CartList,
    CartBottomBar
  },
  computed: {
    // cartLength() {
    //   return this.$store.getters.cartLength
    // }
    // 两种语法
    // ...mapGetters(['cartLength', 'cartList'])
    ...mapGetters({
      length: 'cartLength'
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cart{
    height: 100vh;
}
.nav-bar{
  background:#ff8198;
  /* background: var(--color-tint); */
  color:#fff;
  position: relative;
    z-index: 99;
} 
</style>