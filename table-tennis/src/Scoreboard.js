import React, { Component } from 'react';
let io = require('socket.io-client');

class Scoreboard extends Component {

  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <p>Scoreboard</p>
      </div>
    );
  }
}

export default Scoreboard;
