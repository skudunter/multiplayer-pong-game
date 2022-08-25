const socket = io(); //init io

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

function sound(src) {
  //sound constructor to use sounds
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function () {
    this.sound.play();
  };
  this.stop = function () {
    this.sound.pause();
  };
}

// let scoreSound = new sound('C:/Users/Daniel/Code/node-js/multiplayer-pong-game-1/assets/score.wav');
// let collideSound = new sound('C:/Users/Daniel/Code/node-js/multiplayer-pong-game-1/assets/collide.wav');
document.addEventListener("keydown", handleKeyPress); //looks for keypress events on the canvas

socket.on("init", (id) => {
  //on connection to server
  console.log("My id: " + id);
});

socket.on("update gameState", (state) => {
  //redraw client side each time server updates gameState
  gameState = state;
  requestAnimationFrame(() => {
    drawGame(gameState);
  }); //draw
});

function handleKeyPress(e) {
  if (e.keyCode == 38) {
    //up arrow
    socket.emit("upKeyPress", socket.id);
  } else if (e.keyCode == 40) {
    //down arrow
    socket.emit("downKeyPress", socket.id);
  }
}
