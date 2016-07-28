/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var display = (function () {
    var displayReturner = {};

    displayReturner.hideButtons = (function () {
        //document.querySelectorAll("#buttons").style.visibility = "hidden";
    });

    //Ensure all offsets and whatnot are clear
    displayReturner.clearBoard = (function () {
        var elements = document.querySelectorAll("circle, [id^=crossCell] line");
        for (var i = 0; i < elements.length; i++) {
            var path = svgLineLength(elements[i]);
            var element = elements[i];
            element.style.transition = "stroke-dashoffset 0.5s linear";
            element.style.strokeDasharray = path;
            element.style.strokeDashoffset = path;
        }
        
        //handle the victory lines
        elements = document.querySelectorAll("path");
        
        for(var i = 0; i < elements.length; i++){
            var element = elements[i];
            //var pathLength = elements[i].getTotalLength();
            var pathLength = element.getTotalLength();
            element.style.transition = "stroke-dashoffset 0.5s linear";
            element.style.strokeDasharray = pathLength;
            element.style.strokeDashoffset = pathLength;
        }
        
    });

    var svgLineLength = function (element) {
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
        var query;
        if (token === "X") {
            query = "#" + cell + " [id^=crossCell] line";
        } else {
            query = "#" + cell + " circle";
        }
        
        var elements = document.querySelectorAll(query);
        
        for(var i = 0; i < elements.length; i++){
            elements[i].style.strokeDashoffset = 0;
        }
    });

    displayReturner.updateGrid = (function (grid) {
        //prettyPrintGrid(grid);
        for (var i = 0; i < grid.length; i++) {
            for (var x = 0; x < grid[i].length; x++) {
                if (grid[i][x] !== null) {
                    animateInToken("tokensCell" + i + x, grid[i][x]);
                }
            }
        }   
    });


    function prettyPrintGrid(grid){
        for(var i = 0; i < grid.length; i++){
            console.log(i + ":\t\t" + grid[i][0] + "\t\t" + grid[i][1] + "\t\t" + grid[i][2] + "\n\n");
        }
    }

    return displayReturner;
})();