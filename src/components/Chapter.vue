<template>
  <div>
      <b-button block>{{book.name}}</b-button>
     <v-touch:swipe.left="previousChapter(book.name, n)"  v-touch:swipe.right="nextChapter(book.name, n)"> 
         <p>{{n}}</p>
    
        
    
  </div>
</template>


<script>
const axios = require("axios");
    var verseText;
var bookname;
  export default {
    name:"Chapter",
    data() {
      return {
       
        props: {
          books: Array
        }

      }
      },
    

    
 methods:{
  

  nextChapter(name, num) { 
    axios.get('https://api.lsm.org/recver.php?String='+bookname+num+'&Out=json')
    .then(function(response){
     verseText = response.data.verses[0].text       
        console.log(verseText)                 
            })
            console.log(verseText)
  },


  nextChapter(name, num) { 
    axios.get('https://api.lsm.org/recver.php?String='+bookname+num+'&Out=json')
    .then(function(response){
     verseText = response.data.verses[0].text       
        console.log(verseText)                 
            })
            console.log(verseText)
   /* 
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
    */
       }

    }
  } 


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
