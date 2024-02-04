// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system.

const input = require("readline-sync");

const oldPointStructure = {
  1: ["A", "E", "I", "O", "U", "L", "N", "R", "S", "T"],
  2: ["D", "G"],
  3: ["B", "C", "M", "P"],
  4: ["F", "H", "V", "W", "Y"],
  5: ["K"],
  8: ["J", "X"],
  10: ["Q", "Z"],
};

function oldScrabbleScorer(word) {
  word = word.toUpperCase();
  let letterPoints = "";
  for (let i = 0; i < word.length; i++) {
    for (const pointValue in oldPointStructure) {
      if (oldPointStructure[pointValue].includes(word[i])) {
        letterPoints += `Points for '${word[i]}': ${pointValue}\n`;
      }
    }
  }
  return letterPoints;
}
// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
  console.log("Let's play some scrabble!");
  console.log();

  let userInput = input.question("Enter a word to score: ");
  return userInput;
}

let simpleScorer = (word) => {
  return word.split('').length;
};

let vowelBonusScorer = (word) => {
  let score = 0;
  let charArray = word.toUpperCase().split("");

  let vowels = ["A", "E", "I", "O", "U"];
  for (let i = 0; i < charArray.length; i++) {
    if (vowels.includes(charArray[i])) {
      score = score + 3;
    } else {
      score = score + 1;
    }
  }
  return score;
};

let scrabbleScorer = (word) => {
  let score = 0;
  let charArray = word.toLowerCase().split("");

  for (let i = 0; i < charArray.length; i++) {
    score = score + Number(newPointStructure[charArray[i]]);
  }

  return score;
};

const scoringAlgorithms = [
  {
    description: "Each letter is worth 1 point.",
    name: "Simple Score",
    scorerFunction: simpleScorer
  },
  {
    description: "Vowels are 3 pts, consonants are 1 pt.",
    name: "Bonus Vowels",
    scorerFunction: vowelBonusScorer
  },
  {
    description: "The traditional scoring algorithm.",
    name: "Scrabble",
    scorerFunction: scrabbleScorer
  }
];

function scorerPrompt() {
  console.log("Which scoring algorithm would you like to use?");
  console.log();

  for (let i = 0; i < scoringAlgorithms.length; i++) {
    let name = scoringAlgorithms[i].name;
    let description = scoringAlgorithms[i].description;
    console.log(`${i} - ${name}: ${description}`);
  }

  let incorrectSelection = true;
  let userInput = '';
  while(incorrectSelection === true) {
    userInput = input.question("Enter 0, 1, or 2: ");
    if (['0', '1', '2'].includes(userInput)) {
      incorrectSelection = false;
    }
  }
  return scoringAlgorithms[userInput];
}

function transform(oldPointStructureObj) {
  let newObject = Object();
  for (const [key, value] of Object.entries(oldPointStructureObj)) {
    //console.log("Point Value: " + key);
    for (let i = 0; i < value.length; i++) {
      //console.log("Letter: " + value[i]);
      newObject[value[i].toLowerCase()] = Number(key);
    }
  }
  return newObject;
}

let newPointStructure = transform(oldPointStructure);
newPointStructure[' '] = 0;
/*
let newPointStructure = {
  A: 1,
  B: 3,
  C: 3,
  D: 2,
  E: 1,
  F: 4,
  G: 2,
  H: 4,
  I: 1,
  J: 8,
  K: 5,
  L: 1,
  M: 3,
  N: 1,
  O: 1,
  P: 3,
  Q: 10,
  R: 1,
  S: 1,
  T: 1,
  U: 1,
  V: 4,
  W: 4,
  X: 8,
  Y: 4,
  Z: 10,
};
*/

function runProgram() {
  //console.log(transform(oldPointStructure));
  let word = initialPrompt();
  let scoringAlgorithm = scorerPrompt();
  console.log(
    "Score for '" + word + "': " + scoringAlgorithm.scorerFunction(word)
  );
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
  initialPrompt: initialPrompt,
  transform: transform,
  oldPointStructure: oldPointStructure,
  simpleScorer: simpleScorer,
  vowelBonusScorer: vowelBonusScorer,
  scrabbleScorer: scrabbleScorer,
  scoringAlgorithms: scoringAlgorithms,
  newPointStructure: newPointStructure,
  runProgram: runProgram,
  scorerPrompt: scorerPrompt,
};
