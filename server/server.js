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

  socket.on('createMessage',(message)=>{
      console.log('createMessage',message);
      // io.emit('newMessage',{
      //   from: message.from,
      //   text: message.text
      // });
      socket.broadcast.emit('newMessage',{
        from:message.from,
        text: message.text
      });
  });
  socket.on('disconnect',(socket)=>{
       console.log('User got Disconnected');
  });
});
server.listen(port,()=>{
  console.log('server is up');
});
