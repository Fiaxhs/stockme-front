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
      messages: []
    }
  }

  componentDidMount() {
    window.flash = (message) => {
      let messages = this.state.messages.slice();
      const idx = messages.push(message);
      this.setState({messages});
      // Delete message 3s after.
      window.setTimeout( () => {
        let msgs = this.state.messages.slice();
        delete(msgs[idx-1]);
        this.setState({messages: msgs});
      }, 3000);
    }
  }


  render() {
    return (
      <div className="main">
        <Flash messages={this.state.messages}/>
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
