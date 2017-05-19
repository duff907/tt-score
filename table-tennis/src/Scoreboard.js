import React, { Component } from 'react';
import Sound from 'react-sound';
let io = require('socket.io-client');

class Scoreboard extends Component {

  constructor() {
    super();

    this.state = {
      playSound: false
    };
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
        {this.state.playSound ? <div>
          <Sound
            url="./assets/player2.wav"
            playStatus={Sound.status.PLAYING}
            playFromPosition={300 /* in milliseconds */}
            onLoading={this.handleSongLoading}
            onPlaying={this.handleSongPlaying}
            onFinishedPlaying={this.handleSongFinishedPlaying}
          />
        </div> : null}
      </div>
    );
  }

  registerScoreboard() {
    var self = this;
    this.socket = io('http://192.168.171.36:8081');
    this.socket.emit('join', 'scoreboard');

    this.socket.on('score:update', function(scores){
      self.setState({scores: scores, playSound: true});
    });
  }
}

export default Scoreboard;
