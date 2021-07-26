<template>

  <div class="check-button" :class="{check: isChecked}">
      <img src="~assets/img/cart/tick.svg" />
  </div>

</template>

<script>

export default {
  name: 'CheckButton',
  computed: {

  },
  props: {
      isChecked: {
          type: Boolean,
          default: false
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.check-button{
    background: rgb(255, 254, 255);
    border: 1px solid #999;
    border-radius: 50%;
}
.check{
    background: hotpink;
}
</style>