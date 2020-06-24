<template>
  <div id="app">
  <!--<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    -->
    <b-button v-on:click="show = true" v-show="$store.state.isVisible">
    Bible
     
    </b-button>

    <b-button v-on:click="show = false" v-show="$store.state.isVisible">
    Plan
     </b-button>
  <transition name="fade">
    <p v-if="show==true"><BibleBook/><Chapter/></p>
    <p v-else-if="show==false"><Plan/><Chapter/></p>
  </transition>
  </div>
</template>

<script>
import BibleBook from './components/BibleBook.vue'
import Plan from './components/Plan.vue'
import Chapter from './components/Chapter.vue'
export default {
  name: 'App',
  data:function(){
    return{
    show: true
    }
  },
  components: {
   BibleBook,
   Plan,
   Chapter,
  },
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

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}


}
</style>
