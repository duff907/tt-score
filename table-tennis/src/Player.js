import React, { Component } from 'react';
import Sound from 'react-sound';
let io = require('socket.io-client');

class Player extends Component {

  constructor() {
    super();

    this.state = {
      playerName: "",
      playing: false,
      playSound: false
    }

    this.handleNameSubmit = this.handleNameSubmit.bind(this);
    this.updatePlayerName = this.updatePlayerName.bind(this);
    this.connectUser = this.connectUser.bind(this);
    this.handleAddPoint = this.handleAddPoint.bind(this);

    this.socket;
  }

  render() {
    return (
      <div className="app">

        {!this.state.playing ? <div className="">
          <input onChange={this.updatePlayerName} type="text" id="n" />
          <a href="#" onClick={this.handleNameSubmit}>Play</a>
        </div> : null}

        {this.state.playing ? <div>
          <a href="#" onClick={this.handleAddPoint}>Add point</a>
        </div> : null}

        {this.state.playSound ? <div>
          <Sound
            url="./assets/player1.wav"
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

  updatePlayerName(event) {
    this.setState({
      playerName: event.target.value
    });
  }

  handleNameSubmit() {
    this.setState({ playing: true });
    this.connectUser(this.state.playerName);
  }

  connectUser(playerName) {
    this.socket = io('http://localhost:8081');
    this.socket.emit('join', 'player', {name: playerName});
    this.socket.emit('join', 'scoreboard');
  }

  handleAddPoint() {
    this.setState({ playSound: true });
    this.socket.emit('point:add', this.state.playerName);
  }
}

export default Player;
