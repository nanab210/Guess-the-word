const guessedLettersElement = document.querySelector(".guessed-letters");
const guessLetterButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const progress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

const word = "magnolia";
const guessedLetters = [];

const placeholder = function (word) {
  const placeholderLetters = [];
  for (const letter of word) {
    console.log(letter);
    placeholderLetters.push("●");
  }

  progress.innerText = placeholderLetters.join("");
};

placeholder(word);

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

const checkResult = function () {
    message.classList.add("win");
    message.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`;
  }
};
