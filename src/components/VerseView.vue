<template>
  <!--buttonVisible variable becomes true after Bible text is rendered. This
      ensures that all the buttons won't appear before the text does-->
  <div v-show="$store.state.buttonVisible" :key="componentKey">
    <b-button
      class="return_button" 
      block variant="primary" 
      v-on:click="reloadPage()">
      <i class="fa fa-angle-left" style="float:left"></i>
    </b-button>
    
    <br> 
    <div v-for="readingSection in $store.state.readingSections" :key="readingSection.id">
      <span v-if="readingSection.title != ''">
    <h3>{{readingSection.title}}</h3>
    <br>
    </span>
    <p 
      style="" 
      v-for="(verse, i) in readingSection.verses" 
      :key="i+verse.ref">
      <sup>{{verse.ref.split(':')[1]}}</sup>
      {{" "+ verse.text}}
    </p>
    </div>

    <br>
    <div v-if="$store.state.buttonVisible && $store.state.isChapter">
      <transition name ="fade">
      <b-button-toolbar 
          class="center" 
          key-nav aria-label="Toolbar with button groups">
        <b-button-group class="mx-1" 
          style="padding-right:50px;">
          <b-button 
            style="margin-right:10px;" 
            v-on:click.passive="navigate('previousBook');">&laquo;
          </b-button>
        
          <b-button 
            v-on:click.passive="navigate('previousChapter');">&lsaquo;
          </b-button>
        </b-button-group>
        
        <b-button-group class="mx-1">
          <b-button 
            style="margin-right:10px;" 
            v-on:click.passive="navigate('nextChapter');">&rsaquo;
          </b-button>
        
          <b-button 
            v-on:click.passive="navigate('nextBook');">&raquo;
          </b-button>
        </b-button-group>
      </b-button-toolbar>     
      </transition>
    </div>
  </div>
</template>


<script>
  export default {
name:"VerseView",
data() {
  return {
    componentKey: 0,
  };
},

mounted(){
  this.componentKey;
  this.$store.state.isChapter;
  this.$store.state.mainView;
},

computed:{
},
  
 methods:{

  // navigate previous or next book or chapter
  navigate(instruction) {
    var books = this.$store.state.books
    var bookName = this.$store.state.bookName
    var chapterNum = this.$store.state.chapterNum
    var index = books.findIndex(book => book.name === bookName)
    var totalChapters = books[index].chapters

    if (instruction == 'previousChapter') {
      // If not the first chapter go previous chapter
      if (chapterNum != 1) {
        chapterNum -= 1
        this.$store.dispatch("getVerses", {bookName, chapterNum})
      }
      else {
        this.navigate('previousBook')
        return
      }
    }

    if (instruction == 'nextChapter') {
      // If not the last chapter go next chapter
      if (chapterNum != totalChapters) {
        chapterNum += 1
        this.$store.dispatch("getVerses", {bookName, chapterNum})
      }
      else {
        this.navigate('nextBook')
        return
      }
    }

    if (instruction == 'previousBook') {
      // If not Genesis go to previous book
      if (bookName != 'Genesis') {
        index -= 1
        bookName = books[index].name
        chapterNum = 1
        this.$store.dispatch("getVerses", {bookName, chapterNum})
      }
      else {
        return
      }
    }
        
    if (instruction == 'nextBook') {
      // If not Revelation go to next book
      if (bookName != 'Revelation') {
        index += 1
        bookName = books[index].name
        chapterNum = 1
        this.$store.dispatch("getVerses", {bookName, chapterNum})
      }
      else {
        return
      }
    }
    this.componentKey+=1
    this.$store.state.buttonVisible=false

  },

 reloadPage(){
      this.$store.state.isChapter=false
      this.$store.state.mainView=true
      this.componentKey +=1
      this.$store.state.buttonVisible=false
	}
}
} 


</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.fade-enter-active, .fade-leave-active {
       transition: opacity 10s;
     }
     .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
       opacity: 0;
     }


.center {
  display:flex;
  justify-content:center;
  align-items:center;
  margin-bottom:10px;
}

.return_button{
  background-color:gray;
  color:white;
  border-style:none;
  height: 48px;
}

button{
  background-color:gray;
}

h3, p{
  text-align:left; margin-left:15px; margin-right:10px;
}
</style>
