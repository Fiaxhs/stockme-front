import React, { Component } from 'react';
import Home from './pages/Home';
import Uploader from './components/Uploader';
import './css/vendor/pure-min.css';
import './css/vendor/grids-responsive-min.css';

class App extends Component {
  render() {
    return (
      <div className="main">
        <div className="header">
          <h1>Stockme</h1>
          <Uploader />
        </div>
        <Home />
      </div>
    );
  }
}

export default App;
