import registerServiceWorker from './registerServiceWorker';
import './index.css';
import React, { Component } from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import logo from './logo.svg';
import './App.css';

import Dashboard from './Dashboard';
import Player from './Player';
import Scoreboard from './Scoreboard';
let io = require('socket.io-client');

const Routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Dashboard}/>
    <Route path="/player" component={Player}/>
    <Route path="/scoreboard" component={Scoreboard}/>
  </Router>
);

render(Routes, document.getElementById('root'));
registerServiceWorker();
