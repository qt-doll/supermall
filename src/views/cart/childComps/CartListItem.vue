<template>

  <div class="shop-item">
      <div class="chk">
          <check-button :is-checked="product.checked" @click.native="checkClick"/>
      </div>
      <div class="item-img">
          <img :src="product.image" />
      </div>
      <div class="item-right">
        <div class="item-row">{{product.title}}</div>
        <div class="item-row">￥{{product.price}}</div>
        <div class="item-row">*{{product.count}}</div>
      </div>
  </div>

</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'

export default {
  name: 'CartListItem',
  components: {
    CheckButton
  },
  computed: {

  },
  props: {
      product: {
          type: Object,
          default() {
              return {}
          }
      }
  },
  methods: {
      checkClick() {
          this.product.checked = !this.product.checked;
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.shop-item{
    padding: 10px;
    border-bottom: 1px solid #999;
    display: flex;
}
.item-row{
    background: #b4b4c2;
    margin-bottom: 3px;
}
.item-img img{
    height: 90px;
}
.item-img{
    /* flex: 1; */padding-left: 10px;
}
.item-right{
    padding-left: 10px;
}
.chk{
    display: flex;
    width: 20px;
    justify-content: center;
    align-items: center;
}
/* .chk{flex: 1;} */
/* .item-right{
    flex: 1;
} */
</style>