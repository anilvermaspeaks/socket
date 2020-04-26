const socket = io();

socket.on('message', (message)=>{
    console.log(message)
})

const messageNode = document.querySelector('#message');

const sendLocationBtn = document.querySelector('#sendLocation');
const messageForm  = document.querySelector('#message-form');

messageForm.addEventListener('submit',(e)=>{
e.preventDefault();
const messageNode = e.target.elements.message;
socket.emit('sendMessage', messageNode.value)
})

sendLocationBtn.addEventListener('click', ()=>{

if(!navigator.geolocation){
return alert('geolocation not supported by your browser')
}

navigator.geolocation.getCurrentPosition((position)=>{

socket.emit('sendLocation',{
    latitude:position.coords.latitude,
    longitude:position.coords.longitude
})

})




})