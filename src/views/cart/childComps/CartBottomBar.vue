<template>

  <div class="bottom-bar">
      <div class="chk-box">
          <div class="chk"><check-button :is-checked="isAllCheck" @click.native="allCheckClick" /></div>
          <span>全选</span>
      </div>

      <div class="cart-total">合计:{{totalPrice}}</div>

      <div class="submit-cart" @click="submit">去结算({{checkLength}})</div>
  </div>

</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'
import {mapGetters} from 'vuex'

export default {
  name: 'CartBottomBar',
  data() {
      return {
       
      }
  },
  components: {
      CheckButton
  },
  computed: {
    //  第一种方式
    //   totalPrice() {
    //       return '￥' + this.$store.getters.cartList.filter(item => {
    //           return item.checked === true
    //       }).reduce((preVal, item) => {
    //           return preVal + item.price * item.count
    //       }, 0).toFixed(2)
    //   },
    //   checkLength() {
    //       return this.$store.getters.cartList.filter(item => {
    //           return item.checked === true
    //       }).length
    //   }

    // 第二种方式
      ...mapGetters(['cartList']),
      totalPrice() {
          return '￥' + this.cartList.filter(item => {
              return item.checked === true
          }).reduce((preVal, item) => {
              return preVal + item.price * item.count
          }, 0).toFixed(2)
      },
      checkLength() {
          return this.cartList.filter(item => {
              return item.checked === true
          }).length
      },

      ////////////////////////////////////
      isAllCheck() {

        // 注意为0的情况
          if(this.cartList.length === 0) return false

        //   第一种
        //   return !(this.cartList.filter(item => !item.checked).length)

        // 第二种
        // find找到第一个停止了，很性能来说，find更合适些
          return !this.cartList.find(item => !item.checked)

        // 第三种
        // for(let item of this.cartList){
        //     if(!item.checked){
        //         return false
        //     }
        // }
        // return true

      }


  },
  methods: {
      allCheckClick() {
        //   第一种
          if(this.isAllCheck) {
            // this.cartList.map(item => {
            //     item.checked = false
            // })  
            this.cartList.forEach(item => item.checked = false);            
          }else{
            this.cartList.map(item => {
                item.checked = true
            })
          }

        // PS:这里不能做简化，因为改item.checked的值时，isAllCheck也在改变，所以值会混乱
        // this.cartList.forEach(item => item.checked = !this.isAllCheck);
          

      },
      submit() {
        if(!this.isAllCheck){
          this.$toast.show("请选择商品")
        }
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bottom-bar{
    height: 40px;
    background: indianred;
    /* padding:5px 10px; */
    align-items: center;
    display: flex;
}
.chk{
    width: 20px;
    height: 20px;
    margin-right: 5px;
}
.chk-box{
    width:60px;display: flex;
}
.cart-total{
    padding-left:30px;
    flex: 1;
}
.submit-cart{
    background: chocolate;
    width: 80px;
    text-align: center;height: 40px;line-height: 40px;
}
</style>