<template>
  <div id="app">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <b-button class="btn btn-primary btn-lg buttontab"  style="border-color:white; background-color:gray; border-style:groove;" v-on:click="show = true" v-show="$store.state.isVisible">
    Bible
     
    </b-button>

    <b-button class="btn btn-secondary btn-lg buttontab" style="border-color:white; background-color:gray; border-style:groove;" v-on:click="show = false" v-show="$store.state.isVisible">
    Plan
     </b-button>
 <transition name="fade">

    <!--Use v-show instead of v-if for faster rendering-->
    <div v-show="show==true"><BibleBook/><Chapter/></div>
 </transition>
 <transition name="fade">
<div v-show="show==false"><Plan/><Chapter/></div>

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
