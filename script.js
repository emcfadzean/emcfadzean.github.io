// Tasks:
// - Fit viewport for mobile.
// - Button based keyboard.
// - Review async code, TAWAKI bug.
// - Failes to fetch on mobile.

// Bugs
// - Ben's iPhone SE viewport 320 x 568
// - case: word = TAWAKI
// - Pukeko, yellow k and green k. But only one k in word.
// - < three times, greys out multiple empty lines.
// - Touch in some location causes no more touches to be received.

// Upcoming Features
// - Animations
// - Share link result
// - Stats and Win lose message.
// - Touch screen keybord:
//    - unidentified bug where keyboard stops accepting input.
//    - identifiable backspace and enter keys (rather than < and >)
//    - correct letter colour overwritten

// - set word list and tiles based on number of characters in selected bird.
// - show stats on gameover
// - Pseudo randomly selected bird name form list of nz birds, apply delay to bird so cannot be randomly selected twice.
// - Add hint
// - include spaces and dashes as characters
// - Māori name where available
// - Settings: Darkmode, high contrast, feedback
// - Hardmode
// - FAQ

//import { createKeyboard } from "./setup.js";

// players current guessing position
let row = 0; // attempt
let col = 0; // letter for attempt

let gameOver = false;
let hasWon = false;

let birdIndex = null;

const bigBirdList = [
  "parera",
  "kawau",
  "whio",
  "pateke",
  "mohua",
  "kotuku",
  "kaki",
  "taranui",
  "taiko",
  "ranguru",
  "karearea",
  "kaka",
  "piwauwau",
  "kakaruai",
  "roroa",
  "hoiho",
  "kakariki",
  "parea",
  "tara iti",
  "matata",
  "tieke",
  "tawaki",
  "toroa",
  "kakapo",
  "kereru",
  "tawaki",
  "wrybill",
  "grey duck",
  "king shag",
  "blue duck",
  "pied shag",
  "buff weka",
  "reef heron",
  "brown teal",
  "yellowhead",
  "brown skua",
  "otago shag",
  "sooty tern",
  "black shag",
  "grey noddy",
  "white heron",
  "black stilt",
  "black noddy",
  "bush falcon",
  "banded rail",
  "lesser knot",
  "marsh crake",
  "fairy prion",
  "grey petrel",
  "little shag",
];
const birdList = [
  "parera",
  "pateke",
  "kotuku",
  "matata",
  "tawaki",
  "kakapo",
  "kereru",
  "tawaki",
  "petrel",
  "tomtit",
  "falcon",
  "cuckoo",
];

//const keyboard = ["QWERTYUIOP", "ASDFGHJKL", "<ZXCVBNM>"]; //backspace and enter
const validKey = "QWERTYUIOPASDFGHJKLZXCVBNM";
let word = "";
let letterOccurrence = new Map();

let height = 6; // guesses
let width = 6; // length of word

// for randomly selected bird from list.
// let bird = birdList[index].toUpperCase();
// let bOccurrence = new Map();
// let bW = 0;

window.onload = function () {
  initialize();
};

function initialize() {
  setWord();
  getStats();
  countDown();
  //set bird map
  for (let i = 0; i < word.length; i++) {
    if (letterOccurrence.has(word[i])) {
      letterOccurrence.set(word[i], letterOccurrence.get(word[i]) + 1);
    } else {
      letterOccurrence.set(word[i], 1);
    }
  }
  letterOccurrence.forEach((key) => console.log(key, letterOccurrence[key]));

  // create board
  for (let r = 0; r < height; r++) {
    let divRow = document.createElement("div");
    divRow.id = "row-" + r;
    divRow.classList.add("row");
    document.getElementById("board").appendChild(divRow);
    for (let c = 0; c < width; c++) {
      let tile = document.createElement("span");
      tile.id = r.toString() + "-" + c.toString();
      tile.classList.add("tile");
      tile.innerHTML = "";
      document.getElementById("row-" + r).appendChild(tile);
    }
  }

  // create keyboard
  createKeyboard();

  document.addEventListener("keyup", (e) => {
    playKeyboard(e);
  });
}

