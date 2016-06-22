

function BuildController(){

    this.gameID = null;
    this.board = null;
    var self = this;

    this.loadShips = function(){
        var data = getShips();
        data.success(function (data) {
            for(var s = 0; s < data.length; s++){
                self.board.ships.push(new Ship(data[s]._id,data[s].length,true,data[s].name, s));
            }
            //console.log(data);
            drawBoard(self.board);
        });
    };


    this.loadBuildUI = function(id){
        this.gameID = id;
        this.board = new Board(true);

        viewBuildButtons();
        viewCanvas();

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

        for(var s = 0; s < ships.length; s++){
            if(ships[s].beingDragged){
                dragShip = ships[s];
                mouseCellY = mouseCellY - dragShip.cellDragged;
            }
        }

        if(dragShip == null){
            for(var z = 0; z < ships.length; z++){
                for(var l = 0; l < ships[z].length; l++){
                    if(ships[z].cellX == mouseCellX && ships[z].cellY + l == mouseCellY){
                        ships[z].cellDragged = l;
                        ships[z].beingDragged = true;
                        dragShip = ships[z];
                        mouseCellY = mouseCellY - l;
                    }
                }
            }
        }

        if(dragShip != null && (dragShip.cellX != mouseCellX || dragShip.cellY != mouseCellY ) && mouseCellX != null) {

            var colliding = false;
            for(var a = 0; a < ships.length; a++){
                if (ships[a]._id != dragShip._id && (
                    mouseCellY + dragShip.length > ships[a].cellY && mouseCellY < ships[a].cellY + ships[a].length
                    && mouseCellX == ships[a].cellX)){
                    colliding = true;
                }
            }

            if (mouseCellY < 0 || mouseCellY + dragShip.length > this.board.amountOfRect){
                colliding = true;
            }



            if(!colliding){
                dragShip.cellX = mouseCellX;
                dragShip.cellY = mouseCellY;

                drawBoard(board);
                drawDragship(dragShip, board);
            }
        }




    };

    this.dropShip = function(){

        for(var i = 0; i < this.board.ships.length; i++){
            if(this.board.ships[i].beingDragged == true){
                this.board.ships[i].beingDragged = false;
                drawBoard(this.board);
            }
        }
        //for(var z = 0; z < this.board.ships.length; z++){
        //    console.log("id: " + this.board.ships[z]._id);
        //    console.log(this.board.ships[z].cellX);
        //    console.log(this.board.ships[z].cellY);
        //}

    };

    this.gotoHomeUI = function(){

        removeCanvas();
        removeBuildButtonsView();

        homecontroller.setup();


    };

    this.buildDone = function(){

        for(var z = 0; z < this.board.ships.length; z++){
            this.board.ships[z].refreshStartCell();
        }
        var data = {"ships": this.board.ships};
        postBoard(data, this.gameID, this.gotoHomeUI);


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
        getMatch(matchcontroller.gameID, function (data) {
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

            drawMatchBoard(me);
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




    console.log(this.startCell);

}

function numberToAlphabet (number) {
    var alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
    return alphabet[number]

}

var buildcontroller = new BuildController();





