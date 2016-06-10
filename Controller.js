

function getGames(){
    return $.get("https://zeeslagavans.herokuapp.com/users/me/games?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.ImxjcC5zcGllcmluZ3NAc3R1ZGVudC5hdmFucy5ubCI.N44IKbE8aRHyqWz0zMfSswadOUNYs0lr9KShnLpw9KQ", function(data, status){
    });
}

function getNewPlayerGame(){

    return $.get("https://zeeslagavans.herokuapp.com/games?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.ImxjcC5zcGllcmluZ3NAc3R1ZGVudC5hdmFucy5ubCI.N44IKbE8aRHyqWz0zMfSswadOUNYs0lr9KShnLpw9KQ", function(data, status){
    });

}

function getNewAIGame(){

    return $.get("https://zeeslagavans.herokuapp.com/games/AI?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.ImxjcC5zcGllcmluZ3NAc3R1ZGVudC5hdmFucy5ubCI.N44IKbE8aRHyqWz0zMfSswadOUNYs0lr9KShnLpw9KQ", function(data, status){
    });

}

function deleteAllGames(){

    return $.ajax({
        url: 'https://zeeslagavans.herokuapp.com/users/me/games?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.ImxjcC5zcGllcmluZ3NAc3R1ZGVudC5hdmFucy5ubCI.N44IKbE8aRHyqWz0zMfSswadOUNYs0lr9KShnLpw9KQ',
        type: 'DELETE'
    });

}

function getShips(){
    return $.get("https://zeeslagavans.herokuapp.com/ships?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.ImxjcC5zcGllcmluZ3NAc3R1ZGVudC5hdmFucy5ubCI.N44IKbE8aRHyqWz0zMfSswadOUNYs0lr9KShnLpw9KQ", function(data, status){
    });
}