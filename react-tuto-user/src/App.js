import React, { Component } from 'react';
import './App.css';
import Board from './components/Board.js';
import Form from './components/Form.js';
import Default from './components/Default.js';
import { Switch, Route } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div className="app">
        <Switch>
          <Route exact path='/' component={Board}/>
          <Route exact path='/form' component={Form}/>
          <Route component={Default}/>
        </Switch>
      </div>
    );
  }
}

export default App;
