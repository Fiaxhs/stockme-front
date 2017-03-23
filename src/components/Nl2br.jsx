import React, { Component } from 'react';

class Nl2br extends Component {
  render () {
    return (
      <span>{(this.props.text || '').split('\n').map((item, key) => {return <span key={key}>{item}<br/></span>})}</span>
    );
  }
}

export default Nl2br;
