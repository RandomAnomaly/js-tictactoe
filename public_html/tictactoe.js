/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var tokens = ["O", "X"];

var game = (function () {
    var gameReturner = {};
    var playerToken = 0;
    var computerToken = 1;
    var board = [[null, null, null],
        [null, null, null],
        [null, null, null]];

    var waiting = true;

    gameReturner.newGame = (function (pT, playerStarts) {
        playerToken = tokens.indexOf(pT);
        computerToken = playerToken === 0 ? 1 : 0;

        display.clearBoard();
        display.hideButtons();
        if (typeof playerStarts === 'undefined' || playerStarts === false) {
            makeMove(generateComputerMove(), tokens[computerToken]);
        }
    });

    gameReturner.makePlay = (function (position) {
        if (waiting && isValidMove(position)) {
            waiting = false;
            
            // player move
            var victory = makeMove(position, tokens[playerToken]);
            
            if(victory){
                display.animateVictory(victory);
                //player wins
                console.log("player win: " + victory);
            } else {
                victory = makeMove(generateComputerMove(), tokens[computerToken]);
                if(victory){
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
    });


    // Checks if there is space at given position
    function isValidMove(position) {
        return (!board[position.y][position.x]);
    }

    function makeMove(position, token) {
        if (isValidMove(position)) {
            board[position.y][position.x] = token;
        }

        display.updateGrid(board);
        return isWinningMove(position);
    }


    function isWinningMove(position) {
        var x = position.x;
        var y = position.y;
        console.log("Checking move: " + x + " " + y)
        
        // accross
        if (board[y][0] === board[y][1] && board[y][1] === board[y][2]) {
            console.log("Winning move: " + x + " " + y)
            if (y === 0) {
                return "top-hor-victory";
            } else if (y === 1) {
                return "middle-hor-victory";
            }
            return "bottom-hor-victory";
        }
        // vertical
        if (board[0][x] === board[1][x] && board[1][x] === board[2][x]) {
            console.log("Winning move: " + x + " " + y)
            if(x===0){
                return "left-vert-victory";
            } else if(x===1){
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
    }



    // Generates a move for the computer, for now just random
    function generateComputerMove() {
        if (boardHasEmptySpace) {
            var move = randomPosition();
            while (!isValidMove(move)) {
                move = randomPosition();
            }
            console.log("Computer move generated: " + move.toString());
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

function translatePercentage(value) {
    if (value < 33) {
        return 0;
    }
    if (value < 66) {
        return 1;
    }
    return 2;
}

function clicked(evt) {
    var e = evt.target;
    var dim = e.getBoundingClientRect();
    var x = evt.clientX - dim.left;
    var y = evt.clientY - dim.top;

    var temp = new Position(translatePercentage(Math.floor(x / dim.width * 100)), translatePercentage(Math.floor(y / dim.height * 100)));


    game.makePlay(temp);
}