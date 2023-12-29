const moves = document.getElementById("moves-count");
const time_value = document.getElementById("timer");
const start_btn = document.getElementById("start");
const stop_btn = document.getElementById("stop");
const game_container = document.getElementById("game-container");
const result = document.getElementById("result");
const controls = document.querySelector(".controls-container");
let cards;
let interval;
let firstCard = false;
let secondCard = false;

const items = [
  { name: "bee", image: "bee.png" },
  { name: "crocodile", image: "crocodile.png" },
  { name: "macaw", image: "macaw.png" },
  { name: "gorilla", image: "gorilla.png" },
  { name: "tiger", image: "tiger.png" },
  { name: "monkey", image: "monkey.png" },
  { name: "chameleon", image: "chameleon.png" },
  { name: "piranha", image: "piranha.png" },
  { name: "anaconda", image: "anaconda.png" },
  { name: "sloth", image: "sloth.png" },
  { name: "cockatoo", image: "cockatoo.png" },
  { name: "toucan", image: "toucan.png" },
];

let second = 0
let minute = 0

let movesCount = 0;
let winCount = 0;

function time_generator()
{
  second += 1;
  if(second >= 60)
  {
    minute += 1;
    second = 0;
  }

}