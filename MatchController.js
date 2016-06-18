function MatchController(){

    this.gameID = null;
    this.board = null;
    var self = this;

    this.loadMatchUI = function(id){
        this.gameID = id;
        this.board = new MatchBoard();

        viewMatchCanvas();
        viewMatchButtons();
        drawMatchBoard(self.board);

    };


    this.gotoHomeUI = function(){

        removeMatchCanvas();
        removeMatchButtonsView();

        homecontroller.setup();


    };

    this.takeAShot = function(x, y) {

        var boardW = this.board.boardW;
        var boardH = this.board.boardH;
        var rectPad = this.board.rectPad;
        var amountOfRect = this.board.amountOfRect;
        var rectWidth = (boardW - ((rectPad * amountOfRect) + rectPad)) / amountOfRect;
        var rectHeight = (boardH - ((rectPad * amountOfRect) + rectPad)) / amountOfRect;
        var board = this.board;

        var mouseCellX = null;
        var mouseCellY = null;

        for (var cx = 0; cx < amountOfRect; cx++) {
            for (var cy = 0; cy < amountOfRect; cy++) {
                if (x > (rectPad + (rectPad + rectWidth) * cx) && x < (rectPad + (rectPad + rectWidth) * cx) + rectWidth
                    && y > (rectPad + (rectPad + rectHeight) * cy) && y < (rectPad + (rectPad + rectHeight) * cy) + rectHeight) {
                    mouseCellX = cx;
                    mouseCellY = cy;
                }
            }
        }

        var chrX = String.fromCharCode(97 + mouseCellX);

        console.log(chrX + " - " + mouseCellY);

        takeShot(self.gameID, {
            "x": chrX,
            "y": mouseCellY+1
        }, function(result) {

            console.log(result);
            self.gotoHomeUI();
        });
    };
}

function MatchBoard(){
    this.boardW = 640;
    this.boardH = 640;
    this.rectPad = 5;
    this.amountOfRect = 10;
    this.squares = new Array(this.amountOfRect);

    for(var x1 = 0; x1 < this.amountOfRect; x1++){
        this.squares[x1] = new Array(this.amountOfRect);
    }

    for(var x = 0; x < this.amountOfRect; x++){
        for(var y = 0; y < this.amountOfRect; y++){
            this.squares[x][y] = new Square(x,y);
        }
    }



}

function Square(x,y, shot){
    this.x = x;
    this.y = y;
    this.shot = shot;
}

var matchcontroller = new MatchController();
