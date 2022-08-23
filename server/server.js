const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

app.get('/',(req,res) =>{
    res.sendFile('C:/Users/Daniel/Code/node-js/multiplayer-pong-game-1/client/index.html');
})
server.listen(80);