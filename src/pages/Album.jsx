import React, { Component } from 'react';
import Cookies from 'js-cookie';
import { query } from '../utils/api';

import Image from './Image'
import ImageImage from '../components/ImageImage'
import ImageAdmin from '../components/ImageAdmin'
import ImageUrls from '../components/ImageUrls'
import '../css/image.css';

class Album extends Image {

  render () {
    if (!this.state.image) {
      return (<div></div>);
    }
    let img = this.state.image;
    return (
      <div className="image">
        <ImageImage canEdit={this.state.canEdit} image={img} updateDescription={this.updateDescription} updateTitle={this.updateTitle} />
        <aside className="image-album">bite</aside>
        <aside className="image-urls">
          <ImageUrls image={img} />
          {this.state.canEdit && <ImageAdmin updatePrivate={this.updatePrivate} image={img} />}
        </aside>
      </div>
    );
  }
}

export default Image;

