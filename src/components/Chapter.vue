<template>
  <div v-show="$store.state.isChapter">
    <b-button block variant="primary" v-on:click="reloadPage()">
{{$store.state.bookname}}
    </b-button>
    <br>
    <br>
    <h3 align="left">{{$store.state.bookname +" "+$store.state.chapterNum}}</h3>
    <br>
    <p v-for="num in $store.state.verseNum" :key="num">{{num +" "+ $store.state.verseArray[num-1]}}</p>
        
    
  </div>
</template>


<script>
  export default {
    name:"Chapter",
         
mounted(){
this.$store.state.isChapter;
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
    window.location.reload()
  }
    }
  } 


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
