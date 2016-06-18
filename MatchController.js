function MatchController(){

    this.gameID = null;
    this.board = null;
    var self = this;

    this.loadMatchUI = function(id){
        this.gameID = id;
        this.board = new Board();

        viewMatchCanvas();
        viewMatchButtons();
        drawMatchBoard(self.board);

    };


    this.gotoHomeUI = function(){

        removeMatchCanvas();
        removeMatchButtonsView();

        homecontroller.setup();


    };
}

function Board(){
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

function Square(x,y){
    this.x = x;
    this.y = y;

}

var matchcontroller = new MatchController();
