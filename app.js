"use strict";
let playerInfo = {
    player1: {
        id: 1,
        name:'Player1',
        score: 0,
        color: "#273342"
    },
    player2: {
        id: 2,
        name:'Player2',
        score: 0,
        color: "#ad5534"
    }
}

let player1 = {
    id: 1,
    name:'Player1',
    score: 0,
    color: "#273342"
}

let player2 = {
    id: 2,
    name:'Player2',
    score: 0,
    color: "#ad5534"
}


let game = false;
let p1Score = 0;
let p2Score = 0;
let currentPlayer = "player1";
let nums = document.querySelectorAll('.the-num');
let boxes = document.querySelectorAll('.draw-box');
let input = document.querySelectorAll('input');
let startBtn = document.querySelector('.start');
let resetBtn = document.querySelector('.reset');
let debug = 0;

let randNums = () => {
    let arr = [];
    while (arr.length < 6) {
        let int = Math.floor(Math.random() *7);
        if (arr.includes(int) === false && int > 0) {
            arr.push(int);
        }
    }
    return arr;
}

let numToBoxes = (numlist) => {
    nums.forEach((ele) => {
        ele.classList.add('hide');
        ele.textContent = numlist[0];
        numlist.shift();
    });
};

numToBoxes(randNums());

// only accept clicks on box if game is running
// reveal card value and switch player
boxes.forEach((box) => {
    box.addEventListener('click', () => {
        if (game) {
            box.style.background = playerInfo[currentPlayer].color;
            box.style.color = 'white';
            box.firstElementChild.classList.remove('hide');
            let val = parseInt(box.firstElementChild.innerHTML);
            playerInfo[currentPlayer].score += val;
            winCheck();
            switchPlayer();
        }
    })
});



if (game == false) {
    input.forEach((input) => {
        input.addEventListener('keyup', () => {
            let player = input.id.split("-")[0];
            let playerName=document.querySelector(`#${player}-name`);
            if (input.value === "") {
                playerName.textContent = player;
            } else {
                playerInfo[player].name = input.value;
                playerName.textContent = input.value;
            }
        });
    });
}

let switchPlayer = () => {
    document.querySelector(`.${currentPlayer}-active`).classList.add('hide');
    if (currentPlayer === 'player1') {
        currentPlayer = 'player2';

    } else {
        currentPlayer = 'player1';
    }
    document.querySelector(`.${currentPlayer}-active`).classList.remove('hide');
}

// when start button is clicked

let startGame = () => {
    game = true;
    startBtn.classList.toggle('remove');
    resetBtn.classList.toggle('remove');
    input.forEach((input) => {
        input.classList.add('hide');

    })
}

let scoreUpdate = (value) => {
    let score = playerInfo[currentPlayer].score;
    score += value;
}

let winCheck = () => {
    if (playerInfo[currentPlayer].score >= 11) {
        console.log(`${currentPlayer} has won...`);
    }
    if (playerInfo.player1.score + playerInfo.player2.score === 21) {
        if (playerInfo.player1.score > playerInfo.player2.score) {
            console.log('player1 has won......');
        } else {
            console.log('player2 has won...');
        }
    }
}

startBtn.addEventListener('click', startGame);
// resetBtn.addEventListener('click', whatScore);


// console.log(playerInfo.player1.score)

// generate random unique numbers upto 6

// set current player

// assign the random unique numbers to the divs
