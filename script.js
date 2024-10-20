// tic tac toe game

// create a cell
function Cell() {
    let value = 0;

    // Accept a player's token to change the cell's value
    function setValue(player) {
        value = player.getToken();
    }

    // Return the cell's value
    function getValue() {
        return value;
    }

    return {
        setValue,
        getValue
    }
}

// create a game board
function gameBoard() {
    const size = 9;
    let gameboard = [];

    // create a 1D array to represent the game board
    for (let i = 0; i < size; i++) {
        gameboard.push(Cell());
    }
    

    // return the game board
    function getGameBoard() {
        return gameboard;
    }

    // display the game board
    function displayGameBoard() {
        for (let i = 0; i < gameboard.length; i += 3) {
            let row = gameboard.slice(i, i + 3);
            let rowValues = row.map(cell => cell.getValue() === 0 ? '-' : cell.getValue());
            console.log(rowValues.join(' | '));
            if (i < gameboard.length - 3) {
                console.log('---------');
        }
    }}

    return {
        getGameBoard,
        displayGameBoard
    }

}


// create a player
function Player(name, token) {
    let player = name;

    // return the player's name
    function getPlayer() {
        return player;
    }

    // return the player's token
    function getToken() {
        return token;
    }

    return {
        getPlayer,
        getToken
    }
}

// create a game
function gameController() {
    let player1 = Player('Player 1', 'X');
    let player2 = Player('Player 2', 'O');
    let currentPlayer = player1;
    let game = gameBoard();
    let gameboard = game.getGameBoard();

    // change the current player
    function changePlayer() {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    }

    // return the current player
    function getCurrentPlayer() {
        return currentPlayer;
    }

    // return the game board
    function getGameBoard() {
        return gameboard;
    }

    // check if a player has won
    function checkWin() {
        let win = false;
        let winConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertical
            [0, 4, 8], [2, 4, 6] // diagonal
        ];

        for (let i = 0; i < winConditions.length; i++) {
            let winCondition = winConditions[i];
            let a = winCondition[0];
            let b = winCondition[1];
            let c = winCondition[2];

            if (gameboard[a].getValue() !== 0 && 
                gameboard[a].getValue() === gameboard[b].getValue() && 
                gameboard[a].getValue() === gameboard[c].getValue()) {
                win = true;
            }
        }

        return win;
    }

    // check if the game is a tie
    function checkTie() {
        let tie = true;

        for (let i = 0; i < gameboard.length; i++) {
            if (gameboard[i].getValue() === 0) {
                tie = false;
            }
        }

        return tie;
    }

    // reset the game
    function resetGame() {
        game = gameBoard();
        gameboard = game.getGameBoard();
    }

    // play the game
    function playGame() {
        let win = false;
        let tie = false;

        while (!win && !tie) {
            game.displayGameBoard();
            let currentPlayer = getCurrentPlayer();
            let move = prompt(`${currentPlayer.getPlayer()}: Enter your move (1-9): `);
            move = move - 1;

            if (gameboard[move].getValue() === 0) {
                gameboard[move].setValue(currentPlayer);
                win = checkWin();
                tie = checkTie();
                changePlayer();
            } else {
                console.log('Invalid move. Try again.');
            }
        }

        game.displayGameBoard();

        if (win) {
            changePlayer(); // change player back to the winning player
            console.log(`${currentPlayer.getPlayer()} wins!`);
        } else if (tie) {
            console.log('It\'s a tie!');
        }
    }

    return {
        changePlayer,
        getCurrentPlayer,
        getGameBoard,
        checkWin,
        checkTie,
        resetGame,
        playGame
    }
}

const game = gameController();
game.playGame();



