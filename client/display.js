//setup ui
var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
ctx.canvas.width = WIDTH;
ctx.canvas.height = HEIGHT;
ctx.moveTo(0, 0);
ctx.fillRect(0, 0, WIDTH, HEIGHT);
drawGame(gameState);

function drawGame(state) {
  //draw the gamestate
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, WIDTH, HEIGHT); //background
  let player1 = state.player1;
  let player2 = state.player2;
  let ball = state.ball;
  drawPlayer(player1); //draw the player
  drawPlayer(player2); //draw the opponent
  drawBall(ball); //draw the ball
  drawScore(player1.score); //draw the score for player 1
  drawScore(player2.score); //draw the score for player 2
  drawMiddleLine();
}

function drawPlayer(player) {
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(player.x, player.y, PLAYERWIDTH, PLAYERHEIGHT);
}

function drawBall(ball) {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, BALLRADIUS, 0, 2 * Math.PI);
  ctx.fillStyle = "#FFFFFF";
  ctx.fill();
}

function drawScore(score) {
  ctx.font = TEXTSIZE + "px " + "Arial";
  ctx.fillText(score.value, score.x, score.y, 100, 100);
}

function drawMiddleLine() {
  for (i = 0; i < HEIGHT / 25; i++) {
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(WIDTH / 2 + 6, i * 25 + 12, 8, 15);
  }
}
