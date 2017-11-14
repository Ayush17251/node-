//const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} =require('mongodb');
// Both the above line are same

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db) => {
  if(err) {
    return console.log('Unable to connect to MongoDB Server');
  }
  console.log('connected to MongoDB Server');

  //find one and Update

  db.collection('Todos').findOneAndUpdate({
    _id: new ObjectID('5a09c0fada3556022b778ea1')
  },
  {
    $set: {     // use to update the value
      completed: true
    }
  },
  {
    returnOriginal: false // default is true
  }).then((result)=>{
    console.log(result);
  })



db.close();
});
