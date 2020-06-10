<template>
  <div id="app">
  <!--<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    -->
   <Chapter/>
    <BibleBook/>
  </div>
</template>

<script>
import BibleBook from './components/BibleBook.vue'
import Chapter from './components/Chapter.vue'
export default {
  name: 'App',
  components: {
    BibleBook,
    Chapter
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
