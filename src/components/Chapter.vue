<template>
  <div v-show="$store.state.buttonVisible" :key="componentKey">
    <b-button v-cloak block variant="primary" v-on:click="reloadPage()">
{{Menu}}
    </b-button>
    <br>
    <br>
    <h3 align="left">{{currentChapter}}</h3>
    <!--Add (num, index) to avoid duplicate keys error-->
    <p v-for="(chapNumber, i) in $store.state.totalChapters" :key="i" v-on:click.passive="getVerses(chapNumber);">{{chapNumber}}</p>
    <br>
    <p v-for="(num, i) in $store.state.verseNum" :key="'num'+i">{{num +" "+ $store.state.verseArray[num-1]}}</p>
    <br>
    <br>
    <br>
    <div v-if="$store.state.buttonVisible">
    <transition name ="fade">
   <b-button-toolbar v-cloak key-nav aria-label="Toolbar with button groups">
    <b-button-group class="mx-1">
      <b-button v-on:click.passive="previousBook(returnBooks);">&laquo;</b-button>
     <b-button v-on:click.passive="previousChapter(chapterNumber);">&lsaquo;</b-button>
    </b-button-group>
    <b-button-group class="mx-1">
      <b-button v-on:click.passive="nextChapter(chapterNumber);">&rsaquo;</b-button>
      <b-button v-on:click.passive="nextBook(returnBooks);">&raquo;</b-button>
    </b-button-group>
  </b-button-toolbar>     
  </transition>
    </div>
  </div>
</template>


<script>
  export default {
    name:"Chapter",
          data() {
    return {
      componentKey: 0,
      Menu: "Main Menu",
    };
  },
mounted(){
this.componentKey;
this.$store.state.isChapter;
this.$store.state.isVisible;
this.$store.state.bookchapter.name;
this.$store.state.totalChapters;
this.$store.state.books;

},

computed:{

  
currentChapter: function(){
                  return this.$store.state.bookchapter.name + " "+this.$store.state.bookchapter.cnumber
                },
         
chapterNumber: function(){
	return this.$store.state.bookchapter.cnumber
	},

returnBooks: function(){
  return this.$store.state.bookname         
  },

},
  
 methods:{
  
  getVerses(num){


        this.$store.commit("getVerses", num);
        this.componentKey+=1 //Component id changes so that we can reload a fresh BibleBook
                                 // component that's been resetted to closed accordion view
    },
 
  previousChapter(num) { 
      if(num>1){
      num = num-1
      this.$store.commit("getVerses", num);
      this.componentKey+=1
      this.$store.state.buttonVisible=false
      }
      else{
      this.$store.commit("getVerses", num);
      this.componentKey+=1
      this.$store.state.buttonVisible=false
      }
  },


  nextChapter(num) { 
      if(num<this.$store.state.totalChapters){
      num=num+1
      this.$store.commit("getVerses", num);
      this.componentKey+=1
      this.$store.state.buttonVisible=false
      }
      else{
  
      this.$store.commit("getVerses", num);
      this.componentKey+=1
      this.$store.state.buttonVisible=false
      }
  
      
},

  previousBook(bookname){
    var index=0;
    // Get the index of the current book inside the books array
    index = this.$store.state.books.map(function(e) {
          return e.name;}).indexOf(bookname);
    var newIndex = index-1 //Grab index of previous book
    
      // Store name of previous book
    this.$store.state.bookname = this.$store.state.books[newIndex].name  
    this.$store.commit("getVerses", 1);
    this.componentKey+=1
    this.$store.state.buttonVisible=false
  },
  
  nextBook(bookname){
    var index=0;
    // Get the index of the current book inside the books array
    index = this.$store.state.books.map(function(e) {
          return e.name;}).indexOf(bookname);
    var newIndex = index+1 //Grab index of next book
    
      // Store name of previous book inside bookname variable
    this.$store.state.bookname = this.$store.state.books[newIndex].name  
    this.$store.commit("getVerses", 1);
    this.componentKey+=1
    this.$store.state.buttonVisible=false
  },

 reloadPage(){
    this.$store.state.isChapter=false
      this.$store.state.isVisible=true
      this.componentKey +=1
      this.$store.state.buttonVisible=false
  //    console.log(this.componentKey)
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
[v-cloak]{

	display: none;
}
</style>
