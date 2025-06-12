<script>

export default {
  name: 'App',
}

const gtagId = import.meta.env.VITE_GTAG
console.log('Google Analytics ID:', gtagId)
console.log('MODE:', import.meta.env.MODE)

</script>

<template>
  <router-view></router-view>
</template>

<style>

</style>
