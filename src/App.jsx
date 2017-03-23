import React, { Component } from 'react';
import { Link } from 'react-router';

import Uploader from './components/Uploader';
import './css/vendor/pure-min.css';
import './css/vendor/grids-responsive-min.css';

class App extends Component {
  render() {
    return (
      <div className="main">
        <div className="header">
          <div className="header-wrapper">
            <h1><Link to="/">Stockme</Link></h1>
            <Uploader />
          </div>
        </div>
        {this.props.children}
      </div>
    );
  }
}

export default App;
