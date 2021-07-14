<template>
  <Nasa />
</template>

<script>
import Nasa from './components/Nasa.vue'

export default {
  name: 'App',
  components: {
    Nasa
  },

  setup () {
    return {}
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500&display=swap');
html {
  font-size: 14px;
  scroll-behavior: smooth;
}

body {
  margin: 0;
  background-color: white;
  letter-spacing: 1px;
}

body::-webkit-scrollbar {
  display: none;
}

#app {
  font-family: 'Playfair Display', Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  margin-bottom: 10px;
}
</style>
