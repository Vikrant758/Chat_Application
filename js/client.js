const socket = io('http://localhost:8000');

// Get DOM Elements in respective JS Variables
const form = document.getElementById('sendContainer')
const messageInp = document.getElementById('messageInp')
const messageContainer = document.querySelector(".container")

// Audio that will play when you received Message
let audio = new Audio('iphone-sms-original-53026.mp3');

// Function which will apeend event  info in to the container
const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if (position == 'left') {
        audio.play();
    }
}
// Ask New User His Name and let the server know 
let name = prompt("Enter Your name to join");
socket.emit('new-user-joined', name);

// If New User Will joins, receive his name from the server
socket.on('user-joined', name => {
    append(`${name} joined the chat`, 'right');
})

// If server sends a message then receive it
socket.on('receive', data => {
    append(`${data.name}:${data.message}`, 'left');
})

// If user leaves the chat then show info of user in the container
socket.on('leave', data => {
    append(`${data} left the chat`, 'right');
})

// If Form GEts sumitted then send it to the server
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInp.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInp.value = '';

})