// Client Side JS

var socket = io();
socket.on('connect',function(){  // first arg is event name
  console.log('connected to Server 1');

  // contain 2 arg . handler , an object to send the data.
//   socket.emit('createEmail', { // to emit from client to Server
//     to: 'alpha@example.com',
//     text: 'Hey whats up.'
//   });
// });
//
// socket.on('disconnect',function(){
//   console.log('Dissconnected From Server');
// });
//
// socket.on('newEmail',function(email){
//   console.log('New Email from',email);
// });

// client to Server

socket.emit('fromclient', { // to emit from client to Server
    text: 'Hey Whatsup'
   });

});
socket.on('toclient',(message)=>{
  console.log(Date.now(),message);
})
