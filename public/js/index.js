// Client Side JS

var socket = io();
socket.on('connect',function(){  // first arg is event name
  console.log('connected to Server 1');

socket.emit('fromclient', { // to emit from client to Server
    text: 'Hey Whatsup'
   });
});

socket.on('disconnect',function(){
  console.log('Dissconnected From Server');
});

socket.on('toclient',(message)=>{
  console.log(Date.now(),message);
});
