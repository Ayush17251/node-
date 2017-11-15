//const MongoClient = require('mongodb').MongoClient;
const {MongoClient} =require('mongodb');
// Both the above line are same

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db) => {
  if(err) {
    return console.log('Unable to connect to MongoDB Server');
  }
  console.log('connected to MongoDB Server');

  db.collection('Todos').find({completed:"True"}).toArray().then((docst) =>{
    console.log(JSON.stringify(docst,undefined,2));
  },(err)=>{
    console.log('unable to fetch docs', err);
  })

  db.collection('Todos').find().count().then((count) =>{
    console.log(`Todos count: ${count}`);

  },(err)=>{
    console.log('unable to fetch docs', err);
  })

  db.close();

});
