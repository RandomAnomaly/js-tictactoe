/**
 * @author Jack Gammon
 * @type displayReturner
 */

var display = (function () {
    "use strict";
    var displayReturner = {};
    var circumference;
    var svgLineLength;
    var lineLength;
    var distBetweenPoints;

    //Ensure all offsets and whatnot are clear
    displayReturner.clearBoard = function () {
        var i;
        var path;
        var element;
        var pathLength;
        var elements = document.querySelectorAll("circle, [id^=crossCell] line");


        for (i = 0; i < elements.length; i += 1) {
            path = svgLineLength(elements[i]);
            element = elements[i];
            element.style.transition = "stroke-dashoffset 0.5s linear";
            element.style.strokeDasharray = path;
            element.style.strokeDashoffset = path;
        }

        //handle the victory lines
        elements = document.querySelectorAll("path");

        for (i = 0; i < elements.length; i += 1) {
            element = elements[i];
            //var pathLength = elements[i].getTotalLength();
            pathLength = element.getTotalLength();
            element.style.transition = "stroke-dashoffset 0.5s linear";
            element.style.strokeDasharray = pathLength;
            element.style.strokeDashoffset = pathLength;
        }

    };

    svgLineLength = function (element) {
        if (element.nodeName === "circle") {
            return circumference(element);
        }
        if (element.nodeName === "line") {
            return lineLength(element);
        }
        return;
    };

    lineLength = function (element) {
        return distBetweenPoints(element.getAttribute("x1"), element.getAttribute("y1"), element.getAttribute("x2"), element.getAttribute("y2"));
    };

    distBetweenPoints = function (x1, y1, x2, y2) {
        var temp;
        var x;
        var y;
        var distSquared;
        if (x2 < x1) {
            temp = x1;
            x1 = x2;
            x2 = temp;
        }
        if (y2 < y1) {
            temp = y1;
            y1 = y2;
            y2 = temp;
        }
        x = x2 - x1;
        y = y2 - y1;

        distSquared = Math.pow(x, 2) + Math.pow(y, 2);
        return Math.sqrt(distSquared);
    };

    circumference = function (element) {
        // todo memoize
        var r = element.getAttribute("r");
        return (2 * (3.1415 * r));
    };

    displayReturner.animateVictory = function (line) {
        var element = document.querySelector("#" + line);
        element.style.strokeDashoffset = 0;
    };

    var animateInToken = function (cell, token) {
        var query;
        var i;
        var elements;
        if (token === "X") {
            query = "#" + cell + " [id^=crossCell] line";
        } else {
            query = "#" + cell + " circle";
        }

        elements = document.querySelectorAll(query);

        for (i = 0; i < elements.length; i += 1) {
            elements[i].style.strokeDashoffset = 0;
        }
    };

    displayReturner.updateGrid = function (grid) {
        var i;
        var x;
        for (i = 0; i < grid.length; i += 1) {
            for (x = 0; x < grid[i].length; x += 1) {
                if (grid[i][x] !== null) {
                    animateInToken("tokensCell" + i + x, grid[i][x]);
                }
            }
        }
    };


    return displayReturner;
}());