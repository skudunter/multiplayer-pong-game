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

let scoreSound = new sound('/score.wav');//scores sound
let collideSound = new sound('/collide.wav');//collide sound

document.addEventListener("keydown", handleKeyPress); //looks for keypress events on the canvas
document.addEventListener('click',() =>{
  document.getElementById('a').style.display = 'none';
  document.getElementById('p').style.display = 'none';
  document.getElementById('h1').style.display = 'none';
  document.getElementById('container').style.animationName = 'show';
  document.getElementById('container').style.animationDuration = '4s';
  socket.emit('start game');
});

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

socket.on('scoreSound',() =>{
  scoreSound.play();
});

socket.on('collideSound',() =>{
  collideSound.play();
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
