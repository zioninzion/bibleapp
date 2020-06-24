<template>
<div role="tablist" v-show="$store.state.isVisible">
      
<!-- Used Vue v-for directive to Loop through book names and create copies of outer card container --> 
    <b-card no-body class="mb-1" v-for="book in books" :bkey="book.name" v-bind:key="book.name" :chapters="book.chapters">
      <b-card-header header-tag="header" class="p-1" role="tab"> 
      <!--Used v-b-toogle with Vue dynamic argument to grab the specific id of each card.
         This ensures that only one card changes toggle state from visibile to invisible -->  
      <b-button block v-b-toggle:[book.name] v-on:click.passive="getBook(book.name)" variant="info">{{book.name}}</b-button>
      </b-card-header>
      <b-collapse v-bind:id="book.name" invisible accordion="my-accordion" role="tabpanel">
       <b-card v-bind:id="book.name" v-for="number in book.chapters" ref="book.name" :key="number" v-on:click.passive="getVerses(number);">
         <b-card-text>{{number}}</b-card-text>
       <!--  <b-card-text>{{$store.state.verseText}}</b-card-text> -->
        </b-card>
        </b-collapse>
    </b-card>

  </div>
</template>
  

<script>

//const axios = require("axios");
import {mapState} from 'vuex'    
  export default{
    name: "BibleBook",


mounted(){
 this.$store.state.isVisible;
 this.$store.state.bookname;
 this.$store.state.chapterNum;
},


computed: mapState({
        books: state=>state.books,
    }),

   verses() {
      return this.$store.getters.verseText
    },

methods:{
  getBook(name){
           this.$store.commit("getBook", name);
       },
      
  getVerses(num){
      
           
          this.$store.commit("getVerses", num);
          console.log(this.$store.state.isVisible);
  }
},
    }
  


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.fade-enter-active, .fade-leave-active {
   transition: opacity .5s;
 }
 .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
   opacity: 0;
 }

</style>