function createKeyboard() {
  const keyboard = ["QWERTYUIOP", "-ASDFGHJKL-", ">ZXCVBNM<"];

  for (let r = 0; r < 3; r++) {
    let keyRow = document.createElement("div");
    keyRow.id = "keyrow-" + r.toString();
    keyRow.classList.add("row");
    keyRow.classList.add("keyrow");
    document.getElementById("keyboard").appendChild(keyRow);
    for (let c of keyboard[r]) {
      let key = document.createElement("button");
      key.addEventListener("touchend", (e) => {
        playMouse(key);
      });
      key.id = c.toString();

      if (c.toString() === "-") {
        key.innerHTML = " ";
        key.classList.add("space");
        document.getElementById("keyrow-" + r.toString()).appendChild(key);
        continue;
      }

      key.classList.add("key");
      key.innerHTML = c;

      // backspace
      if (c.toString() === "<") {
        key.innerHTML = "<ion-icon name='backspace-outline'></ion-icon>";
        key.classList.add("wide");
      }
      if (c.toString() === ">") {
        key.innerHTML = "ENTER";
        key.classList.add("wide");
      }

      document.getElementById("keyrow-" + r.toString()).appendChild(key);
    }
  }
}

function playMouse(key) {
  if (gameOver) {
    return;
  }
  console.log(key.id);
  if (validKey.includes(key.id)) {
    if (col < width) {
      document.getElementById(row + "-" + col).innerText = key.id; // current tile
      col++;
    }
  } else if (key.id == "<" && col > 0) {
    col--;
    document.getElementById(row + "-" + col).innerText = ""; // current tile
  }

  if (key.id == ">" && col === width) {
    verifyWord(getUserInput());
  } else if (key.id == ">" && col < width) {
    let answer = document.getElementById("answer");
    answer.classList.add("answer");
    answer.innerText = "Need more letters.";
    setTimeout(() => {
      answer.classList.remove("answer");
      answer.innerText = "";
    }, 2500);
  }

  // loser
  if (!gameOver && row === height) {
    gameOver = true;
    let answer = document.getElementById("answer");
    answer.classList.add("answer");
    answer.innerText = word;
    updateStats();
  }
}

function playKeyboard(e) {
  if (gameOver) {
    return;
  }

  if ("KeyA" <= e.code && e.code <= "KeyZ") {
    if (col < width) {
      document.getElementById(row + "-" + col).innerText = e.key.toUpperCase(); // current tile
      col++;
    }
  } else if (e.code === "Backspace" && col > 0) {
    col--;
    document.getElementById(row + "-" + col).innerText = ""; // current tile
  }

  if (e.code === "Enter" && col === width) {
    verifyWord(getUserInput());
  } else if (e.code === "Enter" && col < width) {
    let answer = document.getElementById("answer");
    answer.classList.add("answer");
    answer.innerText = "Need more letters.";
    setTimeout(() => {
      answer.classList.remove("answer");
      answer.innerText = "";
    }, 2500);
  }

  // loser
  if (!gameOver && row === height) {
    gameOver = true;
    let answer = document.getElementById("answer");
    answer.classList.add("answer");
    answer.innerText = word;
    updateStats();
  }
}

function getUserInput() {
  let userInput = "";

  for (let c = 0; c < width; c++) {
    let currTile = document.getElementById(row + "-" + c);
    let letter = currTile.innerText;
    userInput += letter;
  }

  return userInput.toLowerCase();
}

// is the word the user has input in the wordList or nonsense
function inputValid(userInput) {
  result = false;
  verifyWord(userInput).then((data) => (result = data));
  return result;
}

// work on handling network errors.
async function verifyWord(userInput) {
  console.log(userInput);
  let apiURL = "https://api.dictionaryapi.dev/api/v2/entries/en/" + userInput;
  fetch(apiURL, { credentials: "include" })
    .then((res) => {
      console.log(birdList.includes(userInput), userInput);
      if (res.ok || birdList.includes(userInput)) {
        // update board.
        update();
        row++; // start new row
        col = 0; // first col
      } else {
        // do not update board, provide feedback.
        answer = document.getElementById("answer");
        answer.classList.add("answer");
        answer.innerText = "Not in word list.";
        setTimeout(() => {
          answer.classList.remove("answer");
          answer.innerText = "";
        }, 2500);
      }
    })
    .catch((err) => alert(err));
}

