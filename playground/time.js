const moment = require('moment');

// moment time api

var date=moment();
var time=moment();
console.log(date.format('MMM Do YYYY'));

console.log(time.format('h:mm a'));
