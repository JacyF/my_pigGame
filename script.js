'use strict';

// Selecting node elements
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const currentScore0El = document.getElementById('current--0')
const currentScore1El = document.getElementById('current--1')

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Start content conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

// Current score
let currentScore = 0;

// Rolling dice functionality
btnRoll.addEventListener('click', function () {

    // 1. Generate a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3. Check for rolled 1: 
    if (dice !== 1) {
        // Add dice to current score
        currentScore += dice;
        currentScore0El.textContent = currentScore;
    } else {
        // Switch to next player 
    }
})