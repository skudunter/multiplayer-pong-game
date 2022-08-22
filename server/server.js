const io = require("socket.io")();
 //13
io.on('connection',(client) => {
    client.emit("hello")
})
io.listen(5500);