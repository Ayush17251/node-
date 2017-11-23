const path = require('path');
const express = require('express');
const socketIo = require('socket.io');
const http = require('http');
const port = process.env.PORT || 3000;
const publicpath= path.join(__dirname,'../public');
const request = require('request');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');
const {generatemessage,generateLocationmessage} = require('./utils/message');
//const port = process.env.PORT ||3000;
var app = express();
var server = http.createServer(app);
app.use(express.static(publicpath));
var io = socketIo(server);

var users = new Users();


io.on('connection',(socket)=>{
  console.log('New User connected');



// request({
//   url:`http://maps.googleapis.com/maps/api/geocode/json?latlng=${},${}&sensor=true`
// })
  socket.on('createlocation',(coords)=>{
    io.emit('newLocationMessage',
      generateLocationmessage('Admin',coords.lattitude,coords.longitude)
    );
  });

  socket.on('join',(params,callback)=>{
    if(!isRealString(params.name) || !isRealString(params.room))
    {
      return callback('Name and room require');
    }
    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id,params.name,params.room);

    io.to(params.room).emit('updateUserList',users.getUserList(params.room));

    socket.emit('newMessage',
        generatemessage('Admin','Welcome to the chat app') // Welcome message for every new user.
    );

    socket.broadcast.to(params.room).emit('newMessage', // this will broadcast when every new user has joined.
        generatemessage('Admin',`${params.name} has joined`)

    );

    //io.emit -> to every User // io.to('room').emit -> To specific Room
    //socket.broadcast.emit : to every user other than self socket.broadcast.to('room').emit -> to specific room
    //socket.emit -> To every one connected


  });



  socket.on('createMessage',(message)=>{
      console.log('createMessage',message);
      io.emit('newMessage',
        generatemessage(message.from,message.text)
      );

  });
  socket.on('disconnect',()=>{
    var user = users.removeUser(socket.id);
    if(user) {
      io.to(user.room).emit('updateUserList',users.getUserList(user.room));
      io.to(user.room).emit('newMessage',generatemessage('Admin',`${user.name} has left`));
    }

  });
});

server.listen(port,()=>{
  console.log('server is up');
});
