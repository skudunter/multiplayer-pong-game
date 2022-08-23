
const socket = io();

const gameState = { //gamestate object
    player: {
        x:15,
        y: HEIGHT / 2
    },
    ball: {
        x: WIDTH / 2,
        y: HEIGHT / 2
    },
    score: {
        value: 0,
        x: 0,//placeholder
        y: 0//placeholder
    }
}

function setup() {
    let ctx = createCanvas(WIDTH, HEIGHT);//create the canvas
    rectMode(CENTER);
    ellipseMode(CENTER);
    noStroke();
    background(0);
    drawGame(gameState);
}

function drawGame(state) {
    let player = state.player;
    let ball = state.ball;
    let score = state.score;
    drawPlayer(player);//draw the player
    drawBall(ball);//draw the ball
    drawScore(score);//draw the score
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

function drawMiddleLine(){
    for(i = 0;i < HEIGHT/25;i++){
      rect(WIDTH/2,i*25+12,8,15);
    }
}