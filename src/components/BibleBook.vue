<template>
  <div role="tablist">
       <!-- Used Vue v-for directive to Loop through book names and create copies of outer card container --> 
    <b-card no-body class="mb-1" v-for="book in books" v-bind:key="book">
      <b-card-header header-tag="header" class="p-1" role="tab">
      <!--Used v-b-toogle with Vue dynamic argument to grab the specific id of each card.
         This ensures that only one card changes toggle state from visibile to invisible -->  
      <b-button block v-b-toggle:[book] variant="info">{{book}}</b-button>
      </b-card-header>
      <b-collapse v-bind:id="book" invisible accordion="my-accordion" role="tabpanel">
        
       <!-- Used Vue v-for directive to Loop through book names and create copies of inner card container --> 
      <b-card-body v-for="book in books" v-bind:key="book">
          <b-card-text>{{book}}</b-card-text>
        </b-card-body>
      </b-collapse>
    </b-card>

  </div>
</template>

<script>
const axios = require("axios");
  export default {
    data() {
      return {
        verses: null,
        books: [
        "Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy", 
                "Joshua","Judges", "Ruth", "1 Samuel", "2 Samuel", "1 Kings", "2 Kings", "1 Chronicles", "2 Chronicles", "Ezra", "Nehemiah", "Esther", 
                "Job", "Psalms", "Proverbs",  "Ecclesiastes", "Song of Solomon",  
                "Isaiah", "Jeremiah", "Lamentations", "Ezekiel", "Daniel",  
                "Hosea", "Joel", "Amos", "Obadiah", "Jonah", "Micah", "Nahum", "Habakkuk", "Zephaniah", "Haggai", "Zechariah", "Malachi", 
                "Matthew", "Mark", "Luke", "John", "Acts", 
                "Romans", "1 Corinthians", "2 Corinthians", "Galatians", "Ephesians", "Philippians", "Colossians", "1 Thessalonians", "2 Thessalonians", 
                "1 Timothy", "2 Timothy", "Titus", "Philemon", "Hebrews", "James", "1 Peter", "2 Peter", "1 John", "2 John", "3 John", "Jude", "Revelation",],
        

        }
    },
  created(){
      axios.get('https://api.lsm.org/recver.php?String='+'Acts 4:2'+'&Out=json')
          .then(response=> (this.verses = response.data.verses[0].text)) 
          
            
          }
    }
  

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
