const socket = io();
const login = document.getElementById('login');
const loginblock = document.getElementById('loginblock');
const username = document.getElementById('username');
const message = document.getElementById('message');
const send = document.getElementById('send');
const chatBox = document.getElementById('chatbox');
let user;

chatBox.style.display = 'none';

login.addEventListener('click',function(e){
    if(username.value){
        console.log(username.value);
        user = username.value;
        socket.emit('login', username.value);
    }
});

socket.on('message',msg =>{
    console.log(msg);
    loginblock.style.display = 'none';
    chatBox.style.display = 'block';
})

function poslat(){
    if(true){
        console.log(message.value);
        socket.emit('chat', message.value, user);
    }
}

/* WIP
send.addEventListener('click',function(e){
    if(true){
        console.log(message.value);
        socket.emit('chat', message.value, user);
    }
})
*/

socket.on('chat', (msg, username) => {
    console.log(msg);
    chatBox.innerHTML += '<div>' + username + ': ' + msg + '</div>';
});
