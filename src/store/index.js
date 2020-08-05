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
    chapterCounts:  {
      "Genesis": 50,
      "Exodus": 40,
      "Leviticus": 27,
      "Numbers": 36,
      "Deuteronomy": 34,
      "Joshua": 24,
      "Judges": 21,
      "Ruth": 4,
      "1 Samuel": 31,
      "2 Samuel": 24,
      "1 Kings": 22,
      "2 Kings": 25,
      "1 Chronicles": 29,
      "2 Chronicles": 36,
      "Ezra": 10,
      "Nehemiah": 13,
      "Esther": 10,
      "Job": 42,
      "Psalms": 150,
      "Proverbs": 31,
      "Ecclesiastes": 12,
      "Song of Songs": 8,
      "Isaiah": 66,
      "Jeremiah": 52,
      "Lamentations": 5,
      "Ezekiel": 48,
      "Daniel": 12,
      "Hosea": 14,
      "Joel": 3,
      "Amos": 9,
      "Obadiah": 1,
      "Jonah": 4,
      "Micah": 7,
      "Nahum": 3,
      "Habakkuk": 3,
      "Zephaniah": 3,
      "Haggai": 2,
      "Zechariah": 14,
      "Malachi": 4,
      "Matthew": 28,
      "Mark": 16,
      "Luke": 24,
      "John": 21,
      "Acts": 28,
      "Romans": 16,
      "1 Corinthians": 16,
      "2 Corinthians": 13,
      "Galatians": 6,
      "Ephesians": 6,
      "Philippians": 4,
      "Colossians": 4,
      "1 Thessalonians": 5,
      "2 Thessalonians": 3,
      "1 Timothy": 6,
      "2 Timothy": 4,
      "Titus": 3,
      "Philemon": 1,
      "Hebrews": 13,
      "James": 5,
      "1 Peter": 5,
      "2 Peter": 3,
      "1 John": 5,
      "2 John": 1,
      "3 John": 1,
      "Jude": 1,
      "Revelation": 22
    },
    verseCounts: {
      "Genesis": [31,25,24,26,32,22,24,22,29,32,32,20,18,24,21,16,27,33,38,18,34,24,20,67,34,35,46,22,35,43,55,32,20,31,29,43,36,30,23,23,57,38,34,34,28,34,31,22,33,26],
      "Exodus": [22,25,22,31,23,30,25,32,35,29,10,51,22,31,27,36,16,27,25,26,36,31,33,18,40,37,21,43,46,38,18,35,23,35,35,38,29,31,43,38],
      "Leviticus": [17,16,17,35,19,30,38,36,24,20,47,8,59,57,33,34,16,30,37,27,24,33,44,23,55,46,34],
      "Numbers": [54,34,51,49,31,27,89,26,23,36,35,16,33,45,41,50,13,32,22,29,35,41,30,25,18,65,23,31,40,16,54,42,56,29,34,13],
      "Deuteronomy": [46,37,29,49,33,25,26,20,29,22,32,32,18,29,23,22,20,22,21,20,23,30,25,22,19,19,26,68,29,20,30,52,29,12],
      "Joshua": [18,24,17,24,15,27,26,35,27,43,23,24,33,15,63,10,18,28,51,9,45,34,16,33],
      "Judges": [36,23,31,24,31,40,25,35,57,18,40,15,25,20,20,31,13,31,30,48,25],
      "Ruth": [22,23,18,22],
      "1 Samuel": [28,36,21,22,12,21,17,22,27,27,15,25,23,52,35,23,58,30,24,42,15,23,29,22,44,25,12,25,11,31,13],
      "2 Samuel": [27,32,39,12,25,23,29,18,13,19,27,31,39,33,37,23,29,33,43,26,22,51,39,25],
      "1 Kings": [53,46,28,34,18,38,51,66,28,29,43,33,34,31,34,34,24,46,21,43,29,53],
      "2 Kings": [18,25,27,44,27,33,20,29,37,36,21,21,25,29,38,20,41,37,37,21,26,20,37,20,30],
      "1 Chronicles": [54,55,24,43,26,81,40,40,44,14,47,40,14,17,29,43,27,17,19,8,30,19,32,31,31,32,34,21,30],
      "2 Chronicles": [17,18,17,22,14,42,22,18,31,19,23,16,22,15,19,14,19,34,11,37,20,12,21,27,28,23,9,27,36,27,21,33,25,33,27,23],
      "Ezra": [11,70,13,24,17,22,28,36,15,44],
      "Nehemiah": [11,20,32,23,19,19,73,18,38,39,36,47,31],
      "Esther": [22,23,15,17,14,14,10,17,32,3],
      "Job": [22,13,26,21,27,30,21,22,35,22,20,25,28,22,35,22,16,21,29,29,34,30,17,25,6,14,23,28,25,31,40,22,33,37,16,33,24,41,30,24,34,17],
      "Psalms": [6,12,8,8,12,10,17,9,20,18,7,8,6,7,5,11,15,50,14,9,13,31,6,10,22,12,14,9,11,12,24,11,22,22,28,12,40,22,13,17,13,11,5,26,17,11,9,14,20,23,19,9,6,7,23,13,11,11,17,12,8,12,11,10,13,20,7,35,36,5,24,20,28,23,10,12,20,72,13,19,16,8,18,12,13,17,7,18,52,17,16,15,5,23,11,13,12,9,9,5,8,28,22,35,45,48,43,13,31,7,10,10,9,8,18,19,2,29,176,7,8,9,4,8,5,6,5,6,8,8,3,18,3,3,21,26,9,8,24,13,10,7,12,15,21,10,20,14,9,6],
      "Proverbs": [33,22,35,27,23,35,27,36,18,32,31,28,25,35,33,33,28,24,29,30,31,29,35,34,28,28,27,28,27,33,31],
      "Ecclesiastes": [18,26,22,16,20,12,29,17,18,20,10,14],
      "Song of Songs": [17,17,11,16,16,13,13,14],
      "Isaiah": [31,22,26,6,30,13,25,22,21,34,16,6,22,32,9,14,14,7,25,6,17,25,18,23,12,21,13,29,24,33,9,20,24,17,10,22,38,22,8,31,29,25,28,28,25,13,15,22,26,11,23,15,12,17,13,12,21,14,21,22,11,12,19,12,25,24],
      "Jeremiah": [19,37,25,31,31,30,34,22,26,25,23,17,27,22,21,21,27,23,15,18,14,30,40,10,38,24,22,17,32,24,40,44,26,22,19,32,21,28,18,16,18,22,13,30,5,28,7,47,39,46,64,34],
      "Lamentations": [22,22,66,22,22],
      "Ezekiel": [28,10,27,17,17,14,27,18,11,22,25,28,23,23,8,63,24,32,14,49,32,31,49,27,17,21,36,26,21,26,18,32,33,31,15,38,28,23,29,49,26,20,27,31,25,24,23,35],
      "Daniel": [21,49,30,37,31,28,28,27,27,21,45,13],
      "Hosea": [11,23,5,19,15,11,16,14,17,15,12,14,16,9],
      "Joel": [20,32,21],
      "Amos": [15,16,15,13,27,14,17,14,15],
      "Obadiah": [21],
      "Jonah": [17,10,10,11],
      "Micah": [16,13,12,13,15,16,20],
      "Nahum": [15,13,19],
      "Habakkuk": [17,20,19],
      "Zephaniah": [18,15,20],
      "Haggai": [15,23],
      "Zechariah": [21,13,10,14,11,15,14,23,17,12,17,14,9,21],
      "Malachi": [14,17,18,6],
      "Matthew": [25,23,17,25,48,34,29,34,38,42,30,50,58,36,39,28,27,35,30,34,46,46,39,51,46,75,66,20],
      "Mark": [45,28,35,41,43,56,37,38,50,52,33,44,37,72,47,20],
      "Luke": [80,52,38,44,39,49,50,56,62,42,54,59,35,35,32,31,37,43,48,47,38,71,56,53],
      "John": [51,25,36,54,47,71,53,59,41,42,57,50,38,31,27,33,26,40,42,31,25],
      "Acts": [26,47,26,37,42,15,60,40,43,48,30,25,52,28,41,40,34,28,41,38,40,30,35,27,27,32,44,31],
      "Romans": [32,29,31,25,21,23,25,39,33,21,36,21,14,23,33,27],
      "1 Corinthians": [31,16,23,21,13,20,40,13,27,33,34,31,13,40,58,24],
      "2 Corinthians": [24,17,18,18,21,18,16,24,15,18,33,21,14],
      "Galatians": [24,21,29,31,26,18],
      "Ephesians": [23,22,21,32,33,24],
      "Philippians": [30,30,21,23],
      "Colossians": [29,23,25,18],
      "1 Thessalonians": [10,20,13,18,28],
      "2 Thessalonians": [12,17,18],
      "1 Timothy": [20,15,16,16,25,21],
      "2 Timothy": [18,26,17,22],
      "Titus": [16,15,15],
      "Philemon": [25],
      "Hebrews": [14,18,19,16,14,20,28,13,28,39,40,29,25],
      "James": [27,26,18,17,20],
      "1 Peter": [25,25,22,19,14],
      "2 Peter": [21,22,18],
      "1 John": [10,29,24,21,21],
      "2 John": [13],
      "3 John": [14],
      "Jude": [25],
      "Revelation": [20,29,22,11,14,17,17,13,21,11,19,18,18,20,8,21,18,24,21,15,27,21],
    },
    bookIndex: {
      "Genesis": 0,
      "Exodus": 1,
      "Leviticus": 2,
      "Numbers": 3,
      "Deuteronomy": 4,
      "Joshua": 5,
      "Judges": 6,
      "Ruth": 7,
      "1 Samuel": 8,
      "2 Samuel": 9,
      "1 Kings": 10,
      "2 Kings": 11,
      "1 Chronicles": 12,
      "2 Chronicles": 13,
      "Ezra": 14,
      "Nehemiah": 15,
      "Esther": 16,
      "Job": 17,
      "Psalms": 18,
      "Proverbs": 19,
      "Ecclesiastes": 20,
      "Song of Solomon": 21,
      "Isaiah": 22,
      "Jeremiah": 23,
      "Lamentations": 24,
      "Ezekiel": 25,
      "Daniel": 26,
      "Hosea": 27,
      "Joel": 28,
      "Amos": 29,
      "Obadiah": 30,
      "Jonah": 31,
      "Micah": 32,
      "Nahum": 33,
      "Habakkuk": 34,
      "Zephaniah": 35,
      "Haggai": 36,
      "Zechariah": 37,
      "Malachi": 38,
      "Matthew": 39,
      "Mark": 40,
      "Luke": 41,
      "John": 42,
      "Acts": 43,
      "Romans": 44,
      "1 Corinthians": 45,
      "2 Corinthians": 46,
      "Galatians": 47,
      "Ephesians": 48,
      "Philippians": 49,
      "Colossians": 50,
      "1 Thessalonians": 51,
      "2 Thessalonians": 52,
      "1 Timothy": 53,
      "2 Timothy": 54,
      "Titus": 55,
      "Philemon": 56,
      "Hebrews": 57,
      "James": 58,
      "1 Peter": 59,
      "2 Peter": 60,
      "1 John": 61,
      "2 John": 62,
      "3 John": 63,
      "Jude": 64,
      "Revelation": 65,
    },
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
        console.log(str,',',bookName,',',section)
        
        // Replace any abbreviations
        bookName = bookName.replace(/\./g, "")
        if (bookName in state.bookAbbr) {
          bookName = state.bookAbbr[bookName]          
        }

        // Check if colons and dashes in section
        var countDash =  (section.match(/-/g)||[]).length;
        var countColon = (section.match(/:/g)||[]).length;
        console.log(str,',',bookName,',',section)
        console.log(countColon,',',countDash)
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
    async getVerses(state, {bookName, chapterNum, start, end, sectionName = false}) {
      
      if (start===undefined){
        start = 1
      }
      if (end===undefined){
        end = true
      }   

      // make sure proper integer formats
      chapterNum = parseInt(chapterNum)
      start = parseInt(start)
      if (end !== true){
        end = parseInt(end)
      }

      // Stores requested book and chapter
      state.bookName = bookName
      state.chapterNum = chapterNum
      state.totalChapters = state.chapterCounts[bookName]

      // If until end of chapter => set end to last verse of chapter
      var lastVerse = state.verseCounts[bookName][chapterNum-1]
      if (end == true || end > lastVerse){
        end = lastVerse
      }

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
         * oing to the next one. Storing the requests inside an array assures the verses are printed in
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
