const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const {gameState} = require('./game.js');
startGame = require('./game.js');
const {
  FPS,
} = require("C:/Users/Daniel/Code/node-js/multiplayer-pong-game-1/client/constants.js"); //get constants

let players = [];//array of players

//link static files
app.use(express.static("client"));
app.use(express.static("assets"));

app.get("/", (req, res) => {
  //initial get request
  res.sendFile(
    "C:/Users/Daniel/Code/node-js/multiplayer-pong-game-1/client/index.html"
  );
});
server.listen(80); //listen on port 80

io.on("connection", (socket) => {
  if (players.length < 2) {
    console.log("client has connected: " + socket.id);
    players.push(socket.id); //update the players array
    socket.emit("init", socket.id);
    if (players.length == 2) {
      //startgame
      const InterValID = setInterval(startGame, 1000 / FPS);
    }
  }
  socket.on("disconnect", () => {
    //splice the disconnected player outof the players array
    for (let i = 0; i < players.length; i++) {
      if (players[i] == socket.id) {
        players.splice(i);
        console.log("id: " + socket.id + " has disconnected");
      }
    }
  });
});

