import React, { Component } from 'react';
import { query } from '../utils/api';
import '../css/home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: []
    };
  }

  componentDidMount() {
    query('images').then(images => {
      this.setState({images: images});
    }).catch( err => console.log(err) );
  }

  render () {
    return (
      <div className="home pure-g">
        {this.state.images.map((image, idx) => {
          return <img src={image.thumb_url} alt={image.title} key={idx} />
        })}
      </div>
    );
  }
}

export default Home;
