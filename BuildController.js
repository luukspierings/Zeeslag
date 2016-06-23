

function BuildController(){

    this.gameID = null;
    this.board = null;
    var self = this;

    this.loadShips = function(){
        var data = apicontroller.getShips();
        data.success(function (data) {
            for(var s = 0; s < data.length; s++){
                self.board.ships.push(new Ship(data[s]._id,data[s].length,true,data[s].name, s));
            }
            buildview.drawBoard(self.board);
        });
    };


    this.loadBuildUI = function(id){
        this.gameID = id;
        this.board = new Board(true);

        buildview.viewBuildButtons();
        buildview.viewCanvas();

        this.loadShips();



    };

    this.dragShip = function(x, y){

        var boardW = this.board.boardW;
        var boardH = this.board.boardH;
        var rectPad = this.board.rectPad;
        var amountOfRect = this.board.amountOfRect;
        var rectWidth = (boardW - ((rectPad * amountOfRect) + rectPad)) / amountOfRect;
        var rectHeight = (boardH - ((rectPad * amountOfRect) + rectPad)) / amountOfRect;
        var board = this.board;
        var ships = this.board.ships;

        var mouseCellX = null;
        var mouseCellY = null;

        // Checks on which square the pointer is.
        for (var cx = 0; cx < amountOfRect; cx++) {
            for (var cy = 0; cy < amountOfRect; cy++) {
                if(x > (rectPad + (rectPad + rectWidth) * cx) && x < (rectPad + (rectPad + rectWidth) * cx)+rectWidth
                    && y > (rectPad + (rectPad + rectHeight) * cy) && y < (rectPad + (rectPad + rectHeight) * cy)+rectHeight){
                    mouseCellX = cx;
                    mouseCellY = cy;
                }
            }
        }

        var dragShip = null;

        if(mouseCellX != null && mouseCellY != null){

            // Puts the dragged ship in dragShip.
            for(var s = 0; s < ships.length; s++){
                if(ships[s].isVertical && ships[s].beingDragged){
                    dragShip = ships[s];
                    mouseCellY = mouseCellY - dragShip.cellDragged;
                }
                else if(!ships[s].isVertical && ships[s].beingDragged){
                    dragShip = ships[s];
                    mouseCellX = mouseCellX - dragShip.cellDragged;
                }
            }

            // If there is no ship dragged, pick it up.
            if(dragShip == null){
                for(var z = 0; z < ships.length; z++){
                    for(var l = 0; l < ships[z].length; l++){
                        if(ships[z].isVertical && ships[z].cellX == mouseCellX && ships[z].cellY + l == mouseCellY){
                            ships[z].cellDragged = l;
                            ships[z].beingDragged = true;
                            dragShip = ships[z];
                            mouseCellY = mouseCellY - l;
                        }
                        else if(!ships[z].isVertical && ships[z].cellX + l == mouseCellX && ships[z].cellY == mouseCellY){
                            ships[z].cellDragged = l;
                            ships[z].beingDragged = true;
                            dragShip = ships[z];
                            mouseCellX = mouseCellX - l;
                        }
                    }
                }
            }

            // Checks if there is a ship in the way.
            if(dragShip != null && (dragShip.cellX != mouseCellX || dragShip.cellY != mouseCellY )) {
                var colliding = false;
                for(var a = 0; a < ships.length; a++){
                    if (dragShip.isVertical && ships[a].isVertical && ships[a]._id != dragShip._id && (
                        mouseCellY + dragShip.length > ships[a].cellY
                        && mouseCellY < ships[a].cellY + ships[a].length
                        && mouseCellX == ships[a].cellX)){

                        colliding = true;
                    }
                    else if (!dragShip.isVertical && ships[a].isVertical && ships[a]._id != dragShip._id && (
                        mouseCellX + dragShip.length > ships[a].cellX
                        && mouseCellX <= ships[a].cellX
                        && mouseCellY >= ships[a].cellY
                        && mouseCellY < ships[a].cellY + ships[a].length)){

                        colliding = true;
                    }
                    else if (dragShip.isVertical && !ships[a].isVertical && ships[a]._id != dragShip._id && (
                        mouseCellX < ships[a].cellX + ships[a].length
                        && mouseCellX >= ships[a].cellX
                        && mouseCellY + dragShip.length > ships[a].cellY
                        && mouseCellY <= ships[a].cellY)){

                        colliding = true;
                    }
                    else if (!dragShip.isVertical && !ships[a].isVertical && ships[a]._id != dragShip._id && (
                        mouseCellX + dragShip.length > ships[a].cellX
                        && mouseCellX < ships[a].cellX + ships[a].length
                        && mouseCellY == ships[a].cellY)){

                        colliding = true;
                    }
                }
                if (dragShip.isVertical && (mouseCellY < 0 || mouseCellY + dragShip.length > this.board.amountOfRect)){
                    colliding = true;
                }
                else if (!dragShip.isVertical && (mouseCellX < 0 || mouseCellX + dragShip.length > this.board.amountOfRect)){
                    colliding = true;
                }

                if(!colliding){
                    dragShip.cellX = mouseCellX;
                    dragShip.cellY = mouseCellY;

                    buildview.drawBoard(board);
                    buildview.drawDragship(dragShip, board);
                }
            }
        }

    };

    this.turnShip = function(x, y){

        var boardW = this.board.boardW;
        var boardH = this.board.boardH;
        var rectPad = this.board.rectPad;
        var amountOfRect = this.board.amountOfRect;
        var rectWidth = (boardW - ((rectPad * amountOfRect) + rectPad)) / amountOfRect;
        var rectHeight = (boardH - ((rectPad * amountOfRect) + rectPad)) / amountOfRect;
        var board = this.board;
        var ships = this.board.ships;

        var mouseCellX = null;
        var mouseCellY = null;

        // Checks on which square the pointer is.
        for (var cx = 0; cx < amountOfRect; cx++) {
            for (var cy = 0; cy < amountOfRect; cy++) {
                if(x > (rectPad + (rectPad + rectWidth) * cx) && x < (rectPad + (rectPad + rectWidth) * cx)+rectWidth
                    && y > (rectPad + (rectPad + rectHeight) * cy) && y < (rectPad + (rectPad + rectHeight) * cy)+rectHeight){
                    mouseCellX = cx;
                    mouseCellY = cy;
                }
            }
        }

        var turningShip = null;
        var turningSquare = null;

        // Checks which ship is on the pointer
        for(var z = 0; z < ships.length; z++){
            for(var l = 0; l < ships[z].length; l++){
                if(ships[z].isVertical && ships[z].cellX == mouseCellX && ships[z].cellY + l == mouseCellY){
                    turningShip = ships[z];
                    turningSquare = l;
                }
                else if(!ships[z].isVertical && ships[z].cellX + l == mouseCellX && ships[z].cellY == mouseCellY){
                    turningShip = ships[z];
                    turningSquare = l;
                }
            }
        }

        if(turningShip != null){
            var colliding = false;

            turningShip.isVertical = !turningShip.isVertical;
            if(turningShip.isVertical){
                turningShip.cellX = turningShip.cellX + turningSquare;
            }
            else{
                turningShip.cellY = turningShip.cellY + turningSquare;
            }

                for(var a = 0; a < ships.length; a++){

                    if (turningShip.isVertical && ships[a].isVertical && ships[a]._id != turningShip._id && (
                        mouseCellY + turningShip.length > ships[a].cellY
                        && mouseCellY < ships[a].cellY + ships[a].length
                        && mouseCellX == ships[a].cellX)){

                        colliding = true;
                    }
                    else if (!turningShip.isVertical && ships[a].isVertical && ships[a]._id != turningShip._id && (
                        mouseCellX + turningShip.length > ships[a].cellX
                        && mouseCellX <= ships[a].cellX
                        && mouseCellY >= ships[a].cellY
                        && mouseCellY < ships[a].cellY + ships[a].length)){

                        colliding = true;
                    }
                    else if (turningShip.isVertical && !ships[a].isVertical && ships[a]._id != turningShip._id && (
                        mouseCellX < ships[a].cellX + ships[a].length
                        && mouseCellX >= ships[a].cellX
                        && mouseCellY + turningShip.length > ships[a].cellY
                        && mouseCellY <= ships[a].cellY)){

                        colliding = true;
                    }
                    else if (!turningShip.isVertical && !ships[a].isVertical && ships[a]._id != turningShip._id && (
                        mouseCellX + turningShip.length > ships[a].cellX
                        && mouseCellX < ships[a].cellX + ships[a].length
                        && mouseCellY == ships[a].cellY)){

                        colliding = true;
                    }



                }
            if (turningShip.isVertical && (mouseCellY < 0 || mouseCellY + turningShip.length > this.board.amountOfRect)){
                colliding = true;
            }
            else if (!turningShip.isVertical && (mouseCellX < 0 || mouseCellX + turningShip.length > this.board.amountOfRect)){
                colliding = true;
            }
            console.log("colliding: " + colliding);

            if(colliding){
                turningShip.isVertical = !turningShip.isVertical;
                if(turningShip.isVertical){

                    turningShip.cellY = turningShip.cellY - turningSquare;
                }
                else{

                    turningShip.cellX = turningShip.cellX - turningSquare;
                }
            }
            else {
                buildview.drawBoard(board);
            }
        }

    };


    this.dropShip = function(){
        for(var i = 0; i < this.board.ships.length; i++){
            if(this.board.ships[i].beingDragged == true){
                this.board.ships[i].beingDragged = false;
                buildview.drawBoard(this.board);
            }
        }
    };

    this.gotoHomeUI = function(){
        buildview.removeCanvas();
        buildview.removeBuildButtonsView();
        homecontroller.setup();
    };

    this.buildDone = function(){
        for(var z = 0; z < this.board.ships.length; z++){
            this.board.ships[z].refreshStartCell();
        }
        var data = {"ships": this.board.ships};
        apicontroller.postBoard(data, this.gameID, this.gotoHomeUI);
    }

}

