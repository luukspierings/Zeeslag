
function BuildView(){
    this.viewCanvas = function(){
        $('<canvas id="BuildCanvas" width="640" height="640"/>').appendTo('#buildUI');

        $('body').on('contextmenu', '#BuildCanvas', function(e){ return false; });
        $(window).mousedown(function(e){
            var down = false;

            if(e.toElement.id == 'BuildCanvas' && e.which == 1){
                down = true;
            }
            if(e.toElement.id == 'BuildCanvas' && e.which == 3 && !down){
                buildcontroller.turnShip(e.offsetX, e.offsetY);
            }

            $( window ).mousemove(function(e){
                if(e.toElement.id != 'BuildCanvas'){
                    down = false;
                }
                if(down){
                    buildcontroller.dragShip(e.offsetX, e.offsetY);
                }
            });
            $( window ).mouseup(function() {
                down = false;
                buildcontroller.dropShip();
            });
        });

    };

    this.removeCanvas = function(){
        $('#BuildCanvas').remove();
    };



    this.drawBoard = function(board) {
        var canvas = document.getElementById("BuildCanvas");
        var context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);

        var boardW = board.boardW;
        var boardH = board.boardH;
        var rectPad = board.rectPad;
        var amountOfRect = board.amountOfRect;
        var rectWidth = (boardW - ((rectPad * amountOfRect) + rectPad)) / amountOfRect;
        var rectHeight = (boardH - ((rectPad * amountOfRect) + rectPad)) / amountOfRect;
        var cornerRadius = 20;
        var cornerRadius2 = 19;

        var rectX = 0;
        var rectY = 0;

        context.lineJoin = "round";
        context.lineWidth = cornerRadius;
        context.fillStyle = "rgb(6,56,82)";
        context.strokeStyle = "rgb(6,56,82)";

        for (var x = 0; x < amountOfRect; x++) {
            for (var y = 0; y < amountOfRect; y++) {
                rectX = rectPad + (rectPad + rectWidth) * x;
                rectY = rectPad + (rectPad + rectHeight) * y;

                context.strokeStyle = "rgb(100,100,100)";
                context.strokeRect(rectX + (cornerRadius2 / 2), rectY + (cornerRadius2 / 2), rectWidth - cornerRadius2, rectHeight - cornerRadius2);
                context.strokeStyle = "rgb(6,56,82)";
                context.strokeRect(rectX + (cornerRadius / 2), rectY + (cornerRadius / 2), rectWidth - cornerRadius, rectHeight - cornerRadius);
                context.fillRect(rectX + (cornerRadius / 2), rectY + (cornerRadius / 2), rectWidth - cornerRadius, rectHeight - cornerRadius);
            }
        }

        context.fillStyle = "#F0810F";
        context.strokeStyle = "#F0810F";

        for(var z = 0; z < board.ships.length; z++){
            for(var dx = 0; dx < board.ships[z].length; dx++){
                if(board.ships[z].isVertical){
                    rectX = rectPad + (rectPad + rectWidth) * board.ships[z].cellX;
                    rectY = rectPad + ((rectPad + rectHeight) * dx) + ((rectPad + rectHeight) * board.ships[z].cellY);
                    context.strokeRect(rectX+(cornerRadius/2), rectY+(cornerRadius/2), rectWidth-cornerRadius, rectHeight-cornerRadius);
                    context.fillRect(rectX+(cornerRadius/2), rectY+(cornerRadius/2), rectWidth-cornerRadius, rectHeight-cornerRadius);
                }
                else{
                    rectX = rectPad + ((rectPad + rectWidth) * dx) + ((rectPad + rectWidth) * board.ships[z].cellX);
                    rectY = rectPad + ((rectPad + rectHeight)) * board.ships[z].cellY;
                    context.strokeRect(rectX+(cornerRadius/2), rectY+(cornerRadius/2), rectWidth-cornerRadius, rectHeight-cornerRadius);
                    context.fillRect(rectX+(cornerRadius/2), rectY+(cornerRadius/2), rectWidth-cornerRadius, rectHeight-cornerRadius);
                }

            }
        }

    };


    this.drawDragship = function(dragShip, board){

        var context = document.getElementById("BuildCanvas").getContext("2d");

        var boardW = board.boardW;
        var boardH = board.boardH;
        var rectPad = board.rectPad;
        var amountOfRect = board.amountOfRect;
        var rectWidth = (boardW - ((rectPad * amountOfRect) + rectPad)) / amountOfRect;
        var rectHeight = (boardH - ((rectPad * amountOfRect) + rectPad)) / amountOfRect;
        var cornerRadius = 20;

        var rectX = 0;
        var rectY = 0;

        context.lineJoin = "round";
        context.lineWidth = cornerRadius;
        context.fillStyle = "#E6DF44";
        context.strokeStyle = "#E6DF44";

        for(var dx = 0; dx < dragShip.length; dx++){
            if(dragShip.isVertical){
                rectX = rectPad + (rectPad + rectWidth) * dragShip.cellX;
                rectY = rectPad + ((rectPad + rectHeight) * dx) + ((rectPad + rectHeight) * dragShip.cellY);
                context.strokeRect(rectX+(cornerRadius/2), rectY+(cornerRadius/2), rectWidth-cornerRadius, rectHeight-cornerRadius);
                context.fillRect(rectX+(cornerRadius/2), rectY+(cornerRadius/2), rectWidth-cornerRadius, rectHeight-cornerRadius);
            }
            else{
                rectX = rectPad + ((rectPad + rectWidth) * dx) + ((rectPad + rectWidth) * dragShip.cellX);
                rectY = rectPad + ((rectPad + rectHeight)) * dragShip.cellY;
                context.strokeRect(rectX+(cornerRadius/2), rectY+(cornerRadius/2), rectWidth-cornerRadius, rectHeight-cornerRadius);
                context.fillRect(rectX+(cornerRadius/2), rectY+(cornerRadius/2), rectWidth-cornerRadius, rectHeight-cornerRadius);
            }

        }
    };

    this.viewBuildButtons = function(){
        $('<div id="SubmitBtnBuild" >'+
            '<button type="button" class="fullwidthbtn btn btn-success" onclick="buildcontroller.buildDone()">'+
            '<span class="glyphicon glyphicon-ok"></span> Klaar!'+
            '</button>'+
            '</div>' +
            '<div id="BackBtnBuild" class="listwithstuff">'+
            '<button type="button" class="fullwidthbtn btn btn-primary" onclick="buildcontroller.gotoHomeUI()">' +
            '<span class="glyphicon glyphicon-chevron-left"></span> Terug naar Home'+
            '</button>'+
            '</div>')
            .appendTo('#BuildButtons');
    };

    this.removeBuildButtonsView = function(){
        $('#SubmitBtnBuild').remove();
        $('#BackBtnBuild').remove();
    }
}

var buildview = new BuildView();