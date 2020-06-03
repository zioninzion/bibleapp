<template>
  <div>
        
       <!-- Used Vue v-for directive to Loop through book names and create copies of inner card container --> 
        <b-card-body v-for="book in books" v-bind:key="book" >
          <b-card-text>{{book}}</b-card-text>
          <b-card-text>{{versetext}}</b-card-text>
        </b-card-body>

  </div>
</template>

<script>
const axios = require("axios");
  export default {
    name: "Chapter",
      props: {
        versetext: null, 
        reference: null,

      }, 
    
      //Array of Bible book names
    data () {
        return{
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
        chapters: ["50","40","27","36","34","24","21","4","31","24","22","25","29","36","10","13","10","42","150","31","12",
                    "8","66","52","5","48","12","14","3","9","1","4","7","3","3","3","2","14","4","28","16","24","21","28","16",
                    "16","13","6","6","4","4","5","3","6","4","3","1","13","5","5","3","5","1","1","1","22",],
          

          
        }
        },
    
      //Map created
      computed: {
           createBook:function () {       

            const biblebook = new Map();

    // Using loop to create a key that binds book name value with chapter total value 
      for (var i=0;  i < this.books.length(); i++){
      
        biblebook.set(this.books[i], this.chapters[i]);
        
      }
    return biblebook;
// Printing to console
          }  
},
  
  created(){
      axios.get('https://api.lsm.org/recver.php?String='+'Acts 4:2'+'&Out=json')
          .then(response=> (this.versetext= response.data.verses.text)) 
            
          }
    }
  

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
