<template>
  <div role="tablist">
       <!-- Used Vue v-for directive to Loop through book names and create copies of outer card container --> 
    <b-card no-body class="mb-1" v-for="book in books" :bkey="book.name" v-bind:key="book.name" :chapters="book.chapters">
      <b-card-header header-tag="header" class="p-1" role="tab">
      <!--Used v-b-toogle with Vue dynamic argument to grab the specific id of each card.
         This ensures that only one card changes toggle state from visibile to invisible -->  
      <b-button block v-b-toggle:[book.name] variant="info">{{book.name}}</b-button>
      </b-card-header>
      <b-collapse v-bind:id="book.name" invisible accordion="my-accordion" role="tabpanel">
       <b-card v-bind:id="book.name" v-for="n in book.chapters" ref="book.name" :key="n" @mouseover="getVerses" v-on:click.passive="displayVerses(book.name)">
         <b-card-text>{{n}}</b-card-text>
        </b-card>
     <!-- </div> -->
        </b-collapse>
    </b-card>
  </div>
</template>


<script>
const axios = require("axios");
var bookname;
  export default {
    data() {
      return {
        verse: null,
       
        props:['bkey'],
       n: 1,  
       books: 
      [
        {name: "Genesis", chapters: 50}, 
        {name: "Exodus", chapters: 40}, 
        {name: "Leviticus", chapters: 27}, 
        {name: "Numbers", chapters: 36}, 
        {name: "Deuteronomy", chapters: 34}, 
       {name: "Joshua", chapters: 24}, 
        {name: "Judges", chapters: 21}, 
        {name: "Ruth", chapters: 4}, 
        {name: "1 Samuel", chapters: 31}, 
        {name: "2 Samuel", chapters: 24}, 
        {name: "1 Kings", chapters: 22}, 
        {name: "2 Kings", chapters: 25}, 
        {name: "1 Chronicles", chapters: 29}, 
        {name: "2 Chronicles", chapters: 36}, 
        {name: "Ezra", chapters: 10}, 
        {name: "Nehemiah", chapters: 13}, 
        {name: "Esther", chapters: 10}, 
        {name: "Job", chapters: 42}, 
        {name: "Psalms", chapters: 150}, 
        {name: "Proverbs", chapters: 31}, 
        {name: "Ecclesiastes", chapters: 12}, 
        {name: "Song of Solomon", chapters: 8}, 
        {name: "Isaiah", chapters: 66}, 
        {name: "Jeremiah", chapters: 52}, 
        {name: "Lamentations", chapters: 5}, 
        {name: "Ezekiel", chapters: 48}, 
        {name: "Daniel", chapters: 12}, 
        {name: "Hosea", chapters: 14}, 
        {name: "Joel", chapters: 3}, 
        {name: "Amos", chapters: 9}, 
        {name: "Obadiah", chapters: 1}, 
        {name: "Jonah", chapters: 4}, 
        {name: "Micah", chapters: 7}, 
        {name: "Nahum", chapters: 3}, 
        {name: "Habakkuk", chapters: 3}, 
        {name: "Zephaniah", chapters: 3}, 
        {name: "Haggai", chapters: 2}, 
        {name: "Zechariah", chapters: 14}, 
        {name: "Malachi", chapters: 4}, 
        {name: "Matthew", chapters: 28}, 
        {name: "Mark", chapters: 16}, 
        {name: "Luke", chapters: 24}, 
        {name: "John", chapters: 21}, 
        {name: "Acts", chapters: 28}, 
        {name: "Romans", chapters: 16}, 
        {name: "1 Corinthians", chapters: 16}, 
        {name: "2 Corinthians", chapters: 13}, 
        {name: "Galatians", chapters: 6}, 
        {name: "Ephesians", chapters: 6}, 
        {name: "Philippians", chapters: 4}, 
        {name: "Colossians", chapters: 4}, 
        {name: "1 Thessalonians", chapters: 5}, 
        {name: "2 Thessalonians", chapters: 3}, 
        {name: "1 Timothy", chapters: 6}, 
        {name: "2 Timothy", chapters: 4}, 
        {name: "Titus", chapters: 3}, 
        {name: "Philemon", chapters: 1}, 
        {name: "Hebrews", chapters: 13}, 
        {name: "James", chapters: 5}, 
        {name: "1 Peter", chapters: 5}, 
        {name: "2 Peter", chapters: 3}, 
        {name: "1 John", chapters: 5}, 
        {name: "2 John", chapters: 1}, 
        {name: "3 John", chapters: 1}, 
        {name: "Jude", chapters: 1}, 
        {name: "Revelation", chapters: 22} 
       
        ],


      }
      },
    

    
 methods:{
     getVerses(name) {
  axios.get('https://api.lsm.org/recver.php?String='+name+ '4:2'+'&Out=json')
             .then(response=> (this.verse = response.data.verses[0].text))
  //var myWindow = window.open("", "MsgWindow", "width=200,height=100");
  //  var bookname = myWindow.document.write("<p>This is " +name+this.verse+" I am 200px wide and 100px tall!</p>");
    var verseRef = this.verse
    bookname = name+' '+ verseRef   
    return bookname
  },

    displayVerses(){
        var myWindow = window.open("", "MsgWindow", "width=200,height=100");
       myWindow.document.write("<p>This is " +bookname+" I am 200px wide and 100px tall!</p>");
        
    }
}




/*      
methods:{
     displayVerses(name) {
               var test = this.verse
               var myWindow = window.open("", "MsgWindow", "width=200,height=100");
              myWindow.document.write("<p>This is " +name +test+"</p>");
            //return bookname
     }

  },

 mounted(){       
  axios.get('https://api.lsm.org/recver.php?String='+ this.displayVerses(name)+'4:2'+'&Out=json')
             .then(response=> (this.verse = response.data.verses[0].text))
          
     }     
*/  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
