'use strict';

// Selecting node elements
const startGame = document.querySelector('.btnStart');
const startMain = document.querySelector('.startMain');
const wrapperHidden = document.querySelector('.wrapper_hidden');

// palyers names
const playerName0El = document.getElementById('player0');
const playerName1El = document.getElementById('player1');

const name0El = document.getElementById('name--0');
const name1El = document.getElementById('name--1');

const playerX = document.querySelector('.playerX');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const currentScore0El = document.getElementById('current--0')
const currentScore1El = document.getElementById('current--1')

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

// Open game function 
const openG = function () {

    if (!playerName0El.value || !playerName1El.value) return null

    wrapperHidden.classList.add('hidden');
    startMain.classList.remove('hidden');

    name0El.textContent = playerName0El.value;
    name1El.textContent = playerName1El.value;
}

// Start the gane
startGame.addEventListener('click', openG);

const init = function () {

    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    currentScore0El.textContent = 0;
    currentScore1El.textContent = 0;

    diceEl.classList.add('hidden');

    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');

    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');

    playerX.classList.add("hidden");

    // new
    wrapperHidden.classList.remove('hidden');
    startMain.classList.add('hidden');

    playerName0El.value = '';
    playerName1El.value = '';

}

init();

// Function Switch Player
const switchPlayer = function () {

    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;

    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}

// Rolling dice functionality
btnRoll.addEventListener('click', function () {

    if (playing) {
        // 1. Generate a random dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;

        // 2. Display dice
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;

        // 3. Check for rolled 1: 
        if (dice !== 1) {
            // Add dice to current score
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;

        } else {
            // Switch to next player 
            switchPlayer();
        }
    }
})

// Holding score
btnHold.addEventListener('click', function () {

    if (playing) {
        // 1. Add current score to active player's score
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        // 2. Check if player score is >-100
        if (scores[activePlayer] >= 100) {

            // Finish the game
            playing = false;
            diceEl.classList.add('hidden');
            const winner = document.getElementById(`player${activePlayer}`);
            playerX.classList.remove("hidden");
            playerX.textContent = `${winner.value} wins 🎉 `;

            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        } else {

            // 3. Switching Player
            switchPlayer();
        }
    }
})

// Reseting the game
btnNew.addEventListener('click', init)