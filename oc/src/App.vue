<template>
  <div id="app" data-time='05-29 20:15'>
    <router-view/>
    <!-- <div id="bt">123456789900976524572</div> -->
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
html{
  height: 100%;
}
body{
  height: 100%;
  font-size: 14px;
}
#app{
  height: 100%;
  display: flex;
}
  /* html,body,#app{
    height: 100%;
    width: 100%;
    font-size: 14px;
  } */
#app{
  min-width: 1280px;
}

</style>
