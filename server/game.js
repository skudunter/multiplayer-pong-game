let velocity = { x: 0, y: 0 }; //velocity for ball
const {
  FPS,
  WIDTH,
  HEIGHT,
  PLAYERWIDTH,
  PLAYERHEIGHT,
  BALLRADIUS,
} = require("C:/Users/Daniel/Code/node-js/multiplayer-pong-game-1/client/constants.js"); //get constants

let gameState = {
  //gamestate object
  player1: {
    x: 0,
    y: HEIGHT / 2,
    score: {
      value: 0,
      x: 320, //placeholder
      y: 200, //placeholder
    },
  },
  ball: {
    x: WIDTH / 2,
    y: HEIGHT / 2,
  },
  player2: {
    x: WIDTH - 30,
    y: HEIGHT / 2,
    score: {
      value: 0,
      x: 900, //placeholder
      y: 200, //placeholder
    },
  },
};

function startGame() {
  updateBall();
  io.emit("update gameState", gameState);
}

function updateBall() {
  gameState.ball.x += velocityX;
  gameState.ball.y += velocityY;

  // ball colisions logic
  if (gameState.ball.y + BALLRADIUS >= HEIGHT) {
    velocityY = -velocityY;
  } else if (gameState.ball.y <= 0) {
    velocityY = -velocityY;
  }
  if (gameState.ball.x + BALLRADIUS >= WIDTH) {
    gameState.player1.score.value++;
    gameState.ball.x = WIDTH / 2;
    gameState.ball.y = HEIGHT / 2;
    velocityX = (Math.random * 2 - 1) * MULTIPLIER;
    velocityY = (Math.random * 2 - 1) * MULTIPLIER;
  } else if (gameState.ball.x <= 0) {
    gameState.player2.score.value++;
    gameState.ball.x = WIDTH / 2;
    gameState.ball.y = HEIGHT / 2;
    velocityX = Math.random * 2 - 1;
    velocityY = Math.random * 2 - 1;
  }
  if (gameState.ball.x <= PLAYERWIDTH) {
    velocityX = -velocityX;
  }
}
module.exports = {
  gameState,
  startGame,
};
