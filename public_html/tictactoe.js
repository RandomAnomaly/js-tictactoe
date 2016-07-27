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
        if (typeof playerStarts === 'undefined') {
            playerStarts = false;
        }

        console.log("Player Starts: " + playerStarts);
        console.log(generateComputerMove().toString());
        makeMove(generateComputerMove(), "X");



    });

    // Checks if there is space at given position
    function isValidMove(position) {
        return (!board[position.x][position.y]);
    }

    function makeMove(position, token) {
        if (isValidMove(position)) {
            board[position.y][position.x] = token;
        }
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

var display = (function () {
    var displayReturner = {};

    displayReturner.hideButtons = (function () {
        //document.querySelectorAll("#buttons").style.visibility = "hidden";
    });

    displayReturner.clearBoard = (function () {
        var elements = document.querySelectorAll("circle, [id^=crossCell] line");
        for (var i = 0; i < elements.length; i++) {
            var path = pathLength(elements[i]);
            var element = elements[i];
            element.style.transition = "stroke-dashoffset 0.5s linear";
            element.style.strokeDasharray = path;
            element.style.strokeDashoffset = path;
        }
    });

    var pathLength = function (element) {
        if (element.nodeName === 'circle') {
            return circumference(element);
        } else if (element.nodeName === 'line') {
            return lineLength(element);
        }
        return;
    };

    var lineLength = function (element) {
        return distBetweenPoints(element.getAttribute('x1'), element.getAttribute('y1'), element.getAttribute('x2'), element.getAttribute('y2'));
    };

    var distBetweenPoints = function (x1, y1, x2, y2) {
        if (x2 < x1) {
            var temp = x1;
            x1 = x2;
            x2 = temp;
        }
        if (y2 < y1) {
            var temp = y1;
            y1 = y2;
            y2 = temp;
        }
        var x = x2 - x1;
        var y = y2 - y1;

        distSquared = Math.pow(x, 2) + Math.pow(y, 2);

        return Math.sqrt(distSquared);
    };

    var circumference = function (element) {
        // todo memoize
        var r = element.getAttribute("r");
        return (2 * (3.1415 * r));
    };

    var animateInToken = (function (cell, token) {

        
/**
        var element = document.querySelectorAll("g");



        element.style.strokeDasharray = 3;
        console.log(element.nodeName);*/
    });

    displayReturner.updateGrid = (function (grid) {
        for (var i = 0; i < grid.length; i++) {
            for (var x = 0; x < grid[i].length; x++) {
                if (grid[i][x] !== null) {
                    animateInToken("tokensCell" + i + x, grid[i][x]);
                }
            }
        }
    });

    return displayReturner;
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