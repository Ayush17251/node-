// Client Side JS

var socket = io();

// function to autoscroll the chap application

function scrollToBottom() {
  var dop=jQuery('#list-message');
  var newMessages=dop.children('li:last-child');


  var clientHeight = dop.prop('clientHeight');
  var scrollHeight = dop.prop('scrollHeight');
  var scrollTop = dop.prop('scrollTop');
  var newMessageHeight = newMessages.innerHeight();
  var lastMessageHeight = newMessages.prev().innerHeight();

  if(clientHeight+scrollTop+newMessageHeight+lastMessageHeight >= clientHeight) {
    dop.scrollTop(scrollHeight);
    // Setting the scrolltop value to scrollHeight
  }

}

socket.on('connect',function(){  // first arg is event name
  var params= jQuery.deparam(window.location.search);
  socket.emit('join',params,function(errs){
    if(errs) {
      alert(errs);
      window.location.href='/'; // If error go back to home page
    } else {
      console.log('No error');
    }
  });
  //console.log('connected to Server 1');
});



  socket.on('disconnect',function(){
    console.log('Dissconnected From Server');
  });


// Update USer List


socket.on('updateUserList', function (users) {
  var ol = jQuery('<ol></ol>');

  users.forEach(function (user) {
    ol.append(jQuery(`<li></li>`).text(user));
  });

  jQuery('#users').html(ol);
});



jQuery('#messaging').on('submit',function(e){
  e.preventDefault();


  socket.emit('createMessage',{
    from: 'User',
    text: jQuery('[name=messages]').val()
  },function(){

  });
  jQuery('[name=messages]').val('');

});


socket.on('newMessage',function(message){
  var formattedtime=moment(message.createdAt).format('hh:mm a');
  var template = jQuery('#message-template').html();
  var html = Mustache.render(template,{
    text: message.text,
    from: message.from,
    createdAt: formattedtime
  });

  jQuery('#list-message').append(html);
  scrollToBottom();

  // var formattedtime=moment(message.createdAt).format('hh:mm a');
  // //console.log('newMessage',message);
  // var li =jQuery('<li></li>');
  // li.text(`${message.from} ${formattedtime}: ${message.text}`);
  // jQuery('#list-message').append(li);
});

socket.on('newLocationMessage',function(message) {
  var formattedtime=moment(message.createdAt).format('hh:mm a');
  var template =jQuery('#location-message-template').html();
  var html=Mustache.render(template,{
    from: message.from,
    url: message.url,
    createdAt: formattedtime
  });

    jQuery('#list-message').append(html);
    scrollToBottom();

  // var li=jQuery('<li></li>');
  // var a= jQuery('<a target=_blank>My Current Location</a>');
  //
  // li.text(`${message.from} ${formattedtime}:`);
  // a.attr('href',message.url);
  // li.append(a);
  // jQuery('#list-message').append(li);
});


var loacationButton=jQuery('#send-location');
loacationButton.on('click',function(){
  if(!navigator.geolocation) {
    return alert('Geolocation is not supported');
  }
  loacationButton.attr('disabled','disabled').text('Sendind Location..');
  // navigator.geolocation.getCurrentPosition(success, error);
  navigator.geolocation.getCurrentPosition(function(position){
    loacationButton.removeAttr('disabled').text('Send Location');
    socket.emit('createlocation',{
      lattitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
  }, function(){
    loacationButton.removeAttr('disabled').text('Send Location');
      alert('Unable to Fetch Location');
  });
});
