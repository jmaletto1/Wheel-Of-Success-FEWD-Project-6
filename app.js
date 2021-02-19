// Element Selectors

const keyboard = document.getElementById("qwerty");
const phraseDiv = document.getElementById("phrase");
const overlay = document.getElementById("overlay");
const headline = document.querySelector(".title");
const startButton = document.querySelector(".btn__reset");
const scoreboard = document.getElementById("scoreboard");
const tries = document.getElementsByClassName("tries");
const buttons = document.getElementsByTagName("button");

// Phrase and Game Variables

const phrases = [
  "the only thing we have to fear is fear itself",
  "where there is love there is life",
  "brevity is the soul of wit",
  "less is more",
  "no one ever really dies",
];
let livePhrase = [];
let missed = 0;

// Game Functions

const startGame = (reset = false) => {
  if (reset) {
    livePhrase = [];
    missed = 0;
    phraseDiv.innerHTML = null;
    for (let i = 0; i < buttons.length; i++) {
      let button = buttons[i];
      button.classList.remove("chosen");
      button.removeAttribute("disabled");
    }
    for (let x = 0; x < 5; x++) {
      tries[
        x
      ].innerHTML = `<img src="images/liveHeart.png" height="35px" width="30px" />`;
    }
  }
  getRandomPhrase(phrases);
};

const getRandomPhrase = (phrases) => {
  const randomNumber = Math.ceil(Math.random() * phrases.length - 1);
  let phrase = phrases[randomNumber];
  livePhrase = phrase.split("");
  addPhraseToDisplay(livePhrase);
};

const addPhraseToDisplay = (phrase) => {
  for (let letter = 0; letter < phrase.length; letter++) {
    if (phrase[letter] !== " ") {
      phraseDiv.innerHTML += `<li class="letter">${phrase[letter]}</li>`;
    } else {
      phraseDiv.innerHTML += `<li class="space"></li>`;
    }
  }
};

const checkForLetter = (letter) => {
  let roundWin = false;
  const letterPlaceholder = document.getElementsByClassName("letter");
  for (let x = 0; x < letterPlaceholder.length; x++) {
    if (letter.toLowerCase() === letterPlaceholder[x].innerHTML) {
      letterPlaceholder[x].className = "letter show";
      letterPlaceholder[x].classList.toggle("transition");
      roundWin = true;
    }
  }
  if (!roundWin) {
    return null;
  } else {
    return letter;
  }
};

const resetDOM = () => {
  startButton.innerHTML = "Let's go!";
  startButton.addEventListener("click", () => {
    overlay.style.visibility = "hidden";
    startGame((reset = true));
  });
};

const checkForWin = () => {
  if (missed === 5) {
    headline.innerHTML = "LOSER. Play Again?";
    overlay.style.visibility = "visible";
    overlay.className = "lose";
    resetDOM();
  }

  const letterCount = document.getElementsByClassName("letter");
  const correctLetterCount = document.getElementsByClassName("show");

  if (letterCount.length === correctLetterCount.length && missed < 5) {
    overlay.style.visibility = "visible";
    overlay.className = "win";
    headline.innerHTML = "WINNER. Play Again?";
    resetDOM();
  }
};

const letterSubmission = () => {};

// Event Listeners

startButton.addEventListener("click", () => {
  overlay.style.visibility = "hidden";
  startGame();
});

keyboard.addEventListener("click", (e) => {
  const isButton = e.target.nodeName === "BUTTON";
  if (!isButton) return;

  e.target.className = "chosen";
  e.target.disabled = true;
  const result = checkForLetter(e.target.innerHTML);

  if (!result) {
    missed += 1;
    tries[missed - 1].innerHTML =
      "<img src='images/lostHeart.png' height='35px' width='30px'>";
  }

  checkForWin();
});

// Physical Keyboard Listener

document.addEventListener("keydown", (e) => {
  for (let x = 0; x < buttons.length; x++) {
    let button = buttons[x];
    if (e.key === button.innerHTML) {
      button.className = "chosen";
      button.disabled = "true";
    }
  }
  const result = checkForLetter(e.key);

  if (!result) {
    missed += 1;
    tries[missed - 1].innerHTML =
      "<img src='images/lostHeart.png' height='35px' width='30px'>";
  }

  checkForWin();
});
