import React, { Component } from 'react';
import { query } from '../utils/api';
import HomeImage from '../components/HomeImage'

import '../css/home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: []
    };
  }

  componentWillReceiveProps(props) {
    this.loadImages();
  }

  componentDidMount() {
    this.loadImages();
  }

  render () {
    return (
      <div className="home pure-g">
        {this.state.images.map((image, idx) => {
          return <HomeImage image={image} key={idx} />;
        })}
      </div>
    );
  }

  loadImages = () => {
    query('images?limit=24', ).then(images => {
      this.setState({images: images});
    }).catch( err => console.log(err) );
  }
}

export default Home;
