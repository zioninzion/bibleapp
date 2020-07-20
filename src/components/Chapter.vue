<template>
  <div v-show="$store.state.isChapter" :key="componentKey">
    <b-button block variant="primary" v-on:click="reloadPage()">
{{$store.state.bookname}}
    </b-button>
    <br>
    <br>
    <h3 align="left">{{currentChapter}}</h3>
    <br>
    <p v-for="num in $store.state.verseNum" :key="num">{{num +" "+ $store.state.verseArray[num-1]}}</p>
    <br>
    <br>
    <br>
    <div v-if="$store.state.buttonVisible">
    <transition name ="fade">
   <b-button-toolbar v-cloak key-nav aria-label="Toolbar with button groups">
    <b-button-group class="mx-1">
      <b-button>&laquo;</b-button>
     <b-button v-on:click.passive="previousChapter(chapterNumber);">&lsaquo;</b-button>
    </b-button-group>
    <b-button-group class="mx-1">
      <b-button v-on:click.passive="nextChapter(chapterNumber);">&rsaquo;</b-button>
      <b-button>&raquo;</b-button>
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
    };
  },
mounted(){
  console.log(this.componentKey)
this.$store.state.isChapter;
this.$store.state.isVisible;
this.$store.state.bookchapter.name;
console.log("Total chapters are " +this.$store.state.totalChapters)

//this.$store.state.bookname;

},

computed:{
currentChapter: function(){
                  return this.$store.state.bookchapter.name + " "+this.$store.state.bookchapter.cnumber
                },
         
chapterNumber: function(){
	return this.$store.state.bookchapter.cnumber
	},
},
 methods:{
  

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
      console.log("Total chapters are "+this.$store.totalChapters)
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
