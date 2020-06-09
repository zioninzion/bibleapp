<template>
<div role="tablist">
<!--<Chapter :verseText="verseText"/>-->
      
<!-- Used Vue v-for directive to Loop through book names and create copies of outer card container --> 
    <b-card no-body class="mb-1" v-for="book in books" :bkey="book.name" v-bind:key="book.name" :chapters="book.chapters">
      <b-card-header header-tag="header" class="p-1" role="tab"> 
      <!--Used v-b-toogle with Vue dynamic argument to grab the specific id of each card.
         This ensures that only one card changes toggle state from visibile to invisible -->  
      <b-button block v-b-toggle:[book.name] v-on:click.passive="getBook(book.name)" variant="info">{{book.name}}</b-button>
      </b-card-header>
      <b-collapse v-bind:id="book.name" invisible accordion="my-accordion" role="tabpanel">
       <b-card v-bind:id="book.name" v-for="number in book.chapters" ref="book.name" :key="number" v-on:click.passive="getVerses(number)">
         <b-card-text>{{number}}</b-card-text>
         <b-card-text>{{}}</b-card-text>
        </b-card>
        </b-collapse>
    </b-card>

  </div>
</template>
  

<script>

//import Chapter from "./Chapter";
//const axios = require("axios");
import {mapState} from 'vuex'    

  export default{
    name: "BibleBook",

 

mounted(){
  console.log(this.$store.state.verseText);
  console.log(this.$store.getters.verseText);
  this.$store.state.bookname;
  console.log(this.$store.state.chapterNum);
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
  }
},
/*


    
 components:{
        Chapter
      },
    
 methods:{
  
    getBook(name){
        bookname = name
          console.log(bookname)
    },

  getVerses(num) {
//    this.data =[] 
      this.chapterNum = num
      
      //this is not bound inside axios.then(function). Assigning this to a variable allows us to refer to data property 
      var Text = this; 
      //this.verseText = "Changed"
        console.log(this.chapterNum) 
    axios.get('https://api.lsm.org/recver.php?String='+bookname+num+'&Out=json')
    
    // 
    .then(function(response){
        
     Text.verseText = response.data.verses[0].text       
     console.log(Text.verseText) 
            })
axios.get('https://api.lsm.org/recver.php?String='+bookname+num+':31-60'+'&Out=json')
 .then(response=> (
         verseText = response.data.verses[0].ref  
       //console.log(response.data.verses[0].ref)
           
           ))
            console.log(verseText)
            
  }

   
    
 var rcvverses=this.verse
    var rcvverses2=this.verse2
    
    var verseRef
    var verseText
    
    var i
    var j
    
    for (i=0; i<30; i++)
    {
    
    verseRef = rcvverses.data.verses[i].ref
    verseText = rcvverses.data.verses[i].text
     
    console.log (verseRef+" "+verseText)
    }

    for(j=0; j<30; j++){
              
    verseRef = rcvverses2.data.verses[j].ref
    verseText = rcvverses2.data.verses[j].text
     
    console.log (verseRef+" "+verseText)
    if (verseText.startsWtih("No such verse"))
    {
      return
    }

      
    }
    
       }
*/
    }
  


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