function update() {
  let correct = 0;
  let tmpOccurrence = new Map(letterOccurrence);
  for (let c = 0; c < width; c++) {
    let currTile = document.getElementById(row + "-" + c);
    let letter = currTile.innerText;
    let currKey = document.getElementById("key-" + letter);

    setTimeout(() => {
      currTile.classList.add("flip");
      if (letter === word[c]) {
        currTile.classList.add("correct");
        if (currKey.classList.length > 1) {
          currKey.classList.remove(currKey.classList[1]);
        }
        currKey.classList.add("correct");

        tmpOccurrence.set(
          String(letter),
          tmpOccurrence.get(String(letter)) - 1
        );
        correct++;
      } else if (word.includes(letter)) {
        if (tmpOccurrence.get(String(letter)) > 0) {
          currTile.classList.add("present");
          if (currKey.classList[1] == "correct") {
            // do nothing
          } else {
            currKey.classList.add("present");
          }
          tmpOccurrence.set(
            String(letter),
            tmpOccurrence.get(String(letter) - 1)
          );
        } else {
          currTile.classList.add("absent");
          currKey.classList.add("absent");
        }
      } else {
        currTile.classList.add("absent");
        currKey.classList.add("absent");
      }
    }, 500 * c);
  }
  if (correct === width) {
    gameOver = true;
    answer = document.getElementById("answer");
    answer.classList.add("answer");
    answer.innerText = "Correct";
    hasWon = true;
    updateStats();
  }
}

// intend to tidy the web that is gameOver later.

// read stats (also want to update and reset stats)
//'{"currentStreak":0,"maxStreak":1,"guesses":{"1":0,"2":0,"3":0,"4":1,"5":0,"6":0,"fail":1},"winPercentage":50,"gamesPlayed":2,"gamesWon":1,"averageGuesses":4}'

function initializeStats() {
  let keys = ["gamesPlayed", "gamesWon", "gamesLost", "guesses"];
  let guesses = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
  guesses = JSON.stringify(guesses); // needs to be json string.
  console.log(guesses);
  let values = ["0", "0", "0", guesses];
  for (let i = 0; i < keys.length; i++) {
    localStorage.setItem(keys[i], values[i]);
  }
}

function updateStats() {
  let keys = ["gamesPlayed", "gamesWon", "gamesLost", "guesses"];
  // initialise.
  if (localStorage.length == 0) {
    initializeStats();
    console.log("Initialise local storage.");
    console.log(localStorage);
  } else {
    for (let i = 0; i < localStorage.length; i++) {
      let value = localStorage.getItem(keys[i]);
      let key = keys[i];
      let content = document.getElementById(key);

      if (key == "gamesPlayed") {
        localStorage.setItem(key, parseInt(value) + 1);
        content.innerHTML += localStorage.getItem(key);
      } else if (key == "gamesWon" && hasWon) {
        localStorage.setItem(key, parseInt(value) + 1);
        content.innerHTML += localStorage.getItem(key);
      } else if (key == "gamesLost" && !hasWon) {
        localStorage.setItem(key, parseInt(value) + 1);
        content.innerHTML += localStorage.getItem(key);
      } else if (key == "guesses") {
        let guesses = JSON.parse(localStorage.getItem(key));
        console.log(guesses);
      }

      console.log(keys[i], ":", value);
    }
  }
}

function getStats() {
  let keys = ["gamesPlayed", "gamesWon", "gamesLost", "guesses"];
  // initialise.
  if (localStorage.length == 0) {
    initializeStats();
    console.log("Initialise local storage.");
    console.log(localStorage);
  } else {
    for (let i = 0; i < localStorage.length - 1; i++) {
      let value = localStorage.getItem(keys[i]);
      let content = document.getElementById(keys[i]);
      console.log(content);
      content.innerHTML =
        "Games " + keys[i].slice(5) + ": " + localStorage.getItem(keys[i]);
      console.log(keys[i], ":", value);
    }
  }
  // display stats in modal
}

function setWord() {
  let original = new Date(2022, 6, 8, 0, 0, 0, 0);
  let today = new Date();

  let difference = today.getDate() - original.getDate();
  //differenceDays = difference / (1000 * 3600 * 24);
  birdIndex = difference % birdList.length;
  word = birdList[birdIndex].toUpperCase();
  console.log(difference, word, birdList[difference]);
}

// birdle at midnight
function countDown() {
  setInterval(function time() {
    let d = new Date(); // current date
    let hours = 24 - d.getHours(); // from tomorrow
    let min = 60 - d.getMinutes();
    if ((min + "").length == 1) {
      min = "0" + min;
    }
    let sec = 60 - d.getSeconds();
    if ((sec + "").length == 1) {
      sec = "0" + sec;
    }
    document.getElementById("countdown").innerHTML =
      "Next Kiwi Birdle: " + hours + ":" + min + ":" + sec;
  });
}
