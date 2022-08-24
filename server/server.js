const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const constants = require('./constants');
let players = [];
const MULTIPLIER = 4;
let velocityX = (Math.random() * 2 - 1)*MULTIPLIER;
let velocityY = (Math.random() * 2 - 1)*MULTIPLIER;
let gameState = { //gamestate object
    player1: {
        x: 0,
        y: constants.HEIGHT / 2,
        score: {
            value: 0,
            x: 320,//placeholder
            y: 200//placeholder
        }
    },
    ball: {
        x: constants.WIDTH / 2,
        y: constants.HEIGHT / 2
    },
    player2: {
        x: constants.WIDTH - 30,
        y: constants.HEIGHT / 2,
        score: {
            value: 0,
            x: 900,//placeholder
            y: 200//placeholder
        }
    }
}


//link static files
app.use(express.static('client'));
app.use(express.static('assets'));

app.get('/', (req, res) => {//initial get request
    res.sendFile('C:/Users/Daniel/Code/node-js/multiplayer-pong-game-1/client/index.html');
})
server.listen(80);//listen on port 80

io.on('connection', (socket) => {
    if (players.length < 2) {
        console.log('client has connected: ' + socket.id);
        players.push(socket.id);//update the players array
        socket.emit('init', socket.id);
        if (players.length == 2) {
            //startgame
            const InterValID = setInterval(startGame, 1000 / constants.FPS)
        }

    }
    socket.on('disconnect', () => {//splice the disconnected player outof the players array
        for (let i = 0; i < players.length; i++) {
            if (players[i] == socket.id) {
                players.splice(i);
                console.log('id: ' + socket.id + ' has disconnected');
            }
        }
    });
});

function startGame() {
    updateBall();
    io.emit('update gameState', gameState);
}

function updateBall() {
    gameState.ball.x += velocityX;
    gameState.ball.y += velocityY;

    // ball colisions logic
    if (gameState.ball.y + constants.BALLRADIUS >= constants.HEIGHT) {
        velocityY = -velocityY;
    }
    else if (gameState.ball.y <= 0) {
        velocityY = -velocityY;
    }
    if (gameState.ball.x + constants.BALLRADIUS >= constants.WIDTH) {
        gameState.player1.score.value++;
        gameState.ball.x = constants.WIDTH / 2;
        gameState.ball.y = constants.HEIGHT / 2;
        velocityX = (Math.random * 2 - 1)*MULTIPLIER;
        velocityY = (Math.random * 2 - 1)*MULTIPLIER;
    }
    else if (gameState.ball.x <= 0) {
        gameState.player2.score.value++;
        gameState.ball.x = constants.WIDTH / 2;
        gameState.ball.y = constants.HEIGHT / 2;
        velocityX = (Math.random * 2 - 1);
        velocityY = (Math.random * 2 - 1);
    }
    if (gameState.ball.x <= constants.PLAYERWIDTH) {
        velocityX = -velocityX;
    }
}






