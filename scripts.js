"use strict";

function generateRandomNumber(max) {
  return Math.floor(Math.random() * max) + 1;
}

function startTimer() {
  // Starts the timer if isn't already started.
  if (timer === undefined) {
    timer = setInterval(() => {
      time++;
      timeElem.innerHTML = time;
    }, 1000);
  }
}

let highscore = 0;
let score = 20;
let time = 0;
let timer;
let myNumber;

const buttonCheckElem = document.getElementById("buttonCheck");
const messageElem = document.querySelector(".message");
const timeElem = document.querySelector("#time");
const checkElem = document.querySelector("#check");
const scoreElem = document.querySelector(".score");
const highscoreElem = document.querySelector(".highscore");
const againElem = document.querySelector(".again");
const yourNumberElem = document.getElementById("number");

function check() {
  let yourNumber = +yourNumberElem.value;

  if (yourNumber < 1 || yourNumber > 20) {
    messageElem.textContent = "⛔️No number!";
    return;
  }

  startTimer();

  if (yourNumber < myNumber) {
    messageElem.textContent = "📉Too Low...";
    if (score > 0) {
      score -= 1;
      scoreElem.textContent = score;
    }
  }

  if (yourNumber > myNumber) {
    messageElem.textContent = "📈Too High...";
    if (score > 0) {
      score -= 1;
      scoreElem.textContent = score;
    }
  }

  if (yourNumber === myNumber) {
    document.body.style.backgroundColor = "#60B347";
    messageElem.textContent = "🎉 Correct Number!";
    checkElem.textContent = yourNumber;
    yourNumberElem.setAttribute("disabled", "");
    buttonCheckElem.classList.add("disabled");
    clearInterval(timer);
    if (score > highscore) {
      highscoreElem.textContent = score;
      highscore = score;
    }
  }
}

function reset() {
  myNumber = generateRandomNumber(20);
  console.log(`My number: ${myNumber}.`);

  score = 20;
  time = 0;
  timer = undefined;

  scoreElem.textContent = score;
  timeElem.innerHTML = time;
  messageElem.textContent = "Start guessing...";
  checkElem.textContent = "?";
  yourNumberElem.removeAttribute("disabled");
  buttonCheckElem.classList.remove("disabled");
  yourNumberElem.value = "";
  document.body.style.backgroundColor = "#222";
}

buttonCheckElem.addEventListener("click", check);

againElem.addEventListener("click", reset);

reset();