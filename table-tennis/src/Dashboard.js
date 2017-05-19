import React, { Component } from 'react';
let io = require('socket.io-client');

class Dashboard extends Component {

  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <p className="title">ZUTO</p>
        <div className="buttons">
          <a href="/player" className="button">Join Game</a>
          <a href="/scoreboard" className="button">Live Score</a>
        </div>
      </div>
    );
  }
}

export default Dashboard;
