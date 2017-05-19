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
      var playerScores = scoreKeys.map((field, index) => {
        return <div className="score"><span>{field}</span><span>{this.state.scores[field]}</span></div>;
      });
    }

    return (
      <div>
        <h1>Scoreboard</h1>
        <div className="scores">
          {playerScores}
        </div>
      </div>
    );
  }

  registerScoreboard() {
    var self = this;
    this.socket = io('http://192.168.171.36:8081');
    this.socket.emit('join', 'scoreboard');

    this.socket.on('score:update', function(scores){
      self.setState({scores: scores});
    });
  }
}

export default Scoreboard;
