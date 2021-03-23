const socket = io();
const login = document.getElementById('login');
const loginblock = document.getElementById('loginblock');
const username = document.getElementById('username');
const message = document.getElementById('message');
const send = document.getElementById('send');
const chatBox = document.getElementById('chatbox');
const chatD = document.getElementById('chatD');
const chatW = document.getElementById('chatW');
let user;

chatD.style.display = 'none';

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
    chatD.style.display = 'block';
    chatW.innerHTML = "Vítej, " + msg;
})

socket.on('welcome', msg =>{
    console.log(msg);
    chatBox.innerHTML += "<div><strong>"+ msg + "</strong> se připojil do chatu. </div>";
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
    chatBox.innerHTML += '<div><strong>' + username + ':</strong> ' + msg + '</div>';
});
