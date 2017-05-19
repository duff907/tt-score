import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
let io = require('socket.io-client');

class App extends Component {

  constructor() {
    super();

    this.state = {
      playerName: ""
    }

    this.handleNameSubmit = this.handleNameSubmit.bind(this);
    this.updatePlayerName = this.updatePlayerName.bind(this);
    this.connectUser = this.connectUser.bind(this);

    this.socket;
  }

  render() {
    return (
      <div className="app">
        <input onChange={this.updatePlayerName} type="text" id="n" />
        <a href="#" onClick={this.handleNameSubmit}>Play</a>
      </div>
    );
  }

  updatePlayerName(event) {
    this.setState({
      playerName: event.target.value
    });
  }

  handleNameSubmit() {
    this.connectUser(this.state.playerName);
  }

  connectUser(playerName) {
    this.socket = io('http://localhost:8081');
    this.socket.emit('join', 'player', {name: playerName});
    this.socket.emit('join', 'scoreboard');
  }
}

export default App;
