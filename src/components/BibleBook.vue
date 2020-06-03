<template>
  <div role="tablist">
       <!-- Used Vue v-for directive to Loop through book names and create copies of outer card container --> 
    <b-card no-body class="mb-1" v-for="book in books" v-bind:key="book.name" :chapters="book.chapters">
      <b-card-header header-tag="header" class="p-1" role="tab">
      <!--Used v-b-toogle with Vue dynamic argument to grab the specific id of each card.
         This ensures that only one card changes toggle state from visibile to invisible -->  
      <b-button block v-b-toggle:[book.name] variant="info">{{book.name}}</b-button>
      </b-card-header>
      <b-collapse v-bind:id="book.name" invisible accordion="my-accordion" role="tabpanel">
        
       <!-- Used Vue v-for directive to Loop through book names and create copies of inner card container --> 
    <!--<div v-for="chapter in chapters" :chapters="chapters" :key="chapter">
      --> <b-card v-for="n in book.chapters" :key="n">

          
       <b-card-text> </b-card-text>
         <b-card-text>{{n}}</b-card-text>
        </b-card>
     <!-- </div> -->
        </b-collapse>
    </b-card>
  </div>
</template>


<script>
const axios = require("axios");
  export default {
    data() {
      return {
        verse: null,
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
/*      
 books: [
          "Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy",
                  "Joshua","Judges", "Ruth", "1 Samuel", "2 Samuel", "1 Kings", "2 Kings", "1 Chronicles", "2 Chronicles", "Ezra", "Nehemiah", "Esther",
                  "Job", "Psalms", "Proverbs",  "Ecclesiastes", "Song of Solomon",
                  "Isaiah", "Jeremiah", "Lamentations", "Ezekiel", "Daniel",
                  "Hosea", "Joel", "Amos", "Obadiah", "Jonah", "Micah", "Nahum", "Habakkuk", "Zephaniah", "Haggai", "Zechariah", "Malachi",
                  "Matthew", "Mark", "Luke", "John", "Acts",
                  "Romans", "1 Corinthians", "2 Corinthians", "Galatians", "Ephesians", "Philippians", "Colossians", "1 Thessalonians", "2 Thessalonians",
                  "1 Timothy", "2 Timothy", "Titus", "Philemon", "Hebrews", "James", "1 Peter", "2 Peter", "1 John", "2 John", "3 John", "Jude", "Revelation",],


                  //Array of book chapters total in string format
          chapters: [50,40,27,36,34,24,21,4,31,24,22,25,29,36,10,13,10,42,150,31,12,
                      "8","66","52","5","48","12","4,3,9,1,4,7,3,3,3,"2","14","4","28","16","24","21","28","16",
                      "16","13","6","6","4","4","5","3","6","4","3","1","13","5","5","3","5","1","1","1","22",],

*/
  chapters: ["50","40","27","36","34","24","21","4","31","24","22","25","29","36","10","13","10","42","150","31","12",
                      "8","66","52","5","48","12","14","3","9","1","4","7","3","3","3","2","14","4","28","16","24","21","28","16",
                      "16","13","6","6","4","4","5","3","6","4","3","1","13","5","5","3","5","1","1","1","22",],

      }
      },
    
  created(){
      axios.get('https://api.lsm.org/recver.php?String='+'Acts 4:2'+'&Out=json')
          .then(response=> (this.verse = response.data.verses[0].text)) 
          
            
          }
    }
  

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
