//1) Define the required variables used to track the state of the game.

//2) Store cached element references.

//3) Upon loading, the game state should be initialized, and a function should 
//   be called to render this game state.

//4) The state of the game should be rendered to the user.

//5) Define the required constants.

//6) Handle a player clicking a square with a `handleClick` function.

//7) Create Reset functionality.

/*-------------------------------- Constants --------------------------------*/

const choice = ['X', 'O'];
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

/*---------------------------- Variables (state) ----------------------------*/

let board;
let turn;
let winner;
let tie;

/*------------------------ Cached Element References ------------------------*/

const squareEls = document.querySelectorAll('.sqr');
const messageEl = document.querySelector('#message');
const boards = document.querySelectorAll('board');
const resetBtnEl = document.querySelector('#reset');

/*-------------------------------- Functions --------------------------------*/

const render = () => {
    updateBoard();
    updateMessage();
};

const init = () => {
    board = [
        '', '', '',
        '', '', '',
        '', '', ''  
    ];
    turn = choice[0];
    winner === false;
    tie === false;
    render();
};

const updateBoard = () => {
    board.forEach((element, index) => {
        const square = squareEls[index];
        square.textContent = element;
    });
};

const updateMessage = () => {
    if (winner === false && tie === false) {
        messageEl = `It is now ${choice}'s turn.`;
    } else if (winner === false && tie === true) {
        messageEl = 'It is a TIE! Play again!';
    } else {
        messageEl = `Congratulations, player ${choice}! You have won this round!`;
    }
};

const handleClick = (event) => {
    const squareIndex = (event.target.id);
    placePiece(squareIndex);
};

const placePiece = (index) => {
    board[index] = turn;
    console.log(board);
}

/*----------------------------- Event Listeners -----------------------------*/
squareEls.forEach((square) => {
    square.addEventListener('click', handleClick);
});


document.querySelector('#reset').addEventListener('click', init);
init()


