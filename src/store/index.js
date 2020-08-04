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
    verseNum: "",
    totalChapters: "",
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
  },

  //Stores the verse requested from the Api into the verseText variable
  getters: {
    verseText: (state) => {
      return state.verseText;
    },
  },

  //Grab book name and total chapters after user clicks the Bible book button
  mutations: {
     
    // {} allow for mutations to return multiple parameters
    getBook(state, {name, chapter}) {
      state.bookname=name
      state.totalChapters=chapter
    },

    // async function to fetch the verses from an api url
    async getVerses(state, num) {
      state.bookchapter = { name: "", cnumber: "" };
      
      // When a user presses the button of a chapter number this variable sets to false and hides
      // the Bible book component
      state.isVisible = false;
      state.isChapter = true;
      
      //This variable saves the chapter number that the user requested
      state.chapterNum = num;

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
	
	
	state.asyncRequests[0] = await axios.get(
          "https://api.lsm.org/recver.php?String=" +
            state.bookname +
            " " +
            num +
            ":1-30" +
            "&Out=json"
        );
        state.asyncRequests[1] = await axios.get(
          "https://api.lsm.org/recver.php?String=" +
            state.bookname +
            " " +
            num +
            ":31-60" +
            "&Out=json"
        );

        state.asyncRequests[2] = await axios.get(
          "https://api.lsm.org/recver.php?String=" +
            state.bookname +
            " " +
            num +
            ":61-90" +
            "&Out=json"
        );

        state.asyncRequests[3] = await axios.get(
          "https://api.lsm.org/recver.php?String=" +
            state.bookname +
            " " +
            num +
            ":91-120" +
            "&Out=json"
        );

        state.asyncRequests[4] = await axios.get(
          "https://api.lsm.org/recver.php?String=" +
            state.bookname +
            " " +
            num +
            ":121-150" +
            "&Out=json"
        );

        state.asyncRequests[5] = await axios.get(
          "https://api.lsm.org/recver.php?String=" +
            state.bookname +
            " " +
            num +
            ":151-180" +
            "&Out=json"
        );
      } catch (err) {
        console.log(err);
      }
      
      // Promise.all takes the requests we just made and executes them in a certain order with the
      // .then function method. The responses variable is an array that holds the data
      await Promise.all([
        state.asyncRequests[0],
        state.asyncRequests[1],
        state.asyncRequests[2],
        state.asyncRequests[3],
        state.asyncRequests[4],
        state.asyncRequests[5],
      ])

        .then(function(response) {
	state.bookchapter = { name: state.bookname, cnumber: num }; // Combines book name and total number of chapters into 									one variable
              
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

		if(typeof response[i].data == "string") 
		{
      // The replace function will look for all backslashes and replace them with nothing
      var removeSlash = response[i].data.replace(/\\/g, "").replace(/\//g, "")
			
			// The JSON.parse function will turn the json string variable into an array
			var parsed = JSON.parse(removeSlash)
			for(var k = 0; k < parsed.verses.length; k++)
			{	
        // The replace function will look for all brakets [] and replace them with nothing excluding the three verses
        if (parsed.verses[k].ref !="Rom. 16:24" && parsed.verses[k].ref !="Mark 9:44" && parsed.verses[k].ref !="Mark 9:46") {
          parsed.verses[k].text = parsed.verses[k].text.replace(/\[/g, "").replace(/\]/g, "")
        }

				// Verses are stored into another array
				state.verseArray[state.verseNum] = parsed.verses[k].text;
				//Skips nonexistent verses 
				if (parsed.verses[k].text.startsWith("No such verse")) {
					return Text.state.verseText;
        }
        state.verseNum = +state.verseNum + 1;
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
			//Skips nonexistent verses
			if (Text.state.verseText.startsWith("No such verse")) {
				return Text.state.verseText;
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
    },
  },


  actions: {},
});
