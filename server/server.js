const path = require('path');
const express = require('express');
const socketIo = require('socket.io');
const http = require('http');
const port = process.env.PORT || 3000;
const publicpath= path.join(__dirname,'../public');

//const port = process.env.PORT ||3000;
var app = express();
var server = http.createServer(app);
app.use(express.static(publicpath));
var io = socketIo(server);

io.on('connection',(socket)=>{
  console.log('New User connected');
  socket.on('disconnect',(socket)=>{
       console.log('User got Disconnected');
  });
  socket.on('fromclient',(new_message)=>{
      console.log(Date.now(),new_message);
      io.emit('newMessage')
  });
  socket.emit('toclient',{
      text:'I m good'
  })
});




server.listen(port,()=>{
  console.log('server is up');
});
