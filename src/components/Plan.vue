<template>
  <div>
      
    <!-- <v-touch:swipe.left="previousChapter(book.name, chapterNum)"  v-touch:swipe.right="nextChapter(book.name, chapterNum)"> 
    -->    
    <p v-for="num in $store.state.verseNum" :key="num">{{num +" "+ $store.state.verseArray[num-1]}}</p>
        
    
  </div>
</template>


<script>
  export default {
    name:"Chapter",
         
 methods:{
  

  previousChapter(num) { 
      this.$store.commit("previousChapter", num);
  },


  nextChapter(num) { 
      this.$store.commit("nextChapter", num);
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
       },

    }
  } 


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
