<template>
  <!--buttonVisible variable becomes true after Bible text is rendered. This
      ensures that all the buttons won't appear before the text does-->
  <div v-show="$store.state.buttonVisible" :key="componentKey">
    <b-button
      class="chapter_button" 
      block variant="primary" 
      v-on:click="reloadPage()">
      <i class="fa fa-angle-left" style="float:left"></i>
        {{$store.state.bookchapter.name}}
    </b-button>
    
    <br>
    <br>
    
    <h3>{{currentChapter}}</h3>
    

    <!--Added (num, index) to avoid duplicate keys error-->
    <br>   
    <p 
      style="" 
      v-for="(num, i) in $store.state.verseNum" 
      :key="'num'+i">
      <sup>{{num}}</sup>
      {{" "+ $store.state.verseArray[num-1]}}
    </p>
    
    <br>
    <div v-if="$store.state.buttonVisible">
      <transition name ="fade">
        <b-button-toolbar 
          class="center" 
          key-nav aria-label="Toolbar with button groups">
        <b-button-group 
          class="mx-1" 
          style="padding-right:50px;">
          <b-button 
            style="margin-right:10px;" 
            v-on:click.passive="previousBook(returnBooks);">&laquo;
          </b-button>
        
          <b-button 
            v-on:click.passive="previousChapter(chapterNumber);">&lsaquo;
          </b-button>
        </b-button-group>
        
        <b-button-group class="mx-1">
          <b-button 
            style="margin-right:10px;" 
            v-on:click.passive="nextChapter(chapterNumber);">&rsaquo;
          </b-button>
        
        <b-button 
          v-on:click.passive="nextBook(returnBooks);">&raquo;
        </b-button>
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
    // Get the index of the current book inside the books array
    var index = this.$store.state.books.map(function(e) {
          return e.name;}).indexOf(bookname);
    var newIndex = "";
    
    if(index >0){
      newIndex = index-1 //Grab index of previous book
    
      // Store name of previous book
      this.$store.state.bookname = this.$store.state.books[newIndex].name  
      this.$store.commit("getVerses", 1);
      this.componentKey+=1
      this.$store.state.buttonVisible=false
    }
    
    else{

        // If index is 0 go to last index of array 
      this.$store.state.bookname = this.$store.state.books[this.$store.state.books.length-1].name
      this.$store.commit("getVerses", 1);
      this.componentKey+=1
      this.$store.state.buttonVisible=false
    }
  },
  
  nextBook(bookname){
    var index=0;
    // Get the index of the current book inside the books array
    index = this.$store.state.books.map(function(e) {
          return e.name;}).indexOf(bookname);
    var newIndex = "";
    
    if(index<this.$store.state.books.length-1)
    {
      newIndex = index+1 //Grab index of next book
    
      // Store name of next book inside bookname variable
      this.$store.state.bookname = this.$store.state.books[newIndex].name  
      this.$store.commit("getVerses", 1);
      this.componentKey+=1
      this.$store.state.buttonVisible=false
    }
    
    else{

          // If index is last element in the array go to the beginning of the array
       this.$store.state.bookname = this.$store.state.books[0].name
       this.$store.commit("getVerses", 1);
       this.componentKey+=1
       this.$store.state.buttonVisible=false

    }
  },

 reloadPage(){
      this.$store.state.isChapter=false
      this.$store.state.isVisible=true
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

.chapter_button{
  background-color:gray;
  color:white;
  border-style:none;
}

button{
  background-color:gray;
}

h3, p{
  text-align:left; margin-left:15px; margin-right:10px;
}
</style>
