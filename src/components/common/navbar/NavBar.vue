<template>
    <div class="nav-bar ignore">
        <div class="left"><slot name="left"></slot></div>
        <div class="center"><slot name="center"></slot></div>
        <div class="right"><slot name="right"></slot></div>
    </div>
</template>

<script>
export default {
  name: 'NavBar',
}
</script>

<style scoped>
  .nav-bar{
    display: flex;
    height: 44px;  /* 导航栏 一般都是44，状态栏20 */
    line-height: 44px;
    box-shadow: 0px 1px 1px rgba(230,227,227,32);
    text-align: center;
  }
  .left, .right{
      width: 60px;
  }
  .center{
      flex: 1;
  }
</style>
