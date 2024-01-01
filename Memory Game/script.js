const moves = document.getElementById("moves-count");
const time_value = document.getElementById("timer");
const start_btn = document.getElementById("start");
const stop_btn = document.getElementById("stop");
const game_container = document.querySelector(".game-container");
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

let second = 0;
let minute = 0;

let movesCount = 0;
let winCount = 0;

function time_generator() {
  second += 1;
  if (second >= 60) {
    minute += 1;
    second = 0;
  }

  let second_value = second < 10 ? `0${second}` : second;
  let minute_value = minute < 10 ? `0${minute}` : minute;
  time_value.innerHTML = `<span>Time:</span>${minute_value}:${second_value}`;
}

const moves_counter = () => {
  movesCount += 1;
  moves.innerHTML = `<span>Moves:</span>${movesCount}`;
};

// Random 8 adet kart seçilir
const generateRandom = (size = 4) => {
  // 3 nokta ile arrayin kopyasini olusturuyoruz
  let tempArray = [...items];

  let cardValues = [];

  size = (size * size) / 2;

  //seçilen kartlar cardvalues arrayinde tutulur
  //seçilen kartlar tempArrayden silinir
  for (let i = 0; i < size; i++) {
    const randomIndex = Math.floor(Math.random() * tempArray.length);
    cardValues.push(tempArray[randomIndex]);
    tempArray.splice(randomIndex, 1);
  }

  return cardValues;
};

const matrixGenerator = (cardValues, size = 4) => {
  game_container.innerHTML = "";
  cardValues = [...cardValues, ...cardValues];
  cardValues = cardValues.sort(() => Math.random() - 0.5);
  for (let i = 0; i < size * size; i++) {
    game_container.innerHTML += `
     <div class="card-container" data-card-value="${cardValues[i].name}">
        <div class="card-before">?</div>
        <div class="card-after">
        <img src="${cardValues[i].image}" class="image"/></div>
     </div>
     `;
  }

  //Grid Düzen
  game_container.style.gridTemplateColumns = `repeat(${size},auto)`;

  //Cards
  cards = document.querySelectorAll(".card-container");
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      //If selected card is not matched yet then only run (i.e already matched card when clicked would be ignored)
      if (!card.classList.contains("matched")) {
        //flip the cliked card
        card.classList.add("flipped");
        //if it is the firstcard (!firstCard since firstCard is initially false)
        if (!firstCard) {
          //so current card will become firstCard
          firstCard = card;
          //current cards value becomes firstCardValue
          firstCardValue = card.getAttribute("data-card-value");
        } else {
          //increment moves since user selected second card
          moves_counter();
          //secondCard and value
          secondCard = card;
          let secondCardValue = card.getAttribute("data-card-value");
          if (firstCardValue == secondCardValue) {
            //if both cards match add matched class so these cards would beignored next time
            firstCard.classList.add("matched");
            secondCard.classList.add("matched");
            //set firstCard to false since next card would be first now
            firstCard = false;
            //winCount increment as user found a correct match
            winCount += 1;
            //check if winCount ==half of cardValues
            if (winCount == Math.floor(cardValues.length / 2)) {
              result.innerHTML = `<h2>You Won</h2>
            <h4>Moves: ${movesCount}</h4>`;
              stopGame();
            }
          } else {
            //if the cards dont match
            //flip the cards back to normal
            let [tempFirst, tempSecond] = [firstCard, secondCard];
            firstCard = false;
            secondCard = false;
            let delay = setTimeout(() => {
              tempFirst.classList.remove("flipped");
              tempSecond.classList.remove("flipped");
            }, 900);
          }
        }
      }
    });
  });
};

//Start game
start_btn.addEventListener("click", () => {
  movesCount = 0;
  second = 0;
  minute = 0;
  //controls amd buttons visibility
  controls.classList.add("hide");
  stop_btn.classList.remove("hide");
  start_btn.classList.add("hide");
  //Start timer
  interval = setInterval(time_generator, 1000);
  //initial moves
  moves.innerHTML = `<span>Moves:</span> ${movesCount}`;
  initializer();
});
//Stop game
stop_btn.addEventListener(
  "click",
  (stopGame = () => {
    controls.classList.remove("hide");
    stop_btn.classList.add("hide");
    start_btn.classList.remove("hide");
    clearInterval(interval);
  })
);

const initializer = () => {
  result.innerHTML = "";
  winCount = 0;
  let cardValues = generateRandom();
  console.log(cardValues);
  matrixGenerator(cardValues);
};

initializer();
