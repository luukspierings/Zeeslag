
function HomeView(){

    this.viewQueueGame = function(id,status){
        $('<div class="gameborder"><span class="textlabel" style="margin-left: 5px">ID: </span><span id="id">' + id + '</span>' +
            '<span class="textlabel">STATUS: </span><span id="status">' + status +'</span>' +
            '</div>')
            .appendTo('#mainUI');

    };

    this.viewSetupGame = function(id,status,enemyName){
        $('<div class="gameborder"><span class="textlabel" style="margin-left: 5px">ID: </span><span id="id">' + id + '</span>' +
            '<span class="textlabel">STATUS: </span><span id="status">' + status +'</span>' +
            '<span id="enemy"><span class="textlabel">TEGENSTANDER: </span><span>' + enemyName + '</span></span> ' +
            '<button id="setupgame" class="btn btn-primary rightbtn" onclick="' + "homecontroller.gotoBuildUI(" + id + ")" + '">Bouwen</button>' +
            '</div>')
            .appendTo('#mainUI');
    };

    this.viewStartedGame = function(id,status,enemyName) {
        $('<div class="gameborder"><span class="textlabel" style="margin-left: 5px">ID: </span><span id="id">' + id + '</span>' +
            '<span class="textlabel">STATUS: </span><span id="status">' + status +'</span>' +
            '<span id="enemy"><span class="textlabel">TEGENSTANDER: </span><span>' + enemyName + '</span></span> ' +
            '<button id="playgame" style="float: right " class="btn btn-primary rightbtn" onclick="' + "homecontroller.gotoMatchUI(" + id + ")" + '">Speel</button>' +
            '</div>')
            .appendTo('#mainUI');

    };

    this.viewWaitingGame = function(id, status, enemyName) {
        $('<div class="gameborder"><span class="textlabel" style="margin-left: 5px">ID: </span><span id="id">' + id + '</span>' +
            '<span class="textlabel">STATUS: </span><span id="status">' + status +'</span>' +
            '<span id="enemy"><span class="textlabel">TEGENSTANDER: </span><span>' + enemyName + '</span></span> ' +
            '<button id="playgame" style="float: right " class="btn btn-primary rightbtn" onclick="' + "homecontroller.gotoMatchUI(" + id + ")" + '" disabled>Wacht op beurt</button>' +
            '</div>')
            .appendTo('#mainUI');
    };

    this.removeGameListView = function(){
        $('.gameborder').remove();
    };

    this.viewLoadImage = function(){
        $('<img id="loader" class="loadimage" src="loader.gif">').appendTo('#mainUI');
    };

    this.removeLoadImage = function(){
        $('#loader').remove();
    };

    this.viewHomeButtons = function(){
        $('<div id="RefreshBtn" class="listwithstuff">'+
            '<button type="button" class="fullwidthbtn btn btn-success" onclick="homecontroller.viewGames()">'+
            '<span class="glyphicon glyphicon-refresh"></span> Herlaad de spellen'+
            '</button>'+
            '</div>' +
            '<div id="HomeButtonsDelete" class="listwithstuff">'+
            '<button class="fullwidthbtn btn btn-primary" onclick="homecontroller.newPlayerGame()"><span class="glyphicon glyphicon-plus"></span> Nieuw spel tegen speler</button>'+
            '<button class="fullwidthbtn btn btn-primary" onclick="homecontroller.newAIGame()"><span class="glyphicon glyphicon-plus"></span> Nieuw spel tegen AI</button>'+
            '<button class="fullwidthbtn btn btn-danger listwithstuff" onclick="homecontroller.removeAllGames()"><span class="glyphicon glyphicon-ban-circle"></span> Alle spellen verwijderen</button>'+
            '</div>')
            .appendTo('#HomeButtonsCreate');
    };

    this.removeHomeButtonsView = function(){
        $('#RefreshBtn').remove();
        $('#HomeButtonsDelete').remove();
    };
}

var homeview = new HomeView();
