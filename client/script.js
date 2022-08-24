
const socket = io();

let gameState = { //gamestate object
    player1: {
        x: 15,
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
        x: WIDTH - 15,
        y: HEIGHT / 2,
        score: {
            value: 0,
            x: 900,//placeholder
            y: 200//placeholder
        }
    }
}

//setup ui

io.on('update', (state) => {
    gameState = state;
    console.log('event received');
})


function drawGame(state) {
    let player1 = state.player1;
    let player2 = state.player2;
    let ball = state.ball;
    drawPlayer(player1);//draw the player
    drawPlayer(player2);//draw the opponent
    drawBall(ball);//draw the ball
    drawScore(player1.score);//draw the score for player 1
    drawScore(player2.score);
    drawMiddleLine();
}

function drawPlayer(player) {
    fill(255);
    rect(player.x, player.y, PLAYERWIDTH, PLAYERHEIGHT);
}

function drawBall(ball) {
    fill(255);
    ellipse(ball.x, ball.y, BALLRADIUS, BALLRADIUS);
}

function drawScore(score) {
    fill(255);
    textSize(TEXTSIZE);
    text(score.value, score.x, score.y, 100, 100);
}

function drawMiddleLine() {
    for (i = 0; i < HEIGHT / 25; i++) {
        rect(WIDTH / 2, i * 25 + 12, 8, 15);
    }
}