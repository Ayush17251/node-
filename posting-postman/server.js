var express = require('express');
var bodyparser = require('body-parser');



var {mongoose} =require('./db/mongoose');
var {Todo} =require('./models/todo');
var {User} = require('./models/user');

var app = express();
app.use(bodyparser.json()); // Take ur json and convert it into JS object


app.post('/todos',(req,res)=>{ // Post to do
  console.log(req.body);
  var todo = new Todo({
    text: req.body.text
  });
  todo.save().then((result)=>{
    res.send(result);
  },(err)=>{
    res.status(400).send(err);
  })
});

app.listen(3000,()=>{
  console.log('started on port 3000');
});




  
