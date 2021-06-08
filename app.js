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

let game = false;
// let p1Score = 0;
// let p2Score = 0;
let p1Card = document.querySelector('.player1-score');
let p2Card = document.querySelector('.player2-score');
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

let mainGame = () => {
    boxes.forEach((box) => {
        box.addEventListener('click', () => {
            if (game) {
                box.style.background = playerInfo[currentPlayer].color;
                box.style.color = 'white';
                box.firstElementChild.classList.remove('hide');
                box.classList.add('noclick');
                let val = parseInt(box.firstElementChild.innerHTML);
                playerInfo[currentPlayer].score += val;
                showScore();
                winCheck();
                switchPlayer();
            }
        })
    });
}

mainGame();

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

let switchPlayer = () => {
    document.querySelector(`.${currentPlayer}-active`).classList.add('hide');
    if (currentPlayer === 'player1') {
        currentPlayer = 'player2';

    } else {
        currentPlayer = 'player1';
    }
    document.querySelector(`.${currentPlayer}-active`).classList.remove('hide');
}

let startGame = () => {
    game = true;
    numToBoxes(randNums());
    startBtn.classList.toggle('remove');
    resetBtn.classList.toggle('remove');
    input.forEach((input) => {
        input.classList.add('hide');
    })
}


let winCheck = () => {
    let p1 = playerInfo.player1.score;
    let p2 = playerInfo.player2.score;
    let p1Name = playerInfo.player1.name;
    let p2Name = playerInfo.player2.name;

    if (playerInfo[currentPlayer].score >= 11) {
        let winner = document.querySelector(`.${currentPlayer}-score`);
        winner.textContent = "winner!"
        revealCards();
        game = false;
    }
    if (p1 - p2 >= 6 && p2 > 1) {
        console.log(`${p1Name} has won...`);
        revealCards();
    }
    if (p2 - p1 >= 6 && p1 > 1) {
        console.log(`${p2Name} has won...`);
        revealCards();
    }
    if (p1 + p2 === 21) {
        if (p1 > p2) {
            console.log(`${p1Name} has won...`);
        } else {
            console.log(`${p2Name} has won...`);
        }
    }
}


let revealCards = () => {
    nums.forEach((num) => {
        num.classList.remove('hide');
        game = false;
    })
}

let showScore = () => {
    p1Card.textContent = playerInfo.player1.score;
    p2Card.textContent = playerInfo.player2.score;
}

let reset = () => {
    game = false;
    numToBoxes(randNums());
    startBtn.classList.toggle('remove');
    resetBtn.classList.toggle('remove');
    playerInfo.player1.score = 0;
    playerInfo.player2.score = 0;
    p1Card.textContent = 0;
    p2Card.textContent = 0;

    boxes.forEach((box) => {
        box.style.background = "#dde8eb";
        box.style.color = "black";
        box.classList.remove('noclick');
    })

    input.forEach((input) => {
        input.classList.remove('hide');
    })
}

startBtn.addEventListener('click', startGame);
resetBtn.addEventListener('click', reset);


// console.log(playerInfo.player1.score)

// generate random unique numbers upto 6

// set current player

// assign the random unique numbers to the divs
