const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketio(server);


app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {

    socket.on('login', (msg) =>{
        socket.emit('message', msg);
        io.emit('welcome', msg);
    })

    socket.on('chat', (msg, username) => {
        io.emit('chat', msg, username);
    });

    socket.on('info', (msg) =>{
        io.emit('info', msg);
    })

    socket.on('disconnect', (reason) =>{
        console.log(reason);
    })
});


const PORT = process.env.PORT || 5000;
server.listen(PORT, function(){
    console.log(`Server listening on port ${PORT}`);
});