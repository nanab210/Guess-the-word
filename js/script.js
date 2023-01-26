const guessedLettersElement = document.querySelector(".guessed-letters");
const guessLetterButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const progress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");
const guessForm = document.querySelector("input");
const label = document.querySelector("label");

let word = "magnolia";
let guessedLetters = [];
let remainingGuesses = 8;

const getWord = async function () {
  const res = await fetch(
    "https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt"
  );
  const words = await res.text();

  const wordArray = words.split("\n");
  const randomIndex = Math.floor(Math.random() * wordArray.length);
  word = wordArray[randomIndex].trim();
  placeholder(word);
};

getWord();

const placeholder = function (word) {
  const placeholderLetters = [];
  for (const letter of word) {
    //console.log(letter);
    placeholderLetters.push("●");
  }

  progress.innerText = placeholderLetters.join("");
};

guessLetterButton.addEventListener("click", function (e) {
  e.preventDefault();

  message.innerText = "";

  const guesses = letterInput.value;

  const goodGuess = playerInput(guesses);

  if (goodGuess) {
    makeGuess(guesses);
  }
  letterInput.value = "";
});

const playerInput = function (input) {
  const acceptedLetter = /[a-zA-Z]/;

  if (input.length === 0) {
    message.innerText = "Please enter a letter";
  } else if (input.length > 1) {
    message.innerText = "Please enter only one letter at a time";
  } else if (!input.match(acceptedLetter)) {
    message.innerText = "Please enter only letters from A to Z";
  } else {
    return input;
  }
};

const makeGuess = function (guesses) {
  guesses = guesses.toUpperCase();
  if (guessedLetters.includes(guesses)) {
    message.innerText = "You already entered that letter, please try again";
  } else {
    guessedLetters.push(guesses);
    console.log(guessedLetters);
    updateGuessRemaining(guesses);
    showGuessedLetters();
    updateWordProgress(guessedLetters);
  }
};

const showGuessedLetters = function () {
  guessedLettersElement.innerHTML = "";

  for (const letter of guessedLetters) {
    const li = document.createElement("li");
    li.innerText = letter;
    guessedLettersElement.append(li);
  }
};

const updateWordProgress = function (guessedLetters) {
  const wordUpper = word.toUpperCase();
  const wordArray = wordUpper.split("");
  const revealWord = [];

  for (const letter of wordArray) {
    if (guessedLetters.includes(letter)) {
      revealWord.push(letter.toUpperCase());
    } else {
      revealWord.push("●");
    }
  }
  progress.innerText = revealWord.join("");
  checkResult();
};

const updateGuessRemaining = function (guesses) {
  const upperWord = word.toUpperCase();

  if (!upperWord.includes(guesses)) {
    message.innerText = `Sorry, the word has no ${guesses}.`;
    remainingGuesses -= 1;
  } else {
    message.innerText = `Yay! The word has the letter ${guesses}.`;
  }

  if (remainingGuesses === 0) {
    message.innerHTML = `Game Over. The word was <span class="highlight">${word.toUpperCase()}</span>.`;

    startOver();
  } else if (remainingGuesses === 1) {
    remainingGuessesSpan.innerText = `${remainingGuesses} guess`;
  } else {
    remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
  }
};

const checkResult = function () {
  if (word.toUpperCase() === progress.innerText) {
    message.classList.add("win");
    message.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`;

    startOver();
  }
};

const startOver = function () {
  guessLetterButton.classList.add("hide");
  remainingGuessesElement.classList.add("hide");
  guessedLettersElement.classList.add("hide");
  label.classList.add("hide");
  guessForm.classList.add("hide");
  playAgainButton.classList.remove("hide");
};

playAgainButton.addEventListener("click", function () {
  message.classList.remove("win");
  guessedLetters = [];
  remainingGuesses = 8;
  remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
  guessedLettersElement.innerHTML = "";
  message.innerText = "";

  getWord();

  guessLetterButton.classList.remove("hide");
  remainingGuessesElement.classList.remove("hide");
  guessedLettersElement.classList.remove("hide");
  label.classList.remove("hide");
  guessForm.classList.remove("hide");
  playAgainButton.classList.add("hide");
  guessForm.classList.remove("hide");
});
