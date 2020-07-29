<template>
<div role="tablist" v-show="$store.state.isVisible" :key="componentKey">
      
<!-- Used Vue v-for directive to Loop through book names and create copies of outer card container --> 
    <b-card no-body style="border-style:none" class="mb-1" v-for="book in books" :bkey="book.name" v-bind:key="book.name" :chapters="book.chapters">
      <b-card-header header-tag="header" style="border-style:none" class="p-1" role="tab"> 
      <!--Used v-b-toogle with Vue dynamic argument to grab the specific id of each card.
         This ensures that only one card changes toggle state from visibile to invisible -->  
      <b-button class="bible_button" block v-b-toggle:[book.name] v-on:click.passive="getBook(book.name, book.chapters)" v-on:click="rotate = !rotate" variant="info">{{book.name}} 
      <i class="caret_right fa fa-angle-right"></i>
      </b-button>
      </b-card-header>
      <b-collapse v-bind:id="book.name" style="margin-bottom:10px;" invisible accordion="my-accordion" role="tabpanel">
        <b-row cols="6" style="margin:0px;">
       <b-button tabindex="0" class="chapter_card" v-bind:id="book.name" v-for="number in book.chapters" ref="book.name" :key="number" v-on:click.passive="getVerses(number);">
         {{number}}
        </b-button>
	</b-row>
        </b-collapse>
    </b-card>

  </div>
</template>
  
<script>

import {mapState} from 'vuex'    
  export default{
    name: "BibleBook",
      data() {
     return {
       componentKey: 0,
       rotate: true,
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

.bible_button{
text-align:left;
background-color:white;
color:#696969;
border-style:none;
}

.caret_right{
float:right;

}

.small{
position: relative;
bottom: 5px;
}

.chapter_card{
background-color:white;
color:#696969; 
border-style: none;
height: 40px;
box-shadow: 5px 10px #DCDCDC; 
margin-top:5px;
margin-left:5px;
margin-bottom:5px;
margin-right:5px;
}


.rotate{
    -moz-transition: all 2s linear;
    -webkit-transition: all 2s linear;
    transition: all 2s linear;
}

.rotate.down{
    -ms-transform: rotate(180deg);
    -moz-transform: rotate(180deg);
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg);
}



</style>
