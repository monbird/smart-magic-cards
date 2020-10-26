const suits = ['hearts', 'spades', 'diamonds', 'clubs'];
const cardsWrapper = document.querySelector('.cards-wrapper');
const btnWrapper = document.querySelector('.btn-wrapper'); /* eslint-disable-line */
const selectedCardsWrapper = document.querySelector('.selected-cards'); /* eslint-disable-line */
const btnMagic = document.createElement('button');

// Function to shuffle all cards
function shuffleCards() {
  const unshuffledCards = [...cardsWrapper.children];
  const shuffledCards = unshuffledCards.sort(() => Math.random() - 0.5);
  shuffledCards.forEach((card, i) => {
    card.style.left = `${i * 27}px`;
  });
  cardsWrapper.innerHTML = '';
  cardsWrapper.append(...shuffledCards);
}

// Function resposible for flipping the cards
function flipCards() {
  if (cardsWrapper.classList.contains('hidden')) {
    cardsWrapper.classList.remove('hidden');
  } else {
    cardsWrapper.classList.add('hidden');
  }
}

// Function resposible for doing a trick
function doMagic() {
  const cardValue = selectedCardsWrapper.children[0].dataset.value;

  let distance = 27;
  [...cardsWrapper.children].forEach((child) => {
    if (child.dataset.value === cardValue) {
      child.style.left = `${distance}px`;
      selectedCardsWrapper.append(child);
      distance += 27;
    }
  });
}

// Function to pick a card
function pickCard(card) {
  if (selectedCardsWrapper.innerHTML === '') {
    card.style.left = 0;
    selectedCardsWrapper.append(card);
  }
  btnWrapper.append(btnMagic);
}

// Drag & drop utility functions
function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  const selector = `.${[...ev.target.classList].join('.')}`;
  ev.dataTransfer.setData('selector', selector);
}

function drop(ev) {
  ev.preventDefault();
  const selector = ev.dataTransfer.getData('selector');
  const card = document.querySelector(selector);
  pickCard(card);
}

// Function to create cards
function createCards() {
  const cards = [];
  // Create an array with objects containing the value and the suit of each card
  suits.forEach((suit) => {
    for (let i = 1; i <= 13; i += 1) {
      const cardObject = {
        value: i,
        suit,
      };
      cards.push(cardObject);
    }
  });

  // For each dataObject, create a new card and append it to the DOM
  cards.forEach((card, i) => {
    const positionFromLeft = i * 27;
    const cardElement = document.createElement('div');

    // Initialize dragging
    cardElement.setAttribute('draggable', 'true');
    cardElement.addEventListener('dragstart', drag);

    cardElement.setAttribute('data-value', card.value);
    cardElement.classList.add('card', `${card.suit}-${card.value}`);
    cardElement.style.left = `${positionFromLeft}px`;
    cardsWrapper.append(cardElement);
  });

  // Initialize dropping
  selectedCardsWrapper.addEventListener('drop', drop);
  selectedCardsWrapper.addEventListener('dragover', allowDrop);
}

// Function to reset the game
function restartGame() {
  cardsWrapper.innerHTML = '';
  selectedCardsWrapper.innerHTML = '';
  cardsWrapper.classList.remove('hidden');

  const btnLetsStart = document.createElement('button');
  btnLetsStart.innerHTML = 'Let\'s get started';
  btnLetsStart.addEventListener('click', startGame); /* eslint-disable-line */
  btnLetsStart.classList.add('btn', 'btn-lg', 'btn-secondary', 'mx-2');

  btnWrapper.innerHTML = '';
  btnWrapper.append(btnLetsStart);
}

// Function to clear out the initial button and create new buttons to play the game.
function createButtons() {
  const btnShuffle = document.createElement('button');
  btnShuffle.innerHTML = 'Shuffle';
  btnShuffle.addEventListener('click', shuffleCards);

  const btnFlip = document.createElement('button');
  btnFlip.innerHTML = 'Flip cards';
  btnFlip.addEventListener('click', flipCards);

  btnMagic.innerHTML = 'Magic';
  btnMagic.setAttribute('id', 'doMagicBtn');
  btnMagic.addEventListener('click', doMagic);

  const btnRestartGame = document.createElement('button');
  btnRestartGame.innerHTML = 'Restart game';
  btnRestartGame.addEventListener('click', restartGame);
  btnRestartGame.classList.add('btn', 'btn-lg', 'btn-warning', 'mx-2');

  [btnShuffle, btnFlip, btnMagic].forEach((btn) => {
    btn.classList.add('btn', 'btn-lg', 'btn-secondary', 'mx-2');
  });

  btnWrapper.innerHTML = '';
  btnWrapper.append(btnRestartGame, btnShuffle, btnFlip);
}

// Function to start the game by clearing the wrapper, creating
// and appending the buttons and all the cards to the DOM
function startGame() {
  createButtons();
  createCards();
}

document.getElementById('start-game').addEventListener('click', startGame);
