let {
  FPS,
  WIDTH,
  HEIGHT,
  PLAYERWIDTH,
  PLAYERHEIGHT,
  BALLRADIUS,
  SPEED,
  ACCELERATION,
  PLAYERSPEED,
} = require("../client/constants.js"); //get constants
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

let velocity = { x: getRandomVelocity(), y: getRandomVelocity() }; //velocity for ball

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
    io.emit("scoreSound");
  } else if (gameState.ball.x - BALLRADIUS <= 0) {
    gameState.player2.score.value++;
    gameState.ball.x = WIDTH / 2;
    gameState.ball.y = HEIGHT / 2;
    velocity.x = getRandomVelocity();
    velocity.y = getRandomVelocity();
    io.emit("scoreSound");
  }

  if (
    gameState.ball.x - BALLRADIUS <= gameState.player1.x + PLAYERWIDTH / 2 &&
    gameState.ball.y <= gameState.player1.y + PLAYERHEIGHT &&
    gameState.ball.y >= gameState.player1.y
  ) {
    velocity.x = -velocity.x;
    io.emit("collideSound");
  } else if (
    gameState.ball.x + BALLRADIUS >= gameState.player2.x - PLAYERWIDTH / 2 &&
    gameState.ball.y <= gameState.player2.y + PLAYERHEIGHT &&
    gameState.ball.y >= gameState.player2.y
  ) {
    velocity.x = -velocity.x;
    io.emit("collideSound");
  }
}
function player1MoveUp() {
  if (gameState.player1.y > 0) {
    gameState.player1.y += -PLAYERSPEED;
  }
  //io.emit("update gameState", gameState); //update gameState
}

function player2MoveUp() {
  if (gameState.player2.y > 0) {
    gameState.player2.y += -PLAYERSPEED;
  }
  //io.emit("update gameState", gameState); //update gameState
}

function player1MoveDown() {
  if (gameState.player1.y + PLAYERHEIGHT  < HEIGHT) {
    gameState.player1.y += PLAYERSPEED;
  }
  //io.emit("update gameState", gameState); //update gameState
}

function player2MoveDown() {
  if (gameState.player2.y + PLAYERHEIGHT < HEIGHT) {
  gameState.player2.y += PLAYERSPEED;
  }
  //io.emit("update gameState", gameState); //update gameState
}

function getRandomVelocity() {
  let value = Math.random() * 2 - 1;
  value += value >= 0 ? 2 : -2;
  return value * SPEED;
}
module.exports = {
  // startGame: function () {
  //   startGame();
  // },
  // player1MoveUp: function () {
  //   player1MoveUp();
  // },
  // player2MoveUp: function () {
  //   player2MoveUp();
  // },
  // player1MoveDown: function () {
  //   player1MoveDown();
  // },
  // player2MoveDown: function () {
  //   player2MoveDown();
  // },
  startGame,
  player1MoveUp,
  player2MoveUp,
  player1MoveDown,
  player2MoveDown,
};
