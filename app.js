"use strict";

let playerInfo = {
    player1: {
        id: 1,
        name:'player1',
        score: 0,
        color: "#273342"
    },
    player2: {
        id: 2,
        name:'player2',
        score: 0,
        color: "#ad5534"
    }
}
let game = false;
let p1Card = document.querySelector('.player1-score');
let p2Card = document.querySelector('.player2-score');
let currentPlayer = "player1";
let nums = document.querySelectorAll('.the-num');
let boxes = document.querySelectorAll('.draw-box');
let input = document.querySelectorAll('input');
let startBtn = document.querySelector('.start');
let resetBtn = document.querySelector('.reset');
let actvie = document.querySelector('.active');
let result = document.querySelectorAll('.result');
let winner;

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

let showNames = () => {
    document.querySelector('#player1-name').textContent = playerInfo.player1.name;
    document.querySelector('#player2-name').textContent = playerInfo.player2.name;
}

let collectNames = () => {
    input.forEach((input) => {
        input.addEventListener('keyup', () => {
            let player = input.id.split("-")[0];
            let playerName=document.querySelector(`#${player}-name`);
            if (input.value === "") {
                playerInfo[player].name = player;
            } else {
                playerInfo[player].name = input.value;
            }
            showNames();
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

let showScore = () => {
    p1Card.textContent = playerInfo.player1.score;
    p2Card.textContent = playerInfo.player2.score;
}

let winCheck = () => {
    let p1 = playerInfo.player1.score;
    let p2 = playerInfo.player2.score;

    if (playerInfo[currentPlayer].score >= 11) {
        revealCards();
        hideActive();
        winner = currentPlayer;
    }
    if (p1 - p2 >= 6 && p2 > 3) {
        revealCards();
        hideActive();
        winner = 'player1'
    }
    if (p2 - p1 >= 6 && p1 > 3) {
        revealCards();
        hideActive();
        winner = 'player2'
    }
    if (p1 + p2 === 21) {
        hideActive();
        if (p1 > p2) {
            winner = 'player1'
        } else {
            winner = 'player2'
        }
    }
}

let declare = () => {
    if (winner !== undefined) {
        let winCol = document.querySelector(`.${winner}-result`);
        let input = document.querySelector('selector');
        winCol.classList.remove('remove');
        winCol.classList.remove('hide3');
    }
}

let revealCards = () => {
    nums.forEach((num) => {
        num.classList.remove('hide');
        game = false;
    })
}

let startGame = () => {
    game = true;
    numToBoxes(randNums());
    hideStart();
    document.querySelector(`.${currentPlayer}-active`).classList.remove('hide');
    input.forEach((input) => {
        input.classList.add('hide3');
        setTimeout(() => {
            input.classList.add('remove');
            result.forEach((result) => {
                result.classList.remove('remove');
            })
        }, 500)
    })

}

let hiReShIn = () => {
    result.forEach((result) => {
        result.classList.add('hide3');
        setTimeout(() => {
            result.classList.add('remove');
            input.forEach((input) => {
                input.classList.remove('remove');
                setTimeout(() => {
                    input.classList.remove('hide3');
                }, 100)
            })
        }, 500)
    })
}

let hideStart = () => {
    startBtn.classList.add('hide2');
    setTimeout(() => {
        startBtn.classList.add('remove');
        resetBtn.classList.remove('remove');
        setTimeout(() => {
            resetBtn.classList.remove('hide2');
        }, 50);
    }, 600);
}

let hideReset = () => {
    resetBtn.classList.add('hide2');
    setTimeout(() => {
        resetBtn.classList.add('remove');
        startBtn.classList.remove('remove');
        setTimeout(() => {
            startBtn.classList.remove('hide2');
        }, 50);
    }, 600);
}

let hideActive = () => {
    setTimeout(() => {
        document.querySelector(`.${currentPlayer}-active`).classList.add('hide');
    }, 50)
}

let resetBoxes = () => {
    boxes.forEach((box) => {
        box.style.background = "#dde8eb";
        box.style.color = "black";
        box.classList.remove('noclick');
    })
}

let resetNames = () => {
    playerInfo.player1.name = 'player1';
    playerInfo.player2.name = 'player2';
    input.forEach((input) => {
        input.value = "";
    })

}

let masterReset = () => {
    game = false;
    numToBoxes(randNums());
    playerInfo.player1.score = 0;
    playerInfo.player2.score = 0;
    p1Card.textContent = 0;
    p2Card.textContent = 0;

    resetNames();
    showNames();
    hideReset();
    resetBoxes();
    hiReShIn();
    hideActive();

    setTimeout(() => {
        currentPlayer = "player1";
    }, 500)

    winner = undefined;
}

let mainGame = () => {
    collectNames();
    showNames();
    boxes.forEach((box) => {
        box.addEventListener('click', () => {
            if (game) {
                box.style.background = playerInfo[currentPlayer].color;
                box.style.color = 'white';
                box.firstElementChild.classList.remove('hide');
                box.classList.add('noclick');
                let val = parseInt(box.firstElementChild.innerHTML);
                playerInfo[currentPlayer].score += val;
                setTimeout(() => {
                    showScore();
                    winCheck();
                    declare();
                    switchPlayer();
                }, 600)
            }
            if (game === false) {
                setTimeout(() => {
                    hideActive();
                }, 700)
            }
        })
    });
}

mainGame();





startBtn.addEventListener('click', startGame);
startBtn.addEventListener('mouseenter', () => {startBtn.classList.add('animate')});
startBtn.addEventListener('mouseleave', () => {startBtn.classList.remove('animate')});
resetBtn.addEventListener('click', masterReset);
