

function getGames(){
    return $.get("https://zeeslagavans3.herokuapp.com/users/me/games?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.ImxjcC5zcGllcmluZ3NAc3R1ZGVudC5hdmFucy5ubCI.N44IKbE8aRHyqWz0zMfSswadOUNYs0lr9KShnLpw9KQ", function(data, status){
    });
}

function getNewPlayerGame(){

    return $.get("https://zeeslagavans3.herokuapp.com/games?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.ImxjcC5zcGllcmluZ3NAc3R1ZGVudC5hdmFucy5ubCI.N44IKbE8aRHyqWz0zMfSswadOUNYs0lr9KShnLpw9KQ", function(data, status){
    });

}

function getNewAIGame(){

    return $.get("https://zeeslagavans3.herokuapp.com/games/AI?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.ImxjcC5zcGllcmluZ3NAc3R1ZGVudC5hdmFucy5ubCI.N44IKbE8aRHyqWz0zMfSswadOUNYs0lr9KShnLpw9KQ", function(data, status){
    });

}

function deleteAllGames(){

    return $.ajax({
        url: 'https://zeeslagavans3.herokuapp.com/users/me/games?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.ImxjcC5zcGllcmluZ3NAc3R1ZGVudC5hdmFucy5ubCI.N44IKbE8aRHyqWz0zMfSswadOUNYs0lr9KShnLpw9KQ',
        type: 'DELETE'
    });

}

function getShips(){
    return $.get("https://zeeslagavans3.herokuapp.com/ships?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.ImxjcC5zcGllcmluZ3NAc3R1ZGVudC5hdmFucy5ubCI.N44IKbE8aRHyqWz0zMfSswadOUNYs0lr9KShnLpw9KQ", function(data, status){
    });
}

function getMatch(matchId, callback) {
    if (!callback) return false;
    $.get("https://zeeslagavans3.herokuapp.com/games/" + matchId + "/?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.ImxjcC5zcGllcmluZ3NAc3R1ZGVudC5hdmFucy5ubCI.N44IKbE8aRHyqWz0zMfSswadOUNYs0lr9KShnLpw9KQ", callback);
}

function postBoard(data, id, callback){
    $.ajax({
        type: "POST",
        url: "https://zeeslagavans3.herokuapp.com/games/" + id + "/gameboards?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.ImxjcC5zcGllcmluZ3NAc3R1ZGVudC5hdmFucy5ubCI.N44IKbE8aRHyqWz0zMfSswadOUNYs0lr9KShnLpw9KQ",
        data: data,
        success: function(data){
            callback();
        },
        failure: function(errMsg) {
            console.log(errMsg);
        }
    });

}

function takeShot(matchId, shot, callback) {
    if (!callback) return false;

    $.ajax({
        type: "POST",
        url: "https://zeeslagavans3.herokuapp.com/games/" + matchId + "/shots?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.ImxjcC5zcGllcmluZ3NAc3R1ZGVudC5hdmFucy5ubCI.N44IKbE8aRHyqWz0zMfSswadOUNYs0lr9KShnLpw9KQ",
        data: shot,
        success: callback
    });
}