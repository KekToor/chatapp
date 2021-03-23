const socket = io();
const login = document.getElementById('login');
const loginblock = document.getElementById('loginblock');
const username = document.getElementById('username');
const message = document.getElementById('message');
const send = document.getElementById('send');
const chatBox = document.getElementById('chatbox');
const chatD = document.getElementById('chatD');
const chatW = document.getElementById('chatW');
const msg = document.getElementById('msg');
const disc = document.getElementById('disc');
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
    chatBox.innerHTML += '<div style = "color : #009900"><strong>'+ msg + '</strong> se připojil do chatu. </div>';
})

/*
function poslat(){
    if(true){
        console.log(message.value);
        socket.emit('chat', message.value, user);
    }
}
*/

msg.addEventListener('click',function(e){
    if(message.value){
        console.log(message.value);
        socket.emit('chat', message.value, user);
    }
})

disc.addEventListener('click', ()=>{
    socket.emit('info', {msg:"se odpojil.", username:user});
    chatBox.innerHTML += '<div style = "color : red"><b>Odpojili jste se.</b></div>';
    socket.close();
})

//Pokoušel jsem se přidat odpojení při zavření záložky, ale bohužel se mi to nepovedlo.


socket.on('chat', (msg, username) => {
    console.log(msg);
    chatBox.innerHTML += '<div><strong>' + username + ':</strong> ' + msg + '</div>';
});

socket.on('info', (msg) => {
    console.log(msg);
    chatBox.innerHTML += '<div style = "color : red"><strong>' + msg.username + '</strong> ' + msg.msg + '</div>';
});

/*
socket.on('disconnect', (reason) =>{
    console.log(reason);
});
*/

