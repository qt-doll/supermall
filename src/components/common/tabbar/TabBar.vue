<template>
    <div id="tab-bar">
        <slot/>
    </div>
</template>

<script>
export default {
  name: 'TabBar',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #tab-bar{
    display: flex;
    background: #f6f6f6;
    position: fixed;
    left: 0;
    right: 0;bottom: 0;
    box-shadow: 0px -2px 1px rgba(0,0,0,.5);
  }
</style>
