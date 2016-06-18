function viewMatchCanvas(){
    $('<canvas id="MatchCanvas" width="640" height="640"/>').appendTo('#MatchUI');

    $('body').on('contextmenu', '#MatchCanvas', function(e){ return false; });
    $(window).mousedown(function(e){

    });

}

function removeMatchCanvas() {
    $('#MatchCanvas').remove();
}

function drawMatchBoard(board) {
    var canvas = document.getElementById("MatchCanvas");
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
    
}

function viewMatchButtons(){
    $('<div id="BackBtnBuild" class="listwithstuff">'+
        '<button type="button" class="fullwidthbtn btn btn-primary" onclick="matchcontroller.gotoHomeUI()">' +
        '<span class="glyphicon glyphicon-chevron-left"></span> Terug naar Home'+
        '</button>'+
        '</div>')
        .appendTo('#MatchButtons');
}

function removeMatchButtonsView(){
    $('#BackBtnBuild').remove();
}