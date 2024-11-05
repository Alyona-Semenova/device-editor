<template>
  <div id="app">
    <DevicesList/>
  </div>
</template>

<script>
import DevicesList from './views/DevicesList.vue'

export default {
  name: 'App',
  components: {
    DevicesList
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
