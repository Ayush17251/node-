//const MongoClient = require('mongodb').MongoClient;
const {MongoClient} =require('mongodb');
// Both the above line are same
//ES6 Destructring Example

var user ={name: 'ayush',age:25};
var {name,age} =user;

console.log(name,age);


MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db) => {
  if(err) {
    return console.log('Unable to connect to MongoDB Server');
  }
  console.log('connected to MongoDB Server');

  db.collection('Todos').insertOne({
      text: 'Something to do ultra',
      completed: false
  },(err,result)=>{
    if(err){
      return console.log('unable to insert',err);
    }
    console.log(JSON.stringify(result.ops,undefined,2));
    console.log(result.ops[0]._id.getTimestamp()); // to find when document was created.
  });
  db.close();

});
