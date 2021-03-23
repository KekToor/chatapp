const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketio(server);


app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {

    socket.on('login', msg =>{
        io.emit('message',  "Vítej, " + msg);
    })

    socket.on('chat', (msg, username) => {
        io.emit('chat', msg, username);
    });
});


const PORT = process.env.PORT || 5000;
server.listen(PORT, function(){
    console.log(`Server listening on port ${PORT}`);
});