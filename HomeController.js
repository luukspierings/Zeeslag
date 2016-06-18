
function Game(id, status, enemyName){
    this.id = id;
    this.status = status;
    this.enemyName = enemyName;

    this.viewGame = function(){

        if (status == "queue") {
            viewQueueGame(id, status);
        }
        else if (status == "setup") {
            viewSetupGame(id, status, enemyName);
        }
        else if (status == "started") {
            viewStartedGame(id, status, enemyName);
        }

    }

}


function HomeController(){
    var self = this;
    self.games = [];

    this.loadGames = function(callback){
        var data = getGames();

        data.success(function (data) {
            self.games = [];
            for (var i = 0; i < data.length; i++) {
                self.games.push(new Game(data[i]._id, data[i].status, data[i].enemyName));
            }
            callback();
        });
    };

    this.viewGames = function(){
        removeGameListView();
        viewLoadImage();

        this.loadGames(function(){
            removeLoadImage();
            var x=0;
            while (x < self.games.length){
                self.games[x].viewGame();
                x++;
            }
        });
    };

    this.setup = function(){
        viewHomeButtons();
        this.viewGames();
        //console.log(this.games[0]);
    };

    this.newPlayerGame = function(){
        var data = getNewPlayerGame();
        data.success(function (data) {

            self.viewGames();

        });
    };

    this.newAIGame = function(){

        var data = getNewAIGame();
        data.success(function (data) {

            self.viewGames();

        });
    };

    this.removeAllGames = function(){
        var data = deleteAllGames();
        data.success(function (data) {

            self.viewGames();

        });

    };

    this.gotoBuildUI = function(id){
        console.log(id);
        removeGameListView();
        removeHomeButtonsView();

        buildcontroller.loadBuildUI(id);
    }

    this.gotoMatchUI = function(id){
        console.log(id);
        removeGameListView();
        removeHomeButtonsView();

        matchcontroller.loadMatchUI(id);
    }

    this.showOverlay = function(){
        showOverlay();
    }

}


var homecontroller = new HomeController();







