// store/index.js

import Vue from "vue";
import Vuex from "vuex";
import plan from '@/store/plan.json';

Vue.use(Vuex);

const axios = require("axios");

export default new Vuex.Store({
  state: {
    // Visibilty states
    mainView: true,
    isChapter: false,
    buttonVisible: false,
    // current book & chapter
    bookName: "",
    chapterNum: 0,
    title: "",
    // apiRequests and responses
    readingSections: {},
    asyncRequests: {},
    // data for plan and bibleBook components
    plan: plan,
    books: [
      { name: "Genesis", chapters: 50, abbrev: "Gen"},
      { name: "Exodus", chapters: 40, abbrev: "Exo"},
      { name: "Leviticus", chapters: 27, abbrev: "Lev"},
      { name: "Numbers", chapters: 36, abbrev: "Num"},
      { name: "Deuteronomy", chapters: 34, abbrev: "Deut"},
      { name: "Joshua", chapters: 24, abbrev: "Josh"},
      { name: "Judges", chapters: 21, abbrev: "Judg"},
      { name: "Ruth", chapters: 4, abbrev: "Ruth"},
      { name: "1 Samuel", chapters: 31, abbrev: "1 Sam"},
      { name: "2 Samuel", chapters: 24, abbrev: "2 Sam"},
      { name: "1 Kings", chapters: 22, abbrev: "1 Kings"},
      { name: "2 Kings", chapters: 25, abbrev: "2 Kings"},
      { name: "1 Chronicles", chapters: 29, abbrev: "1 Chron"},
      { name: "2 Chronicles", chapters: 36, abbrev: "2 Chron"},
      { name: "Ezra", chapters: 10, abbrev: "Ezra"},
      { name: "Nehemiah", chapters: 13, abbrev: "Neh"},
      { name: "Esther", chapters: 10, abbrev: "Esth"},
      { name: "Job", chapters: 42, abbrev: "Job"},
      { name: "Psalms", chapters: 150, abbrev: "Psa"},
      { name: "Proverbs", chapters: 31, abbrev: "Prov"},
      { name: "Ecclesiastes", chapters: 12, abbrev: "Eccl"},
      { name: "Song of Solomon", chapters: 8, abbrev: "SS"},
      { name: "Isaiah", chapters: 66, abbrev: "Isa"},
      { name: "Jeremiah", chapters: 52, abbrev: "Jer"},
      { name: "Lamentations", chapters: 5, abbrev: "Lam"},
      { name: "Ezekiel", chapters: 48, abbrev: "Ezek"},
      { name: "Daniel", chapters: 12, abbrev: "Dan"},
      { name: "Hosea", chapters: 14, abbrev: "Hosea"},
      { name: "Joel", chapters: 3, abbrev: "Joel"},
      { name: "Amos", chapters: 9, abbrev: "Amos"},
      { name: "Obadiah", chapters: 1, abbrev: "Oba"},
      { name: "Jonah", chapters: 4, abbrev: "Jonah"},
      { name: "Micah", chapters: 7, abbrev: "Micah"},
      { name: "Nahum", chapters: 3, abbrev: "Nahum"},
      { name: "Habakkuk", chapters: 3, abbrev: "Hab"},
      { name: "Zephaniah", chapters: 3, abbrev: "Zeph"},
      { name: "Haggai", chapters: 2, abbrev: "Hag"},
      { name: "Zechariah", chapters: 14, abbrev: "Zech"},
      { name: "Malachi", chapters: 4, abbrev: "Mal"},
      { name: "Matthew", chapters: 28, abbrev: "Matt"},
      { name: "Mark", chapters: 16, abbrev: "Mark"},
      { name: "Luke", chapters: 24, abbrev: "Luke"},
      { name: "John", chapters: 21, abbrev: "John"},
      { name: "Acts", chapters: 28, abbrev: "Acts"},
      { name: "Romans", chapters: 16, abbrev: "Rom"},
      { name: "1 Corinthians", chapters: 16, abbrev: "1 Cor"},
      { name: "2 Corinthians", chapters: 13, abbrev: "2 Cor"},
      { name: "Galatians", chapters: 6, abbrev: "Gal"},
      { name: "Ephesians", chapters: 6, abbrev: "Eph"},
      { name: "Philippians", chapters: 4, abbrev: "Phil"},
      { name: "Colossians", chapters: 4, abbrev: "Col"},
      { name: "1 Thessalonians", chapters: 5, abbrev: "1 Thes"},
      { name: "2 Thessalonians", chapters: 3, abbrev: "2 Thes"},
      { name: "1 Timothy", chapters: 6, abbrev: "1 Tim"},
      { name: "2 Timothy", chapters: 4, abbrev: "2 Tim"},
      { name: "Titus", chapters: 3, abbrev: "Titus"},
      { name: "Philemon", chapters: 1, abbrev: "Philem"},
      { name: "Hebrews", chapters: 13, abbrev: "Heb"},
      { name: "James", chapters: 5, abbrev: "James"},
      { name: "1 Peter", chapters: 5, abbrev: "1 Pet"},
      { name: "2 Peter", chapters: 3, abbrev: "2 Pet"},
      { name: "1 John", chapters: 5, abbrev: "1 John"},
      { name: "2 John", chapters: 1, abbrev: "2 John"},
      { name: "3 John", chapters: 1, abbrev: "3 John"},
      { name: "Jude", chapters: 1, abbrev: "Jude"},
      { name: "Revelation", chapters: 22, abbrev: "Rev"},
    ],
  },

  //Stores the verse requested from the Api into the verseText variable
  getters: {
    readingSections: (state) => {
      return state.readingSections;
    },
  },

  actions: {
    
    // async Break verse list sections by book & chapter then getVerses()
    // "Matt. 1; Matthew 2:4; Matt. 5:18-20; Psa. 145-146; Psalm 140:12-141:9"
    async getVerseList({commit, dispatch, state}, verseString){
      state.asyncRequests = {}

      // Split into sectons: [Matt. 1, ..., Psalm 140:12-141:9]
      var verseList = verseString.replace(/; /g, ";").split(';');
      var sectionNumber = 0
      var sectionTitle = true
      // Loop through verseList
      for (var i = 0; i < verseList.length; i++) {

        // Split by space between bookname and section
        var str = verseList[i]
        var bookName = str.substr(0, str.lastIndexOf(" "))
        var section = str.substr(str.lastIndexOf(" ") + 1, str.length);
        
        // Replace any abbreviations
        bookName = bookName.replace(/\./g, "")
        if (bookName == 'Psalm') {
          bookName = 'Psalms'
        }
        for (var j = 0; j < state.books.length; j++) {
          var book = state.books[j]
          if (bookName == book.abbrev) {
            bookName = book.name
          }
        }

        // Check if colons and dashes in section
        var countDash =  (section.match(/-/g)||[]).length;
        var countColon = (section.match(/:/g)||[]).length;

        // Initialize vars
        var chapterNum
        var start
        var end

        // John 5:12-6:10
        if (countDash == 1 && countColon == 2) {
          // Split into chapter and verse
          [chapterNum, start] = section.split("-")[0].split(':');
          dispatch("getVerses", {bookName,chapterNum,start,sectionNumber,sectionTitle});
          sectionNumber += 1;
          [chapterNum, end] = section.split("-")[1].split(':');
          start = 1
          dispatch("getVerses", {bookName,chapterNum,start,end,sectionNumber,sectionTitle});
          sectionNumber += 1
        }

        // Matt. 5:18-20
        else if (countDash == 1 && countColon == 1) {
          [chapterNum, start] = section.split("-")[0].split(':');
          end = section.split("-")[1];
          dispatch("getVerses", {bookName,chapterNum,start,end,sectionNumber,sectionTitle});
          sectionNumber -= 1;
        }

        // John 3-4
        else if (countDash == 1 && countColon == 0) {
          var chapterStart = parseInt(section.split("-")[0])
          var chapterEnd   = parseInt(section.split("-")[1])
          for (chapterNum = chapterStart; chapterNum<=chapterEnd; chapterNum++) {
            dispatch("getVerses", {bookName,chapterNum,sectionNumber}); 
            sectionNumber += 1;
          }
        }

        // Matthew 2:4;
        else if (countDash == 0 && countColon == 1) {
          [chapterNum, start] = section.split(":");
          end = start
          dispatch("getVerses", {bookName,chapterNum,start,end,sectionNumber,sectionTitle});
          sectionNumber += 1;

        }
        
        // Matt. 1
        else if (countDash == 0 && countColon == 0) {
          chapterNum = section;
          dispatch("getVerses", {bookName,chapterNum,sectionNumber});
          sectionNumber += 1;
        }
        
      }
      commit('loadVerses')

    },
    
    async getVerses({commit, state}, {bookName, chapterNum, start, end, sectionNumber, sectionTitle}) {
      
      // Set default values
      var title = ""
      if (start===undefined){
        start = 1
      }
      if (end===undefined){
        end = 176           // last possible verse Psa. 119:176
      }
      // var submitRequest = false
      if (sectionNumber===undefined){
        sectionNumber = 0
        state.readingSections = {}
        state.asyncRequests = {}
      }   

      // make sure proper integer formats
      chapterNum = parseInt(chapterNum)
      start = parseInt(start)
      end = parseInt(end)

      // Stores requested book and chapter
      state.bookName = bookName
      state.chapterNum = chapterNum

      // If section title requested (true: Genesis 1:1-26) else print Genesis 1
      if (sectionTitle == undefined){
        title = bookName + " "+chapterNum
      }
      else {
        title = bookName + " "+chapterNum+":"+start+"-"+end
      }

      console.log(bookName, chapterNum, start, end, sectionNumber, sectionTitle)

      // When a user presses the button of a chapter number this variable sets to false and hides
      // the Bible book component
      state.mainView = false;
      state.isChapter = true;
     
      //Try catch block to log and capture errors
      try {
        /*
         * Takes a specific api request to get a certain range of verses. Only 30 verses can be fetched
         * at a time. The await keyword is crucial as it allows each axios request to complete before
         * moving to the next one. Storing the requests inside an array assures the verses are printed in
         * the proper order
         */
  var asyncRequests = []
  // Make requests in sections or 30 or less verses i.e. 1-29
  var i = 0     // First request
  var next = 0  // Last verse of request
  // If next == end, we have finished looping
  while (next != end ) {
    // Select next 30 verses unless end is reached
    next = start+29
    if (next > end) {
      next = end
    }
    asyncRequests[i] = [await axios.get(
      "https://api.lsm.org/recver.php?String=" +
        bookName +
        " " +
        chapterNum +
        ":"+start+'-'+next +
        "&Out=json"), title, sectionNumber]
    title = ""
    start += 30;
    i +=1
  }
  state.asyncRequests[sectionNumber] = asyncRequests
  console.log(sectionNumber)
    commit('loadVerses')
      } catch (err) {
        state.asyncRequests[sectionNumber] = []
        console.log(err);
      }
    },
    

  },

  //Grab book name and total chapters after user clicks the Bible book button
  mutations: {
    // {} allow for mutations to return multiple parameters

    // async function to fetch the verses from an api url

    async loadVerses(state) {
      var asyncRequests = state.asyncRequests
      console.log(asyncRequests)

      for (var i = 0; i < Object.keys(asyncRequests).length; i++) {
        for (var j = 0; j < asyncRequests[i].length; j++) {
          var request = asyncRequests[i][j];
          console.log(request)

          state.title = request[1]
          state.sectionNumber = request[2]
          var verses = [];

          //The "this" keyword is not bound inside axios.then(function). Assigning this to a variable allows
          //us to refer to the "data" property
          var self = this;
     
            await Promise.all([request])
              .then(function(response) {
                state = self.state
                var data = response[0][0].data
            
            /* Some verses have a backslash character which breaks the json and causes the 
               * response variable to store the verses as a string instead of being transformed 
               * into an array object. We want to check and see if the response variable is a string. 
               * If it is then we remove any backslash characters and reparse the formatted json 
               * string into an array. Otherwise we just skip both the reformating and the parsing and just 
               * store the response array into a variable.  
            */
            // The response format is a "\[ *verse* \]" string returned for "Rom. 16:24", "Mark 9:44", and "Mark 9:46" for json parsing
          if(typeof data == "string") {
            // The replace function will look for all backslashes and replace them with nothing
            var removeSlash = data.replace(/\\/g, "").replace(/\//g, "")
            
            // The JSON.parse function will turn the json string variable into an array
            data = JSON.parse(removeSlash)
          }
          for(var k = 0; k < data.verses.length; k++){	
    
            // The replace function will look for all brakets [] and replace them with nothing excluding the three verses
            if (data.verses[k].ref !="Rom. 16:24" && data.verses[k].ref !="Mark 9:44" && data.verses[k].ref !="Mark 9:46") {
              data.verses[k].text = data.verses[k].text.replace(/\[/g, "").replace(/\]/g, "")
            }
    
            //Skips nonexistent verses
            if (data.verses[k].text.startsWith("No such verse")) {
              if (verses.length != 0) {
                state.readingSections[state.sectionNumber] = {'title':state.title, 'verses':verses}
              }
              console.log(verses)

              return
            }
    
            // Verses are stored into another array
            verses.push(data.verses[k])
          }
          if (verses.length != 0) {
                state.readingSections[state.sectionNumber] = {'title':state.title, 'verses':verses}
              console.log(verses)

          }
              })
              .catch(function(error) {
                console.log(error);
              });
            state.buttonVisible = true;
            console.log(state.readingSections)
        }
      }
    }
  },
  

});
