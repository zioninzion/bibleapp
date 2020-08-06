// store/index.js

import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const axios = require("axios");

export default new Vuex.Store({
  state: {
    isVisible: true,
    isChapter: false,
    buttonVisible: false,
    bookname: "",
    verseText: "",
    verseNum: 0,
    totalChapters: 0,
    chapterNum: 0,
    verseArray: [],
    asyncRequests: [],
    bookchapter: {},
    bookIndex: 0,
    books: [
      { name: "Genesis", chapters: 50 },
      { name: "Exodus", chapters: 40 },
      { name: "Leviticus", chapters: 27 },
      { name: "Numbers", chapters: 36 },
      { name: "Deuteronomy", chapters: 34 },
      { name: "Joshua", chapters: 24 },
      { name: "Judges", chapters: 21 },
      { name: "Ruth", chapters: 4 },
      { name: "1 Samuel", chapters: 31 },
      { name: "2 Samuel", chapters: 24 },
      { name: "1 Kings", chapters: 22 },
      { name: "2 Kings", chapters: 25 },
      { name: "1 Chronicles", chapters: 29 },
      { name: "2 Chronicles", chapters: 36 },
      { name: "Ezra", chapters: 10 },
      { name: "Nehemiah", chapters: 13 },
      { name: "Esther", chapters: 10 },
      { name: "Job", chapters: 42 },
      { name: "Psalms", chapters: 150 },
      { name: "Proverbs", chapters: 31 },
      { name: "Ecclesiastes", chapters: 12 },
      { name: "Song of Solomon", chapters: 8 },
      { name: "Isaiah", chapters: 66 },
      { name: "Jeremiah", chapters: 52 },
      { name: "Lamentations", chapters: 5 },
      { name: "Ezekiel", chapters: 48 },
      { name: "Daniel", chapters: 12 },
      { name: "Hosea", chapters: 14 },
      { name: "Joel", chapters: 3 },
      { name: "Amos", chapters: 9 },
      { name: "Obadiah", chapters: 1 },
      { name: "Jonah", chapters: 4 },
      { name: "Micah", chapters: 7 },
      { name: "Nahum", chapters: 3 },
      { name: "Habakkuk", chapters: 3 },
      { name: "Zephaniah", chapters: 3 },
      { name: "Haggai", chapters: 2 },
      { name: "Zechariah", chapters: 14 },
      { name: "Malachi", chapters: 4 },
      { name: "Matthew", chapters: 28 },
      { name: "Mark", chapters: 16 },
      { name: "Luke", chapters: 24 },
      { name: "John", chapters: 21 },
      { name: "Acts", chapters: 28 },
      { name: "Romans", chapters: 16 },
      { name: "1 Corinthians", chapters: 16 },
      { name: "2 Corinthians", chapters: 13 },
      { name: "Galatians", chapters: 6 },
      { name: "Ephesians", chapters: 6 },
      { name: "Philippians", chapters: 4 },
      { name: "Colossians", chapters: 4 },
      { name: "1 Thessalonians", chapters: 5 },
      { name: "2 Thessalonians", chapters: 3 },
      { name: "1 Timothy", chapters: 6 },
      { name: "2 Timothy", chapters: 4 },
      { name: "Titus", chapters: 3 },
      { name: "Philemon", chapters: 1 },
      { name: "Hebrews", chapters: 13 },
      { name: "James", chapters: 5 },
      { name: "1 Peter", chapters: 5 },
      { name: "2 Peter", chapters: 3 },
      { name: "1 John", chapters: 5 },
      { name: "2 John", chapters: 1 },
      { name: "3 John", chapters: 1 },
      { name: "Jude", chapters: 1 },
      { name: "Revelation", chapters: 22 },
    ],
    bookAbbr: {
      "Gen": "Genesis",
      "Exo": "Exodus",
      "Lev": "Leviticus",
      "Num": "Numbers",
      "Deut": "Deuteronomy",
      "Josh": "Joshua",
      "Judg": "Judges",
      "1 Sam": "1 Samuel",
      "2 Sam": "2 Samuel",
      "1 Chron": "1 Chronicles",
      "2 Chron": "2 Chronicles",
      "Neh": "Nehemiah",
      "Esth": "Esther",
      "Psa": "Psalms",
      "Psalm": "Psalms",
      "Prov": "Proverbs",
      "Eccl": "Ecclesiastes",
      "SS": "Song of Solomon",
      "Isa": "Isaiah",
      "Jer": "Jeremiah",
      "Lam": "Lamentations",
      "Ezek": "Ezekiel",
      "Dan": "Daniel",
      "Oba": "Obadiah",
      "Nahum": "Nahum",
      "Hab": "Habakkuk",
      "Zeph": "Zephaniah",
      "Hag": "Haggai",
      "Zech": "Zechariah",
      "Mal": "Malachi",
      "Matt": "Matthew",
      "Rom": "Romans",
      "1 Cor": "1 Corinthians",
      "2 Cor": "2 Corinthians",
      "Gal": "Galatians",
      "Eph": "Ephesians",
      "Phil": "Philippians",
      "Col": "Colossians",
      "1 Thes": "1 Thessalonians",
      "2 Thes": "2 Thessalonians",
      "1 Tim": "1 Timothy",
      "2 Tim": "2 Timothy",
      "Philem": "Philemon",
      "Heb": "Hebrews",
      "1 Pet": "1 Peter",
      "2 Pet": "2 Peter",
      "Rev": "Revelation",
    }
  },

  //Stores the verse requested from the Api into the verseText variable
  getters: {
    verseText: (state) => {
      return state.verseText;
    },
  },

  actions: {
    
    // async Break verse list sections by book & chapter then getVerses()
    // "Matt. 1; Matthew 2:4; Matt. 5:18-20; Psa. 145-146; Psalm 140:12-141:9"
    async getVerseList({commit, state}, {verseString}){
      

      // Split into sectons: [Matt. 1, ..., Psalm 140:12-141:9]
      var verseList = verseString.replace(/; /g, ";").split(';');

      // Loop through verseList
      for (var i = 0; i < verseList.length; i++) {

        // Split by space between bookname and section
        var str = verseList[i]
        var bookName = str.substr(0, str.lastIndexOf(" "))
        var section = str.substr(str.lastIndexOf(" ") + 1, str.length);
        
        // Replace any abbreviations
        bookName = bookName.replace(/\./g, "")
        if (bookName in state.bookAbbr) {
          bookName = state.bookAbbr[bookName]          
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
          commit("getVerses", {bookName,chapterNum,start});
          [chapterNum, end] = section.split("-")[1].split(':');
          start = 1
          commit("getVerses", {bookName,chapterNum,start,end});
        }

        // Matt. 5:18-20
        else if (countDash == 1 && countColon == 1) {
          [chapterNum, start] = section.split("-")[0].split(':');
          end = section.split("-")[1];
          commit("getVerses", {bookName,chapterNum,start,end});
        }

        // John 3-4
        else if (countDash == 1 && countColon == 0) {
          chapterNum = section.split("-")[0];
          commit("getVerses", {bookName,chapterNum});
          chapterNum = section.split("-")[1];
          commit("getVerses", {bookName,chapterNum});
        }

        // Matthew 2:4;
        else if (countDash == 0 && countColon == 1) {
          [chapterNum, start] = section.split(":");
          end = start
          commit("getVerses", {bookName,chapterNum,start,end});
        }
        
        // Matt. 1
        else if (countDash == 0 && countColon == 0) {
          chapterNum = section;
          commit("getVerses", {bookName,chapterNum});
        }
      }
    },
  },

  //Grab book name and total chapters after user clicks the Bible book button
  mutations: {
    // {} allow for mutations to return multiple parameters

    // async function to fetch the verses from an api url
    async getVerses(state, {bookName, chapterNum, start, end, sectionName}) {
      
      // Set default values
      if (start===undefined){
        start = 1
      }
      if (end===undefined){
        end = 176           // last possible verse Psa. 119:176
      }   
      if (sectionName===undefined){
        sectionName = false
      }   

      // make sure proper integer formats
      chapterNum = parseInt(chapterNum)
      start = parseInt(start)
      end = parseInt(end)

      // Stores requested book and chapter
      state.bookName = bookName
      state.chapterNum = chapterNum

      // If section title requested (true: Genesis 1:1-26) else print Genesis 1
      if (sectionName == false){
        state.currentSection = bookName + " "+chapterNum
      }
      else {
        state.currentSection = bookName + " "+chapterNum+":"+start+"-"+end
      }

      // When a user presses the button of a chapter number this variable sets to false and hides
      // the Bible book component
      state.isVisible = false;
      state.isChapter = true;
      
      //This variable updates inside an array and contains each requested verse
      state.verseNum = 0;

      //The "this" keyword is not bound inside axios.then(function). Assigning this to a variable allows
      //us to refer to the "data" property
      var Text = this;
     
      //Try catch block to log and capture errors
      try {
        /*
         * Takes a specific api request to get a certain range of verses. Only 30 verses can be fetched
         * at a time. The await keyword is crucial as it allows each axios request to complete before
         * moving to the next one. Storing the requests inside an array assures the verses are printed in
         * the proper order
         */
  
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
    state.asyncRequests[i] = await axios.get(
      "https://api.lsm.org/recver.php?String=" +
        bookName +
        " " +
        chapterNum +
        ":"+start+'-'+next +
        "&Out=json"
    );
    start += 30;
    i +=1
  }
      } catch (err) {
        console.log(err);
      }
      
      // Promise.all takes the requests we just made and executes them in a certain order with the
      // .then function method. The responses variable is an array that holds the data
      for (var index = 0; index < state.asyncRequests.length; index++) {
      await Promise.all([
        state.asyncRequests[index],
      ])

        .then(function(response) {
              // Cycle through each verse individually which are held in separate json arrays.
          for (var i = 0; i < response.length; i++) {
            for (var j = 0; j < 30; j++) {
      
		/* Some verses have a backslash character which breaks the json and causes the 
		     * response variable to store the verses as a string instead of being transformed 
		     * into an array object. We want to check and see if the response variable is a string. 
		     * If it is then we remove any backslash characters and reparse the formatted json 
		     * string into an array. Otherwise we just skip both the reformating and the parsing and just 
		     * store the response array into a variable.  
		*/
      // The response format is a "\[ *verse* \]" string returned for "Rom. 16:24", "Mark 9:44", and "Mark 9:46" for json parsing

		if(typeof response[i].data == "string") {
      // The replace function will look for all backslashes and replace them with nothing
      var removeSlash = response[i].data.replace(/\\/g, "").replace(/\//g, "")
			
			// The JSON.parse function will turn the json string variable into an array
			var parsed = JSON.parse(removeSlash)
			for(var k = 0; k < parsed.verses.length; k++){	

        // The replace function will look for all brakets [] and replace them with nothing excluding the three verses
        if (parsed.verses[k].ref !="Rom. 16:24" && parsed.verses[k].ref !="Mark 9:44" && parsed.verses[k].ref !="Mark 9:46") {
          parsed.verses[k].text = parsed.verses[k].text.replace(/\[/g, "").replace(/\]/g, "")
        }

        //Skips nonexistent verses
        if (parsed.verses[k].text.startsWith("No such verse")) {
          return
        }

				// Verses are stored into another array
        state.verseArray[state.verseNum] = parsed.verses[k].text;

        // If reached end of verses return
        if (state.verseNum == end) {
          return
        }
        state.verseNum += 1;
			}
		}
		
		else{
      var verseText = response[i].data.verses[j].text
      // The replace function will look for all brakets [] and replace them with nothing
      if (verseText.includes('[')) {
        verseText = verseText.replace(/\[/g, "").replace(/\]/g, "");
      } 
      Text.state.verseText = verseText;

      //Skips nonexistent verses
      if (Text.state.verseText.startsWith("No such verse")) {
        return
      }
              
			//The verse strings are stored in an array
      state.verseArray[state.verseNum] = Text.state.verseText;

      // If reached end of verses return
      if (state.verseNum == end) {
        return
      }
			state.verseNum = +state.verseNum + 1;
		}
	}
          }
        })
        .catch(function(error) {
          console.log(error);
        });
      state.buttonVisible = true;
      }
    },

  },

});
