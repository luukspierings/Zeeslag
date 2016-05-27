

function loadHomeUI() {
    viewHomeButtons();
    loadGames();
}

function gotoBuildUI(id){
    removeGameListView();
    removeHomeButtonsView();

    loadBuildUI(id);
}



function loadGames(){

    removeGameListView();
    viewLoadImage();

    var data = getGames();
    data.success(function (data) {

        removeLoadImage();
        for (var i = 0; i < data.length; i++) {

            if (data[i].status == "queue") {
                viewQueueGame(data[i]._id, data[i].status);
            }
            else if (data[i].status == "setup") {
                viewSetupGame(data[i]._id, data[i].status, data[i].enemyName);
            }
            else if (data[i].status == "started") {
                viewStartedGame(data[i]._id, data[i].status, data[i].enemyName);
            }

        }
    });
}


function newPlayerGame(){
    var data = getNewPlayerGame();
    data.success(function (data) {

        loadGames();

    });
}

function newAIGame(){

    var data = getNewAIGame();
    data.success(function (data) {

        loadGames();

    });
}

function removeAllGames(){

    var data = deleteAllGames();
    data.success(function (data) {

        loadGames();

    });

}