
function APIController(){

    this.getGames = function(){
        return $.get("https://zeeslagavans3.herokuapp.com/users/me/games?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.ImxjcC5zcGllcmluZ3NAc3R1ZGVudC5hdmFucy5ubCI.N44IKbE8aRHyqWz0zMfSswadOUNYs0lr9KShnLpw9KQ", function(data, status){
        });
    };

    this.getNewPlayerGame = function(){

        return $.get("https://zeeslagavans3.herokuapp.com/games?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.ImxjcC5zcGllcmluZ3NAc3R1ZGVudC5hdmFucy5ubCI.N44IKbE8aRHyqWz0zMfSswadOUNYs0lr9KShnLpw9KQ", function(data, status){
        });

    };

    this.getNewAIGame = function(){

        return $.get("https://zeeslagavans3.herokuapp.com/games/AI?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.ImxjcC5zcGllcmluZ3NAc3R1ZGVudC5hdmFucy5ubCI.N44IKbE8aRHyqWz0zMfSswadOUNYs0lr9KShnLpw9KQ", function(data, status){
        });

    };

    this.deleteAllGames = function(){

        return $.ajax({
            url: 'https://zeeslagavans3.herokuapp.com/users/me/games?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.ImxjcC5zcGllcmluZ3NAc3R1ZGVudC5hdmFucy5ubCI.N44IKbE8aRHyqWz0zMfSswadOUNYs0lr9KShnLpw9KQ',
            type: 'DELETE'
        });

    };

    this.getShips = function(){
        return $.get("https://zeeslagavans3.herokuapp.com/ships?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.ImxjcC5zcGllcmluZ3NAc3R1ZGVudC5hdmFucy5ubCI.N44IKbE8aRHyqWz0zMfSswadOUNYs0lr9KShnLpw9KQ", function(data, status){
        });
    };

    this.getMatch = function(matchId, callback) {
        if (!callback) return false;
        $.get("https://zeeslagavans3.herokuapp.com/games/" + matchId + "/?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.ImxjcC5zcGllcmluZ3NAc3R1ZGVudC5hdmFucy5ubCI.N44IKbE8aRHyqWz0zMfSswadOUNYs0lr9KShnLpw9KQ", callback);
    };

    this.postBoard = function(data, id, callback){
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

    };

    this.takeShot = function(matchId, shot, callback) {
        if (!callback) return false;

        $.ajax({
            type: "POST",
            url: "https://zeeslagavans3.herokuapp.com/games/" + matchId + "/shots?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.ImxjcC5zcGllcmluZ3NAc3R1ZGVudC5hdmFucy5ubCI.N44IKbE8aRHyqWz0zMfSswadOUNYs0lr9KShnLpw9KQ",
            data: shot,
            success: callback
        });
    };
}

var apicontroller = new APIController();