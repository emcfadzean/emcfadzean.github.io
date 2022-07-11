// Upcoming Features
// - touch screen keybord
// - random bird selection on index from today's date
// - set word list and tiles based on number of characters in selected bird.
// - Stats and Win lose message.
// - show stats on gameover
// - Timer, new birdle at 10:00am each day
// - Pseudo randomly selected bird name form list of nz birds, apply delay to bird so cannot be randomly selected twice.
// - Add hint
// - include spaces and dashes as characters
// - Māori name where available
// - Settings: Darkmode, high contrast, feedback
// - Animations
// - Available online
// - Share link result
// - Hardmode
// - FAQ

// Fixes

// players current guessing position
let row = 0; // attempt
let col = 0; // letter for attempt

let gameOver = false;
let hasWon = false;

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
];
const index = Math.floor(Math.random() * birdList.length);
const sixLetterWordList = new Set([
  "abroad",
  "absorb",
  "accept",
  "access",
  "accuse",
  "across",
  "action",
  "active",
  "actual",
  "adjust",
  "admire",
  "advice",
  "advise",
  "affair",
  "affect",
  "afford",
  "afraid",
  "agency",
  "agenda",
  "almost",
  "always",
  "amount",
  "animal",
  "annual",
  "answer",
  "anyone",
  "anyway",
  "appeal",
  "appear",
  "around",
  "arrest",
  "arrive",
  "artist",
  "asleep",
  "aspect",
  "assert",
  "assess",
  "assign",
  "assist",
  "assume",
  "assure",
  "attach",
  "attack",
  "attend",
  "author",
  "barely",
  "barrel",
  "basket",
  "battle",
  "beauty",
  "become",
  "before",
  "behind",
  "belief",
  "belong",
  "beside",
  "better",
  "beyond",
  "border",
  "borrow",
  "bother",
  "bottle",
  "bottom",
  "branch",
  "breast",
  "breath",
  "bridge",
  "bright",
  "broken",
  "budget",
  "bullet",
  "burden",
  "butter",
  "button",
  "camera",
  "campus",
  "cancer",
  "carbon",
  "career",
  "center",
  "chance",
  "change",
  "charge",
  "cheese",
  "choice",
  "choose",
  "church",
  "circle",
  "client",
  "clinic",
  "closer",
  "coffee",
  "column",
  "comedy",
  "commit",
  "common",
  "cookie",
  "corner",
  "cotton",
  "county",
  "couple",
  "course",
  "cousin",
  "create",
  "credit",
  "crisis",
  "critic",
  "custom",
  "damage",
  "danger",
  "dealer",
  "debate",
  "decade",
  "decide",
  "deeply",
  "defeat",
  "defend",
  "define",
  "degree",
  "demand",
  "depend",
  "depict",
  "deputy",
  "derive",
  "desert",
  "design",
  "desire",
  "detail",
  "detect",
  "device",
  "devote",
  "differ",
  "dining",
  "dinner",
  "direct",
  "divide",
  "doctor",
  "double",
  "driver",
  "during",
  "easily",
  "editor",
  "effect",
  "effort",
  "either",
  "e-mail",
  "emerge",
  "employ",
  "enable",
  "energy",
  "engage",
  "engine",
  "enough",
  "ensure",
  "entire",
  "escape",
  "estate",
  "ethics",
  "ethnic",
  "evolve",
  "exceed",
  "except",
  "expand",
  "expect",
  "expert",
  "expose",
  "extend",
  "extent",
  "fabric",
  "factor",
  "fairly",
  "family",
  "famous",
  "farmer",
  "father",
  "fellow",
  "female",
  "figure",
  "finger",
  "finish",
  "flavor",
  "flight",
  "flower",
  "follow",
  "forest",
  "forget",
  "formal",
  "former",
  "fourth",
  "freeze",
  "French",
  "friend",
  "future",
  "galaxy",
  "garage",
  "garden",
  "garlic",
  "gather",
  "gender",
  "gently",
  "German",
  "gifted",
  "glance",
  "global",
  "golden",
  "ground",
  "growth",
  "guilty",
  "handle",
  "happen",
  "hardly",
  "health",
  "heaven",
  "height",
  "highly",
  "honest",
  "horror",
  "hungry",
  "hunter",
  "ignore",
  "impact",
  "impose",
  "income",
  "indeed",
  "Indian",
  "infant",
  "inform",
  "injury",
  "inside",
  "insist",
  "intend",
  "invest",
  "invite",
  "island",
  "itself",
  "jacket",
  "Jewish",
  "junior",
  "killer",
  "latter",
  "launch",
  "lawyer",
  "leader",
  "league",
  "legacy",
  "legend",
  "length",
  "lesson",
  "letter",
  "likely",
  "listen",
  "little",
  "living",
  "locate",
  "lovely",
  "mainly",
  "makeup",
  "manage",
  "manner",
  "margin",
  "market",
  "master",
  "matter",
  "medium",
  "member",
  "memory",
  "mental",
  "merely",
  "method",
  "middle",
  "minute",
  "mirror",
  "mm-hmm",
  "modern",
  "modest",
  "moment",
  "mostly",
  "mother",
  "motion",
  "murder",
  "muscle",
  "museum",
  "Muslim",
  "mutual",
  "myself",
  "narrow",
  "nation",
  "native",
  "nature",
  "nearby",
  "nearly",
  "nobody",
  "normal",
  "notice",
  "notion",
  "number",
  "object",
  "obtain",
  "occupy",
  "office",
  "online",
  "oppose",
  "option",
  "orange",
  "origin",
  "others",
  "parent",
  "partly",
  "people",
  "pepper",
  "period",
  "permit",
  "person",
  "phrase",
  "planet",
  "player",
  "please",
  "plenty",
  "pocket",
  "poetry",
  "police",
  "policy",
  "potato",
  "powder",
  "prayer",
  "prefer",
  "pretty",
  "priest",
  "prison",
  "profit",
  "prompt",
  "proper",
  "public",
  "pursue",
  "racial",
  "rarely",
  "rather",
  "rating",
  "reader",
  "really",
  "reason",
  "recall",
  "recent",
  "recipe",
  "record",
  "reduce",
  "reform",
  "refuse",
  "regard",
  "regime",
  "region",
  "reject",
  "relate",
  "relief",
  "remain",
  "remind",
  "remote",
  "remove",
  "repeat",
  "report",
  "resist",
  "resort",
  "result",
  "retain",
  "retire",
  "return",
  "reveal",
  "review",
  "rhythm",
  "sacred",
  "safety",
  "salary",
  "sample",
  "saving",
  "scared",
  "scheme",
  "school",
  "scream",
  "screen",
  "script",
  "search",
  "season",
  "second",
  "secret",
  "sector",
  "secure",
  "select",
  "Senate",
  "senior",
  "series",
  "settle",
  "severe",
  "sexual",
  "shadow",
  "should",
  "shower",
  "signal",
  "silent",
  "silver",
  "simple",
  "simply",
  "singer",
  "single",
  "sister",
  "slight",
  "slowly",
  "smooth",
  "soccer",
  "social",
  "source",
  "Soviet",
  "speech",
  "spirit",
  "spread",
  "spring",
  "square",
  "stable",
  "status",
  "steady",
  "stream",
  "street",
  "stress",
  "strike",
  "string",
  "stroke",
  "strong",
  "studio",
  "stupid",
  "submit",
  "sudden",
  "suffer",
  "summer",
  "summit",
  "supply",
  "surely",
  "survey",
  "switch",
  "symbol",
  "system",
  "tactic",
  "talent",
  "target",
  "tennis",
  "terror",
  "thanks",
  "theory",
  "thirty",
  "though",
  "threat",
  "throat",
  "ticket",
  "tissue",
  "tomato",
  "tongue",
  "toward",
  "travel",
  "treaty",
  "tunnel",
  "twelve",
  "twenty",
  "unable",
  "unique",
  "United",
  "unless",
  "unlike",
  "useful",
  "valley",
  "versus",
  "vessel",
  "victim",
  "viewer",
  "virtue",
  "vision",
  "visual",
  "volume",
  "wander",
  "wealth",
  "weapon",
  "weekly",
  "weight",
  "widely",
  "window",
  "winner",
  "winter",
  "wisdom",
  "within",
  "wonder",
  "wooden",
  "worker",
  "writer",
  "yellow",
  "kakapo",
  "kereru",
  "tawaki",
  "pukeko",
]);
const keyboard = ["QWERTYUIOP", "ASDFGHJKL", ">ZXCVBNM<"]; //enter and backspace
const validKey = "QWERTYUIOPASDFGHJKLZXCVBNM";
let word = "PARERA";
let letterOccurrence = new Map();
console.log(letterOccurrence);
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
    for (let c = 0; c < width; c++) {
      let tile = document.createElement("span");
      tile.id = r.toString() + "-" + c.toString();
      tile.classList.add("tile");
      tile.innerHTML = "";
      document.getElementById("board").appendChild(tile);
    }
  }

  // create keyboard
  for (let r = 0; r < 3; r++) {
    let keyRow = document.createElement("div");
    keyRow.id = "keyrow-" + r.toString();
    keyRow.classList.add("keyrow");
    keyRow.classList.add("d-flex");
    keyRow.classList.add("justify-content-center");
    document.getElementById("keyboard").appendChild(keyRow);
    for (let c of keyboard[r]) {
      let key = document.createElement("span");
      key.addEventListener("click", (e) => {
        playMouse(key);
      });
      key.id = "key-" + c.toString();
      key.classList.add("key");
      key.innerHTML = c;
      document.getElementById("keyrow-" + r.toString()).appendChild(key);
    }
  }

  document.addEventListener("keyup", (e) => {
    playKeyboard(e);
  });
}

function playMouse(key) {
  if (gameOver) {
    return;
  }
  console.log(key.innerText);
  if (validKey.includes(key.innerText)) {
    if (col < width) {
      document.getElementById(row + "-" + col).innerText = key.innerText; // current tile
      col++;
    }
  } else if (key.innerText == "<") {
    col--;
    document.getElementById(row + "-" + col).innerText = ""; // current tile
  }

  if (key.innerText == ">" && col === width) {
    verifyWord(getUserInput());
  } else if (key.innerText == ">" && col < width) {
    answer = document.getElementById("answer");
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
    answer = document.getElementById("answer");
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
    answer = document.getElementById("answer");
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
    answer = document.getElementById("answer");
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
  fetch(apiURL)
    .then((res) => {
      ok = res.ok;
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

    if (letter === word[c]) {
      currTile.classList.add("correct");
      if (currKey.classList.length > 1) {
        currKey.classList.remove(currKey.classList[1]);
      }
      currKey.classList.add("correct");
      tmpOccurrence.set(String(letter), tmpOccurrence.get(String(letter)) - 1);
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
  for (i = 0; i < keys.length; i++) {
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
    for (i = 0; i < localStorage.length; i++) {
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
    for (i = 0; i < localStorage.length - 1; i++) {
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
