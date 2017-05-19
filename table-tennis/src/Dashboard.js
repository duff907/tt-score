import React, { Component } from 'react';
let io = require('socket.io-client');

class Dashboard extends Component {

  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <p>Dashboard</p>
      </div>
    );
  }
}

export default Dashboard;
