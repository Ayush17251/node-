const path = require('path');
const express = require('express');
const socketIo = require('socket.io');
const http = require('http');
const port = process.env.PORT || 3000;
const publicpath= path.join(__dirname,'../public');
const request = require('request');
const {generatemessage,generateLocationmessage} = require('./utils/message');
//const port = process.env.PORT ||3000;
var app = express();
var server = http.createServer(app);
app.use(express.static(publicpath));
var io = socketIo(server);

io.on('connection',(socket)=>{
  console.log('New User connected');

  socket.emit('newMessage',
      generatemessage('Admin','Welcome to the chat app') // Welcome message for every new user.
  );

  socket.broadcast.emit('newMessage', // this will broadcast when every new user has joined.
      generatemessage('Admin','New user has Joined')

  );

// request({
//   url:`http://maps.googleapis.com/maps/api/geocode/json?latlng=${},${}&sensor=true`
// })
  socket.on('createlocation',(coords)=>{
    io.emit('newLocationMessage',
      generateLocationmessage('Admin',coords.lattitude,coords.longitude)
    );
  });

  socket.on('createMessage',(message)=>{
      console.log('createMessage',message);
      io.emit('newMessage',
        generatemessage(message.from,message.text)
      );

  });
  socket.on('disconnect',(socket)=>{
       console.log('User got Disconnected');
  });
});
server.listen(port,()=>{
  console.log('server is up');
});
