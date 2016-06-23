function MatchController(){

    this.gameID = null;
    this.board = null;
    var self = this;

    this.loadMatchUI = function(id){
        this.gameID = id;
        this.board = new Board(false);
        console.log(this.board);

        matchview.viewMatchButtons();
        matchview.viewMatchCanvas();

    };


    this.gotoHomeUI = function(){

        matchview.removeMatchCanvas();
        matchview.removeMatchButtonsView();

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

        apicontroller.takeShot(self.gameID, {
            "x": chrX,
            "y": mouseCellY+1
        }, function(result) {

            console.log(result);

            matchview.showPopUp(result);
            self.gotoHomeUI();
        });

    };

    this.goHome = function () {
        matchview.hidePopUp();
    };
}



var matchcontroller = new MatchController();
