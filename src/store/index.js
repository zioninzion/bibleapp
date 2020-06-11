// store/index.js

import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const axios = require("axios");

export default new Vuex.Store({
  state: {
    isVisible: true,
    bookname: "",
    verseText: "",
    verseNum: "",
    chapterNum: 0,
    verseArray: [],
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

  getters: {
    verseText: (state) => {
      return state.verseText;
    },
  },

  mutations: {
    getBook(state, name) {
      state.bookname = name;
    },

    getVerses(state, num) {
      state.isVisible = false;
      state.chapterNum = num;

      //this is not bound inside axios.then(function). Assigning this to   a variable allows us to refer to data property
      var Text = this;
      var verseRequest1 =
        "https://api.lsm.org/recver.php?String=" +
        state.bookname +
        num +
        "&Out=json";
      var verseRequest2 =
        "https://api.lsm.org/recver.php?String=" +
        state.bookname +
        num +
        ":31-60";
      ("&Out=json");
      /*  var verseRequest3 =
        "https://api.lsm.org/recver.php?String=" +
        state.bookname +
        num +
        "&Out=json";
      var verseRequest4 =
        "https://api.lsm.org/recver.php?String=" +
        state.bookname +
        num +
        "&Out=json";
      var verseRequest5 =
        "https://api.lsm.org/recver.php?String=" +
        state.bookname +
        num +
        "&Out=json";
      //this.verseText = "Changed"
      //console.log(state.chapterNum);
      */
      axios
        .all([
          verseRequest1,
          verseRequest2,
          //verseRequest3,
          //verseRequest4,
          //verseRequest5,
        ])

        .then(
          axios.spread((...responses) => {
            const verseRequest1 = responses[0];
            const verseRequest2 = responses[1];
            //const verseRequest3 = responses[2];
            //const verseRequest4 = responses[3];
            //const verseRequest5 = responses[4];
            for (var i = 0; i < 30; i++) {
              Text.state.verseText = verseRequest1.data.verses[i].text;
              if (Text.state.verse.startsWith("No such verse")) {
                return Text.state.verseText;
              }
              state.verseArray[i] = Text.state.verseText;
              state.verseNum = +state.verseNum + 1;
              //console.log(state.verseNum);
              //console.log(verse)
              //console.log(Text.state.verseText);
            }

            for (var j = 0; j < 30; i++) {
              var k = 30;
              Text.state.verseText = verseRequest2.data.verses[j].text;
              if (Text.state.verse.startsWith("No such verse")) {
                return Text.state.verseText;
              }

              state.verseArray[k] = Text.state.verseText;
              state.verseNum = +state.verseNum + 1;
              k = k + 1;
              //console.log(state.verseNum);
              //console.log(verse)
              //console.log(Text.state.verseText);
            }
          })
        );
      /*     console.log(state.verseNum);
          console.log(state.verseArray.length);
          if (state.verseNum >= 30) {
            axios
              .get(
                "https://api.lsm.org/recver.php?String=" +
                  state.bookname +
                  num +
                  ":31-60" +
                  "&Out=json"
              )
              .then(function(response) {
                for (var j = 0; j < 30; j++) {
                  Text.state.verseText = response.data.verses[j].text;
                  state.verseArray[state.verseNum] = Text.state.verseText;

                  if (Text.state.verseText.startsWith("No such verse")) {
                    return Text.state.verseText;
                  }

                  console.log(state.verseArray[state.verseNum]);
                  state.verseNum = +state.verseNum + 1;
                  console.log(state.verseNum);
                }

                if (state.verseNum >= 60) {
                  axios
                    .get(
                      "https://api.lsm.org/recver.php?String=" +
                        state.bookname +
                        num +
                        ":61-90" +
                        "&Out=json"
                    )
                    .then(function(response) {
                      for (var k = 0; k < 30; k++) {
                        Text.state.verseText = response.data.verses[k].text;
                        state.verseArray[state.verseNum] = Text.state.verseText;

                        if (Text.state.verseText.startsWith("No such verse")) {
                          return Text.state.verseText;
                        }

                        console.log(state.verseArray[state.verseNum]);
                        state.verseNum = +state.verseNum + 1;
                        console.log(state.verseNum);
                      }

                      if (state.verseNum >= 90) {
                        axios
                          .get(
                            "https://api.lsm.org/recver.php?String=" +
                              state.bookname +
                              num +
                              ":91-120" +
                              "&Out=json"
                          )
                          .then(function(response) {
                            for (var l = 0; l < 30; l++) {
                              Text.state.verseText =
                                response.data.verses[l].text;
                              state.verseArray[state.verseNum] =
                                Text.state.verseText;

                              if (
                                Text.state.verseText.startsWith("No such verse")
                              ) {
                                return Text.state.verseText;
                              }

                              console.log(state.verseArray[state.verseNum]);
                              state.verseNum = +state.verseNum + 1;
                              console.log(state.verseNum);
                            }

                            if (state.verseNum >= 120) {
                              axios
                                .get(
                                  "https://api.lsm.org/recver.php?String=" +
                                    state.bookname +
                                    num +
                                    ":121-150" +
                                    "&Out=json"
                                )
                                .then(function(response) {
                                  for (var m = 0; m < 30; j++) {
                                    Text.state.verseText =
                                      response.data.verses[m].text;
                                    state.verseArray[state.verseNum] =
                                      Text.state.verseText;

                                    if (
                                      Text.state.verseText.startsWith(
                                        "No such verse"
                                      )
                                    ) {
                                      return Text.state.verseText;
                                    }

                                    console.log(
                                      state.verseArray[state.verseNum]
                                    );
                                    state.verseNum = +state.verseNum + 1;
                                    console.log(state.verseNum);
                                  }
                                  if (state.verseNum >= 150) {
                                    axios
                                      .get(
                                        "https://api.lsm.org/recver.php?String=" +
                                          state.bookname +
                                          num +
                                          ":151-180" +
                                          "&Out=json"
                                      )
                                      .then(function(response) {
                                        for (var n = 0; n < 30; n++) {
                                          Text.state.verseText =
                                            response.data.verses[n].text;
                                          state.verseArray[state.verseNum] =
                                            Text.state.verseText;

                                          if (
                                            Text.state.verseText.startsWith(
                                              "No such verse"
                                            )
                                          ) {
                                            return Text.state.verseText;
                                          }

                                          console.log(
                                            state.verseArray[state.verseNum]
                                          );
                                          state.verseNum = +state.verseNum + 1;
                                          console.log(state.verseNum);
                                        }
                                      }); // console.log(Text.state.verseText);
                                  }
                                }); // console.log(Text.state.verseText);
                            }
                          }); // console.log(Text.state.verseText);
                      }
                    }); // console.log(Text.state.verseText);
                }
              }); // console.log(Text.state.verseText);
          }
        });
      // return state.verseNum;
    },
    previousChapter(state, num) {
      state.chapterNum = num;

      //this is not bound inside axios.then(function). Assigning this to   a variable allows us to refer to data property
      var Text = this;

      //this.verseText = "Changed"
      //console.log(state.chapterNum);
      axios
        .get(
          "https://api.lsm.org/recver.php?String=" +
            state.bookname +
            num +
            "&Out=json"
        )

        //
        .then(function(response) {
          Text.state.verseText = response.data.verses[0].text;
          // console.log(Text.state.verseText);
          //console.log(verse)
          //    console.log(Text.state.verseText)
        });
        */
    },

    nextChapter(state, num) {
      state.chapterNum = num;

      //this is not bound inside axios.then(function). Assigning this to   a variable allows us to refer to data property
      var Text = this;

      //this.verseText = "Changed"
      ~(
        //console.log(state.chapterNum);
        axios
          .get(
            "https://api.lsm.org/recver.php?String=" +
              state.bookname +
              num +
              "&Out=json"
          )

          //
          .then(function(response) {
            Text.state.verseText = response.data.verses[0].text;
            // console.log(Text.state.verseText);
            //console.log(verse)
            //  console.log(Text.state.verseText)
          })
      );
    },
  },
  actions: {},
});
