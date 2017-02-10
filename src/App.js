import React, { Component } from 'react';
import Home from './pages/Home';

class App extends Component {
  render() {
    return (
      <div className="main">
        <div className="header">
          <div className="header-logoWrapper">
            <img className="header-logo" src="" alt="Stockme" />
            <h1>Stockme</h1>
          </div>
        </div>
        <Home />
      </div>
    );
  }
}

export default App;
