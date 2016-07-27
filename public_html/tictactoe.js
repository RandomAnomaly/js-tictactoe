/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var tokens = ["O", "X"];

var game = (function () {
    var gameReturner = {};

    var board = [[null, null, null],
        [null, null, null],
        [null, null, null]];

    gameReturner.newGame = (function (playerToken, playerStarts) {
        display.clearBoard();
        display.hideButtons();
        if (typeof playerStarts === 'undefined' || playerStarts === false) {
            makeMove(generateComputerMove(), "X");
        }
        



    });

    

    // Checks if there is space at given position
    function isValidMove(position) {
        return (!board[position.x][position.y]);
    }

    function makeMove(position, token) {
        if (isValidMove(position)) {
            board[position.y][position.x] = token;
        }
        console.log(board);
        display.updateGrid(board);
        // check for a win
    }


    function isWinningMove(position) {
        var x = position.x;
        var y = position.y;
        // accross
        if (board[y][0] === board[y][1] && board[y][1] === board[y][2]) {
            return true;
        }
        return false;
    }
    // Generates a move for the computer, for now just random
    function generateComputerMove() {
        if (boardHasEmptySpace) {
            var move = randomPosition();
            while (!isValidMove(move)) {
                move = randomPosition();
            }
            return move;
        }
    }


    function randomPosition() {
        return new Position(getRandomNumber(0, 2), getRandomNumber(0, 2));
    }

    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function boardHasEmptySpace() {
        for (var i = 0; i < board.length; i++) {
            if (board[i].indexOf(null) > -1) {
                return true;
            }
        }
        return false;
    }



    return gameReturner;
})();

// Represents a position on the board
function Position(x, y) {
    this.x = x;
    this.y = y;

    this.oneDimPosition = function () {
        return ((this.y * 3) + this.x);
    };

    this.toString = function () {
        return ("X: " + this.x + " Y: " + this.y);
    };
}

function clicked(evt) {
    var e = evt.target;
    var dim = e.getBoundingClientRect();
    var x = evt.clientX - dim.left;
    var y = evt.clientY - dim.top;

    console.log("X: " + x + " Y: " + y + " Width: " + dim.width + " Height: " + dim.height);
    //display.clearBoard();
}