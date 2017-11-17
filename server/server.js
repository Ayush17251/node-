const path = require('path');
const express = require('express');
const socketIo = require('socket.io');
const http = require('http');
const publicpath= path.join(__dirname,'../public');

//const port = process.env.PORT ||3000;
var app = express();
var server = http.createServer(app);
app.use(express.static(publicpath));
var io = socketIo(server);

io.on('connection',(socket)=>{
  console.log('New User connected');
});

io.on('disconnect',(socket)=>
  console.log('User got Disconnected');
});


server.listen(3000,()=>{
  console.log('server is up');
});
