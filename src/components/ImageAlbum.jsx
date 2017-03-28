import React, { Component } from 'react';
import { Link } from 'react-router';
import '../css/image.css';

class ImageAlbum extends Component {

  render () {
    return (
      <div className="album-imageContainer pure-u-1-2 pure-u-sm-1-3 pure-u-lg-1-4">
        <Link to={this.props.to}>
          <img className={`album-image ${this.props.selected ? 'album-imageSelected' : ''}`} alt={this.props.image.identifier} src={this.props.image.small_url}/>
        </Link>
      </div>
    );
  }
}

export default ImageAlbum;

