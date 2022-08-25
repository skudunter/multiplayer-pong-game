const socket = io(); //init io

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
    x: WIDTH - PLAYERWIDTH,
    y: HEIGHT / 2,
    score: {
      value: 0,
      x: 900, //placeholder
      y: 200, //placeholder
    },
  },
};

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
