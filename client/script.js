
const socket = io();

let gameState = { //gamestate object
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

