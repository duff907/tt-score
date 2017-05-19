import React, { Component } from 'react';
let io = require('socket.io-client');

class Scoreboard extends Component {

  constructor() {
    super();

    this.state = {};
  }

  componentDidMount() {
    this.registerScoreboard();
  }

  render() {
    var playerScores = [];
    if (this.state.scores) {
      var scoreKeys = Object.keys(this.state.scores);
      for (var i=0; i < scoreKeys.length; i++) {
        console.log(scoreKeys[i]);
        var playerScore = <p>{scoreKeys[i]} - {this.state.scores[scoreKeys[i]]}</p>
        playerScores.push(playerScore)
      }
    }

    return (
      <div>
        <p>Scoreboard</p>
        {playerScores}
      </div>
    );
  }

  registerScoreboard() {
    var self = this;
    this.socket = io('http://localhost:8081');
    this.socket.emit('join', 'scoreboard');

    this.socket.on('score:update', function(scores){
      self.setState({scores: scores});
    });
  }
}

export default Scoreboard;
