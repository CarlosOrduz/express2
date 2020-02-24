let socket_io=require("socket.io");
var io = socket_io();
var socketApi={};
var db;
const MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb+srv://usuario1:usuario1@cluster0-jo7y6.mongodb.net/test?retryWrites=true&w=majority', (err, client) => {
    if (err) return console.log(err)
    db = client.db('Cluster0');
    
})

socketApi.io=io;


let messages=[{
    id:1,
    text: "Welcome to chat room",
    author: "Chat admin"
}];

io.on('connection',function(socket){
    io.sockets.emit('messages',messages);

    socket.on("new-message",data=>{
        socketApi.sendNotification(data)
    })
});

socketApi.sendNotification=data=>{
    db.collection('mensajes').insertOne(data, (err, result) => {
        if (err) return console.log(err)
    
        console.log("Saved")
        let mensajes=[];
        socketApi.showMessages().toArray(function (error,documents){
      documents.forEach(mensaje=>mensajes.push({author:mensaje.author,text:mensaje.text}))
         
      io.sockets.emit('messages',mensajes);
        });
      });
    
}
socketApi.showMessages=()=>{
    
      return  db.collection('mensajes').find()
   
}

module.exports=socketApi;
               