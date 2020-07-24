<template>
<div role="tablist" v-show="$store.state.isVisible" :key="componentKey">
      
<!-- Used Vue v-for directive to Loop through book names and create copies of outer card container --> 
    <b-card no-body class="mb-1 button down" v-for="book in books" :bkey="book.name" v-bind:key="book.name" :chapters="book.chapters">
      <b-card-header header-tag="header" class="p-1" role="tab"> 
      <!--Used v-b-toogle with Vue dynamic argument to grab the specific id of each card.
         This ensures that only one card changes toggle state from visibile to invisible -->  
      <b-button block v-b-toggle:[book.name] v-on:click.passive="getBook(book.name, book.chapters)" variant="info"><span>{{book.name}}</span></b-button>
      </b-card-header>
      <b-collapse v-bind:id="book.name" invisible accordion="my-accordion" role="tabpanel">
        <b-row cols="5" style="margin-left:10px;">
	<!--<b-card-group deck>-->
       <b-card style="box-shadow: 5px 10px #888888; margin-left: 1px; margin-bottom: 7px;" tabindex="0" class="chapter_menu" v-bind:id="book.name" v-for="number in book.chapters" ref="book.name" :key="number" v-on:click.passive="getVerses(number);">
         <b-card-text class="small">{{number}}</b-card-text>
         
       <!--  <b-card-text>{{$store.state.verseText}}</b-card-text> -->
        </b-card>
<!--</b-card-group>-->
	</b-row>
        </b-collapse>
    </b-card>

  </div>
</template>
  

<script>

//const axios = require("axios");
import {mapState} from 'vuex'    
  export default{
    name: "BibleBook",
      data() {
     return {
       componentKey: 0,
     };
   },

mounted(){
 this.$store.state.isVisible;
 this.$store.state.bookname;
 this.$store.state.chapterNum;
 this.$store.state.totalChapters;
},


computed: mapState({
        books: state=>state.books,
    }),

   verses() {
      return this.$store.getters.verseText
    },

methods:{
  getBook(name, chapter){
           this.$store.commit("getBook", {
               name, chapter // Allows for multiple parameters
           });
       },
      
  getVerses(num){
      
           
          this.$store.commit("getVerses", num);
          this.componentKey+=1 //Component id changes so that we can reload a fresh BibleBook 
                                // component that's been resetted to closed accordion view
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
.chapter_menu{
border-style: solid;
border-width: 2px;
height: 40px;
}

.small{
position: relative;
bottom: 15px;
}

.button {
  border-radius: 4px;
  border: none;
  text-align: center;
  transition: all 0.5s;
  margin: 5px;
}

.button span{
  display: inline-block;
  position: relative;
  transition: 0.5s;
  padding-right: 25px;
}

.button span:before {
  content: '\00bb';
  position: absolute;
  top: 0;
  right: -20px;
  transition: 0.5s;
  transform: rotate(90deg);
  right: 0;
}
.button span:after {
  cursor: pointer;
  content: '\00bb';
  opacity:0;
  position: absolute;
  top: 0;
  right: -20px;
  transition: 0.5s;
  transform: rotate(90deg);
  -webkit-transform: rotate(90deg);
  right: 0;
}



</style>
