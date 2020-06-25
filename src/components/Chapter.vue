<template>
  <div v-show="$store.state.isChapter" :key="componentKey">
    <b-button block variant="primary" v-on:click="reloadPage()">
{{$store.state.bookname}}
    </b-button>
    <br>
    <br>
    <h3 align="left">{{$store.state.bookname +" "+$store.state.chapterNum}}</h3>
    <br>
    <p v-for="num in $store.state.verseNum" :key="num">{{num +" "+ $store.state.verseArray[num-1]}}</p>
    <transition name ="fade">
   <b-button-toolbar key-nav aria-label="Toolbar with button groups">
    <b-button-group class="mx-1">
      <b-button>&laquo;</b-button>
      <b-button>&lsaquo;</b-button>
    </b-button-group>
    <b-button-group class="mx-1">
      <b-button>&rsaquo;</b-button>
      <b-button>&raquo;</b-button>
    </b-button-group>
  </b-button-toolbar>     
  </transition>
    
  </div>
</template>


<script>
  export default {
    name:"Chapter",
          data() {
    return {
      componentKey: 0,
    };
  },
mounted(){
  console.log(this.componentKey)
this.$store.state.isChapter;
this.$store.state.isVisible;
//this.$store.state.bookname;
},

 methods:{
  

  previousChapter(num) { 
      this.$store.commit("previousChapter", num);
  },


  nextChapter(num) { 
      this.$store.commit("nextChapter", num);
  

              

      
       },
 reloadPage(){
    this.$store.state.isChapter=false
      this.$store.state.isVisible=true
      this.componentKey +=1
  //    console.log(this.componentKey)
  }
    }
  } 


</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.fade-enter-active, .fade-leave-active {
       transition: opacity 10s;
     }
     .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
       opacity: 0;
     }
</style>
