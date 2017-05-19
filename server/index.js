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
var scoreboards = {};

io.on('connection', function(socket){

  socket.on("join", function(type, options){
      if (type == 'player') {
        if(people[options.name] && Object.keys(people)) {
          socket.to(socket.id).emit('user cannot be added');
          return;
        }
        people[options.name] = {'socket': socket.id, score: 0};
        console.log(`${options.name} joined the game`);
      }
      else if (type == 'scoreboard') {
        scoreboards = [socket.id];
      }
  });

  socket.on("point:add", function(name){
      people[name].score = people[name].score + 1 ;
      console.log(`${name}'s new score is ${people[name].score}`);

      socket.broadcast.emit('score:update', createScoreObj(people));
  });

  function createScoreObj(people) {
    var scores = {};
    for (var player in people) {
      if (people.hasOwnProperty(player)) {
        scores[player] = people[player].score;
      }
    }
    return scores;
  }

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
