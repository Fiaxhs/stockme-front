import React, { Component } from 'react';
import { Link } from 'react-router';

import Uploader from './components/Uploader';
import Flash from './components/Flash';
import './css/vendor/pure-min.css';
import './css/vendor/grids-responsive-min.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      message: null
    }
  }

  componentDidMount() {
    window.flash = (message) => {
      this.setState({message})
    }
  }


  render() {
    return (
      <div className="main">
        <Flash message={this.state.message}/>
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
