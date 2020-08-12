<template>
  <div v-show="$store.state.mainView">
       <!-- v-if="day.date < currentDate" -->
      
    <div 
      v-for="day in days" :key="day.id">
       <div class="row" @click="getVerses(day.verses)">
          <div class="date">
            <div class="date-header">{{day.date.toLocaleString('default', { month: 'long' })}}</div>
            <span>{{day.date.getDate()}}</span>
          </div>

          <span class="column">
            <span id="Day">{{day.date.toLocaleDateString('default', { weekday: 'long' })}}</span>
            <span id="Reading">{{day.verses}}</span>
          </span>
        <i class="caret_right fa fa-angle-right"></i>
        </div>
    </div>
    
  </div>
</template>


<script>
  export default {
name:"Plan",
data() {
  return {
    days: 0,
  };
},
mounted() { 
  this.loadPlans();
  this.$store.state.plan;

},

methods:{
  loadPlans()  {
    var key = Object.keys(this.$store.state.plan)[0]
    var verseList = this.$store.state.plan[key];
    
    var days = []

    var startDate = new Date(key);
    var nextDate = startDate;
    for (var i = 0; i < verseList.length; i++) {
      var date = new Date(nextDate);
      days.push({'date':date, 'verses':verseList[i]});
      nextDate.setDate(nextDate.getDate() + 1);
    }
    this.days = days;
  },
  getVerses(verseList){          
          this.$store.state.readingSections = []
          this.$store.state.asyncRequests = {}
          this.$store.dispatch("getVerseList", verseList);
          this.componentKey+=1 //Component id changes so that we can reload a fresh BibleBook 
                                // component that's been resetted to closed accordion view
          
  }
},

  } 


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.row {
  position: relative;
  display: flex;
  width: 100%;
  background-color: white;
  transition: all 0.2s linear;
  text-align: left;
  font-size: 20px;
  margin-left: 0px;
  padding: 10px 0px 10px 0px;
}
img {
  width: 30px;
  height: 30px;
  position: absolute;
  right: 1rem;
  top: 1em;
}
.date {
  background-color: white;
  margin: 5px 10px;
  width: 52px;
  height: 52px;
  border: 1px solid #ef9a9a;
  border-radius: 4px;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.25),
    -1px -1px 1px 1px rgba(0, 0, 0, 0.22);
  text-align: center;
  overflow: hidden;
  justify-content: center;
}
.date-header {
  color: #d32f2f;
  text-align: center;
  font-size: 9px;
  font-weight: 600;
  border-bottom: 1px solid #ef9a9a;
  background-color: #ffebee;
  padding: 5px 0;
}
.date span {
  font-family: "Times New Roman";
}
.column {
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  padding: 0;
  overflow: hidden;
}
#Day {
  font-size: 1.5rem;
}
#Reading {
  font-size: 1rem;
}

.caret_right {
  width: 30px;
  height: 30px;
  position: absolute;
  right: 1rem;
  top: 1.5em;
}

</style>
