import React, { Component } from 'react';
import { query } from '../utils/api';

import '../css/image.css';

class ImageImage extends Component {

  render () {
    let img = this.props.image;
    return (
      <div className="image-container">
        <img className="image-image" src={img.small_url} alt={img.title} />
      </div>
    );
  }
}

export default ImageImage;

