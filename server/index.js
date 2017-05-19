var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

app.get('/', function(req, res){
  res.sendFile(path.resolve(__dirname + '/../web/index.html'));
});

app.use(express.static(path.resolve(__dirname + '/../web/')));

var people = {};

io.on('connection', function(socket){

  socket.on("join", function(name){
      if(!people[name] && Object.keys(people)) {
        socket.to(socket.id).emit('user cannot be added');
        return;
      }
      people[name] = {'socket': socket.id, score: 0};
      console.log(`${name} joined the game`);
  });

  socket.on("point:add", function(name){
      people[name].score = people[name].score + 1 ;
      console.log(`${name}'s new score is ${people[name].score}`);
  });

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
