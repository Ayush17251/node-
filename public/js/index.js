// Client Side JS

var socket = io();
socket.on('connect',function(){  // first arg is event name
  console.log('connected to Server 1');
});
  socket.on('disconnect',function(){
    console.log('Dissconnected From Server');
  });





socket.on('newMessage',function(message){
  console.log('newMessage',message);
});
