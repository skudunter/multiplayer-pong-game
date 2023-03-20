const express = require("express");
const app = express();
const path = require("path");
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
let gameStarted = false;
let IntervalID;
module.exports = io; //export io module
//const {gameState} = require('./game.js');
let game = require("./game.js");
const { FPS, PLAYERHEIGHT } = require("../client/constants.js"); //get constants

const PORT = process.env.PORT;

let players = []; //array of players

//link static files
app.use(express.static("client"));

app.get("/score.wav", (req, res) => {
  res.sendFile(path.join(__dirname, "../assets/score.wav"));
});
app.get("/collide.wav", (req, res) => {
  res.sendFile(path.join(__dirname, "../assets/collide.wav"));
});

app.get("/", (req, res) => {
  //initial get request
  res.sendFile(path.join(__dirname, "../client/game.html"));
});
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

io.on("connection", (socket) => {
  if (players.length < 2) {
    console.log("client has connected: " + socket.id);
    players.push(socket.id); //update the players array
    socket.emit("init", socket.id);
    socket.on("start game", () => {
      gameStarted = true;
    });
    if (players.length == 2 && gameStarted) {
      //startgame
     IntervalID = setInterval(game.startGame, 1000 / FPS);
    }
  }
  socket.on("upKeyPress", (id) => {
    if (id == players[0]) {
      //player1 moved
      game.player1MoveUp();
    } else if (id == players[1]) {
      //player2 moved
      game.player2MoveUp();
    }
  });
  socket.on("downKeyPress", (id) => {
    if (id == players[0]) {
      //player1 moved

      game.player1MoveDown();
    } else if (id == players[1]) {
      //player2 moved
      game.player2MoveDown();
    }
  });
  socket.on("disconnect", () => {
    //splice the disconnected player outof the players array
    for (let i = 0; i < players.length; i++) {
      if (players[i] == socket.id) {
        players.splice(i);
        console.log("id: " + socket.id + " has disconnected");
        //revert gamestate back to intial values
        game.restart();
        gameStarted = false;
        clearInterval(IntervalID);
        console.log('game restart');
      }
    }
  });
});