function Board(isBuilding){
    var me = this;

    this.boardW = 640;
    this.boardH = 640;
    this.rectPad = 5;
    this.amountOfRect = 10;
    this.ships = [];
    this.squares = new Array(this.amountOfRect);

    for(var x1 = 0; x1 < this.amountOfRect; x1++){
        this.squares[x1] = new Array(this.amountOfRect);
    }

    for(var x = 0; x < this.amountOfRect; x++){
        for(var y = 0; y < this.amountOfRect; y++){
            this.squares[x][y] = new Square(x,y,"");
        }
    }

    console.log(isBuilding);
    if(!isBuilding){
        apicontroller.getMatch(matchcontroller.gameID, function (data) {
            var shots = data.enemyGameboard.shots;

            for(var i = 0; i < shots.length; i++){
                var x = shots[i].x.charCodeAt(0) - 97;
                var y = shots[i].y-1;
                var shott = "mis";

                if(Object.keys(shots[i]).length == 4) {
                    shott = "hit";
                }

                me.squares[x][y] = new Square(x,y,shott);
            }

            matchview.drawMatchBoard(me);
        });
    }


}


function Square(x,y, shot){
    this.x = x;
    this.y = y;
    this.shot = shot
}

function Ship(id, length, isVertical, name, cellX){

    this.refreshStartCell = function(){
        this.startCell = {x: numberToAlphabet(this.cellX), y: this.cellY+1};
    };


    this._id = id;
    this.length = length;
    this.isVertical = true;
    this.name = name;
    this.cellX = cellX;
    this.cellY = 0;
    this.cellDragged = 0;
    this.beingDragged = false;
    this.startCell = {x: numberToAlphabet(this.cellX), y: this.cellY+1};

}

function numberToAlphabet (number) {
    var alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
    return alphabet[number]

}

var buildcontroller = new BuildController();





