<template>
  <div id="app">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

    <!--isVisible variable ensures that either the BibleBook or the Plan components will be visible at a time-->
    <b-button 
      class="btn btn-primary btn-lg buttontab"  
      style="border-color:white; background-color:gray; border-style:groove;" 
      v-on:click="show = true" 
      v-show="$store.state.mainView">
    
      Bible
     
    </b-button>

    <b-button 
      class="btn btn-secondary btn-lg buttontab" 
      style="border-color:white; background-color:gray; border-style:groove;"
      v-on:click="show = false" 
      v-show="$store.state.mainView">
      Reading Plan
    </b-button>
 
    <!-- <transition name="fade"> -->

      <!--Use v-show instead of v-if for faster rendering-->
      <div v-show="show"><BibleBook/><VerseView/></div>
    <!-- </transition> -->

    <!-- <transition name="fade"> -->
      <div v-show="!show"><Plan/><VerseView/></div>
    <!-- </transition> -->
    
  </div>
</template>

<script>
import BibleBook from './components/BibleBook.vue'
import Plan from './components/Plan.vue'
import VerseView from './components/VerseView.vue'
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
   VerseView,
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
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.buttontab{
  width:50%;
}

</style>
