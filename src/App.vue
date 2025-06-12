<script>

export default {
  name: 'App',
  onMounted() {
    const gtagId = process.env.VUE_APP_GTAG;
    console.log('Google Analytics ID:', gtagId);
    console.log('NODE_ENV:', process.env.NODE_ENV);
  },
}


</script>

<template>
  <router-view></router-view>
</template>

<style>

</style>
