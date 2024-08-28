/*-------------------------------- Constants --------------------------------*/

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

/*---------------------------- Variables (state) ----------------------------*/

let board;
let turn;
let winner;
let tie;

/*------------------------ Cached Element References ------------------------*/

const squareEls = document.querySelectorAll('.sqr');
const messageEl = document.querySelector('#message');
const resetBtnEl = document.querySelector('#reset');

/*-------------------------------- Functions --------------------------------*/

const init = () => {
    board = [
        '', '', '',
        '', '', '',
        '', '', '',
    ];
    turn = 'X';
    winner = false;
    tie = false;
    render();
};

const render = () => {
    updateBoard();
    updateMessage();
};

const updateBoard = () => {
    board.forEach((element, idx) => {
        if (element === 'X') {
            squareEls[idx].textContent = 'X';
        } else if (element === 'O') {
            squareEls[idx].textContent = 'O';
        } else {
            squareEls[idx].textContent = '';
        }
    });
};

const updateMessage = () => {
    if (winner === false && tie === false) {
        messageEl.textContent = `It is now ${turn}'s turn.`;
    } else if (winner === false && tie === true) {
        messageEl.textContent = `It is a tie! Click Reset to try again.`;
    } else {
        messageEl.textContent = `Congratulations, player ${turn}! You have won this round!`;
    }
};


const handleClick = (event) => {
    const squareIndex = event.target.id;
    if (board[squareIndex] !== '' || winner === true) {
        return;
    }
    placePiece(squareIndex);
    checkForWinner();
    checkForTie();
    switchPlayerTurn();
    render();
};

const placePiece = (index) => {
    board[index] = turn;
};

const checkForWinner = () => {
    winningCombos.forEach((combo) => {
        if (
            board[combo[0]] !== '' && 
            board[combo[0]] === board[combo[1]] &&
            board[combo[0]] === board[combo[2]]
        ) {
            winner = true;
        }
    });
};

const checkForTie = () => {
    if (winner === true) {
        return;
    }
    if (!board.includes('')) {
        tie = true;
    }
};

const switchPlayerTurn = () => {
    if (winner === true) {
        return;
    } else if (winner === false) {
        if (turn === 'X') {
            turn = 'O';
        } else if (turn === 'O') {
            turn = 'X';
        }
    }
};

init();
/*----------------------------- Event Listeners -----------------------------*/

squareEls.forEach((square) => {
    square.addEventListener('click', handleClick);
});

resetBtnEl.addEventListener('click', init);