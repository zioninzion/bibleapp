<template>
  <!--buttonVisible variable becomes true after Bible text is rendered. This
      ensures that all the buttons won't appear before the text does-->
  <div v-show="$store.state.buttonVisible">
    <b-button
      class="return_button" 
      block variant="primary" 
      v-on:click="reloadPage()">
      <i class="fa fa-angle-left" style="float:left"></i>
    </b-button>
    
    <br> 
    <div v-for="section in sections" :key="section.id">
      <span v-if="section.title != ''">
    <h3>{{section.title}}</h3>
    </span>
    <p 
      style="" 
      v-for="(verse, i) in section.verses" 
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
import {mapState} from 'vuex'

  export default {
  name:"VerseView",

  computed: {
    ...mapState([
      'sections'
      ])
    },

  methods:{
    // navigate previous or next book or chapter
    async navigate(instruction) {
      var books = this.$store.state.books
      var bookName = this.$store.state.bookName
      var chapterNum = this.$store.state.chapterNum
      var index = books.findIndex(book => book.name === bookName)
      var totalChapters = books[index].chapters
      var resetVerses = true

      // Set Book & Chapter depending on instruction
      // Instructions: previousChapter, previousBook, nextBook, nextChapter
      // 
      if (instruction == 'previousChapter') {
        // If not the first chapter go previous chapter
        if (chapterNum != 1) {
          chapterNum -= 1
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
        }
        else {
          return
        }
      }
      this.$store.commit('CHAPTER_SELECTED', {bookName, chapterNum})
      await this.$store.dispatch("getVerses", {bookName, chapterNum, resetVerses})
      this.$store.commit('FINISHED_LOADING_SECTION')
    },

  reloadPage(){
    this.$store.commit('RELOAD_PAGE')
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
