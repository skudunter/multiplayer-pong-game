const {
  FPS,
  WIDTH,
  HEIGHT,
  PLAYERWIDTH,
  PLAYERHEIGHT,
  BALLRADIUS,
  SPEED,
  ACCELERATION,
  PLAYERSPEED,
} = require("C:/Users/Daniel/Code/node-js/multiplayer-pong-game-1/client/constants.js"); //get constants
let gameState = {
  //gamestate object
  player1: {
    x: PLAYERWIDTH / 2,
    y: HEIGHT / 2 - PLAYERHEIGHT / 2,
    score: {
      value: 0,
      x: 320, //placeholder
      y: 200, //placeholder
    },
  },
  ball: {
    x: WIDTH / 2 + BALLRADIUS / 2,
    y: HEIGHT / 2 + BALLRADIUS / 2,
  },
  player2: {
    x: WIDTH - PLAYERWIDTH / 2,
    y: HEIGHT / 2 - PLAYERHEIGHT / 2,
    score: {
      value: 0,
      x: 900, //placeholder
      y: 200, //placeholder
    },
  },
};
const io = require("./server.js"); //get io

let velocity = { x:getRandomVelocity(), y: getRandomVelocity() }; //velocity for ball

function startGame() {
  //start the game gets exported then sent to setinterval
  updateBall();
  io.emit("update gameState", gameState); //update gameState
}

function updateBall() {
  gameState.ball.x = gameState.ball.x + velocity.x;
  gameState.ball.y = gameState.ball.y + velocity.y;

  // ball colisions logic in y plane
  if (gameState.ball.y + BALLRADIUS >= HEIGHT) {
    velocity.y = -velocity.y;
  } else if (gameState.ball.y - BALLRADIUS <= 0) {
    velocity.y = -velocity.y;
  }
  // ball score mechanics
  if (gameState.ball.x + BALLRADIUS >= WIDTH) {
    gameState.player1.score.value++;
    gameState.ball.x = WIDTH / 2 + BALLRADIUS / 2;
    gameState.ball.y = HEIGHT / 2 + BALLRADIUS / 2;
    velocity.x = getRandomVelocity();
    velocity.y = getRandomVelocity();
  } else if (gameState.ball.x - BALLRADIUS <= 0) {
    gameState.player2.score.value++;
    gameState.ball.x = WIDTH / 2;
    gameState.ball.y = HEIGHT / 2;
    velocity.x = getRandomVelocity();
    velocity.y = getRandomVelocity();
  }

  if (
    gameState.ball.x - BALLRADIUS <= gameState.player1.x + PLAYERWIDTH / 2 &&
    gameState.ball.y <= gameState.player1.y + PLAYERHEIGHT &&
    gameState.ball.y >= gameState.player1.y 
  ) {
    velocity.x = -velocity.x;
  } else if (
    gameState.ball.x + BALLRADIUS >= gameState.player2.x - PLAYERWIDTH / 2 &&
    gameState.ball.y <= gameState.player2.y + PLAYERHEIGHT &&
    gameState.ball.y >= gameState.player2.y
  ) {
    velocity.x = -velocity.x;
  }
}
function player1MoveUp() {
  gameState.player1.y += -PLAYERSPEED;
  //io.emit("update gameState", gameState); //update gameState
}

function player2MoveUp() {
  gameState.player2.y += -PLAYERSPEED;
  //io.emit("update gameState", gameState); //update gameState
}

function player1MoveDown() {
  gameState.player1.y += PLAYERSPEED;
  //io.emit("update gameState", gameState); //update gameState
}

function player2MoveDown() {
  gameState.player2.y += PLAYERSPEED;
  //io.emit("update gameState", gameState); //update gameState
}

function getRandomVelocity() {
  let value = Math.random() * 2 - 1;
  if (value >= 0) {
    value += 2;
  } else if (value < 0) {
    value += -2;
  }
  return value * SPEED;
}
module.exports = {
  startGame: function () {
    startGame();
  },
  player1MoveUp: function () {
    player1MoveUp();
  },
  player2MoveUp: function () {
    player2MoveUp();
  },
  player1MoveDown: function () {
    player1MoveDown();
  },
  player2MoveDown: function () {
    player2MoveDown();
  },
};
