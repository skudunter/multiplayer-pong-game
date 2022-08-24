const constants = require('./constants');

function startGame(){
 
}

function updateBall(){

}

function getGameState(){
    return gameState = { //gamestate object
        player1: {
            x: 0,
            y: HEIGHT / 2,
            score: {
                value: 0,
                x: 320,//placeholder
                y: 200//placeholder
            }
        },
        ball: {
            x: WIDTH / 2,
            y: HEIGHT / 2
        },
        player2: {
            x: WIDTH - PLAYERWIDTH,
            y: HEIGHT / 2,
            score: {
                value: 0,
                x: 900,//placeholder
                y: 200//placeholder
            }
        }
    }
}


