
function Game(id, status, enemyName){
    this.id = id;
    this.status = status;
    this.enemyName = enemyName;

    this.viewGame = function() {

        apicontroller.getMatch(this.id, function (data) {
            if (status == "queue") {
                homeview.viewQueueGame(id, status);
            }
            else if (status == "setup") {
                homeview.viewSetupGame(id, status, enemyName);
            }
            else if (status == "started") {
                if (data.yourTurn == true) {
                    homeview.viewStartedGame(id, status, enemyName);
                } else {
                    homeview.viewWaitingGame(id, status, enemyName);
                }
            }
        });
    }
}


function HomeController(){
    var self = this;
    self.games = [];

    this.loadGames = function(callback){
        var data = apicontroller.getGames();

        data.success(function (data) {
            self.games = [];
            for (var i = 0; i < data.length; i++) {
                self.games.push(new Game(data[i]._id, data[i].status, data[i].enemyName));
            }
            callback();
        });
    };

    this.viewGames = function(){
        homeview.removeGameListView();
        homeview.viewLoadImage();

        this.loadGames(function(){
            homeview.removeLoadImage();
            var x=0;
            while (x < self.games.length){
                self.games[x].viewGame();
                x++;
            }
        });
    };

    this.setup = function(){
        homeview.viewHomeButtons();
        this.viewGames();
    };

    this.newPlayerGame = function(){
        var data = apicontroller.getNewPlayerGame();
        data.success(function (data) {

            self.viewGames();

        });
    };

    this.newAIGame = function(){

        var data = apicontroller.getNewAIGame();
        data.success(function (data) {

            self.viewGames();

        });
    };

    this.removeAllGames = function(){
        var data = apicontroller.deleteAllGames();
        data.success(function (data) {

            self.viewGames();

        });

    };

    this.gotoBuildUI = function(id){
        console.log(id);
        homeview.removeGameListView();
        homeview.removeHomeButtonsView();

        buildcontroller.loadBuildUI(id);
    };

    this.gotoMatchUI = function(id){
        console.log(id);
        homeview.removeGameListView();
        homeview.removeHomeButtonsView();

        matchcontroller.loadMatchUI(id);
    };

    this.showOverlay = function(){
        apicontroller.showOverlay();
    };

}


var homecontroller = new HomeController();







