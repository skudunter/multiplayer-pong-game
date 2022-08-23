const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static('client'));
app.use(express.static('assets'))
app.get('/',(req,res) =>{
    res.sendFile('C:/Users/Daniel/Code/node-js/multiplayer-pong-game-1/client/index.html');
})
io.on('connection',(socket) =>{
 console.log('user connected');
 io.emit('hello');
})

server.listen(80);