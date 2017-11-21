// Client Side JS

var socket = io();
socket.on('connect',function(){  // first arg is event name
  console.log('connected to Server 1');
});
  socket.on('disconnect',function(){
    console.log('Dissconnected From Server');
  });


jQuery('#messaging').on('submit',function(e){
  e.preventDefault();

  socket.emit('createMessage',{
    from: 'User',
    text: jQuery('[name=messages]').val()
  },function(){

  });
});


socket.on('newMessage',function(message){
  console.log('newMessage',message);
  var li =jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);
  jQuery('#list-message').append(li);
});
