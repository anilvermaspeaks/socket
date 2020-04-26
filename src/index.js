const path = require('path')
const http = require('http');
const express = require('express');
const socketIO = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketIO(server);

const port = process.env.PORT || 3000

const publicDir = path.join(__dirname, './public')

app.use(express.static(publicDir));


io.on('connection', (socket)=>{
console.log("new connection")
socket.emit('message', 'welcome')
socket.broadcast.emit('message', 'A new user joined')
socket.on('sendMessage',(message)=>{
   io.emit('message', message)
})

socket.on('sendLocation', (coords)=>{
    io.emit('message', `https://google.com/maps?q=${coords.latitude},${coords.longitude} ` )
})



socket.on('disconnect', (socket)=>{
    io.emit('message', 'A user left')
   
    })
    

})




server.listen(port, () => {
    console.log(`Server started on port`);
});