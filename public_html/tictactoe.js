/**
 * @author Jack Gammon
 * @type game
 */

var tokens = ["O", "X"];
var display;

var game = function () {
    "use strict";
    var gameReturner = {};
    var playerToken = 0;
    var computerToken = 1;
    var board;
    var boardHasEmptySpace;
    var makeMove;
    var isValidMove;
    var generateComputerMove;
    var waiting;
    var isWinningMove;
    var randomPosition;
    var getRandomNumber;

    gameReturner.newGame = function (pT, playerStarts) {
        playerToken = tokens.indexOf(pT);

        computerToken = (playerToken === 0)
                ? 1
                : 0;
        board = [[null, null, null], [null, null, null], [null, null, null]];
        waiting = true;

        display.clearBoard();
        if (playerStarts === "undefined" || playerStarts === false) {
            makeMove(generateComputerMove(), tokens[computerToken]);
        }
    };

    gameReturner.makePlay = function (position) {
        if (waiting && isValidMove(position)) {
            waiting = false;

            // player move
            var victory = makeMove(position, tokens[playerToken]);

            if (victory) {
                display.animateVictory(victory);
                //player wins
                console.log("player win: " + victory);
            } else {
                victory = makeMove(generateComputerMove(), tokens[computerToken]);
                if (victory) {
                    display.animateVictory(victory);
                    //computer wins
                    console.log("computer win: " + victory);
                } else {
                    waiting = true;
                }
            }


        } else {
            console.log("makePlay was called, but not waiting or is not valid move");
        }
    };


    // Checks if there is space at given position
    isValidMove = function (position) {
        return (!board[position.y][position.x]);
    };

    makeMove = function (position, token) {
        if (isValidMove(position)) {
            board[position.y][position.x] = token;
        }

        display.updateGrid(board);
        return isWinningMove(position);
    };


    isWinningMove = function (position) {
        var x = position.x;
        var y = position.y;
        console.log("Checking move: " + x + " " + y);

        // accross
        if (board[y][0] === board[y][1] && board[y][1] === board[y][2]) {
            console.log("Winning move: " + x + " " + y);
            if (y === 0) {
                return "top-hor-victory";
            }
            if (y === 1) {
                return "middle-hor-victory";
            }
            return "bottom-hor-victory";
        }
        // vertical
        if (board[0][x] === board[1][x] && board[1][x] === board[2][x]) {
            console.log("Winning move: " + x + " " + y);
            if (x === 0) {
                return "left-vert-victory";
            }
            if (x === 1) {
                return "middle-vert-victory";
            }
            return "right-vert-victory";
        }

        // diags
        //check move is elegible for diag
        if ((x === 1 && y === 1) || (x !== 1 && y !== 1)) {
            if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== null) {
                console.log("Winning move: " + x + " " + y);
                return "backward-diag-victory";
            }
            if (board[0][2] === board[1][1] && board[0][2] === board[2][0] && board[0][0] !== null) {
                console.log("Winning move: " + x + " " + y);
                return "forward-diag-victory";
            }
        }
        return;
    };



    // Generates a move for the computer, for now just random
    generateComputerMove = function () {
        if (boardHasEmptySpace) {
            var move = randomPosition();
            while (!isValidMove(move)) {
                move = randomPosition();
            }
            console.log("Computer move generated: " + move.toString());
            return move;
        }
    };


    randomPosition = function () {
        return new Position(getRandomNumber(0, 2), getRandomNumber(0, 2));
    };

    getRandomNumber = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    boardHasEmptySpace = function () {
        var i;
        for (i = 0; i < board.length; i += 1) {
            if (board[i].indexOf(null) > -1) {
                return true;
            }
        }
        return false;
    };



    return gameReturner;
}();

// Represents a position on the board
function Position(x, y) {
    "use strict";

    this.x = x;
    this.y = y;

    this.oneDimPosition = function () {
        return ((this.y * 3) + this.x);
    };

    this.toString = function () {
        return ("X: " + this.x + " Y: " + this.y);
    };
}

function translatePercentage(value) {
    "use strict";
    if (value < 33) {
        return 0;
    }
    if (value < 66) {
        return 1;
    }
    return 2;
}

function clicked(evt) {
    "use strict";
    var e = evt.target;
    var dim = e.getBoundingClientRect();
    var x = evt.clientX - dim.left;
    var y = evt.clientY - dim.top;

    var temp = new Position(translatePercentage(Math.floor(x / dim.width * 100)), translatePercentage(Math.floor(y / dim.height * 100)));


    game.makePlay(temp);
}