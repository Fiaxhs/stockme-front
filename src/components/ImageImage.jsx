import React, { Component } from 'react';
import '../css/image.css';

import EditInPlace from './EditInPlace';
class ImageImage extends Component {

  constructor(props) {
   super(props);
   this.state = {canEdit: false};
  }

  render () {
    let img = this.props.image;
    return (
      <div className="image-container">
        <h1 className="image-title">
          <EditInPlace defaultText="No title" canEdit={this.props.canEdit} text={img.title} update={this.props.updateTitle}/>
        </h1>
        <img className="image-image" src={img.small_url} alt={img.title} />
        <div className="image-description">
          <EditInPlace defaultText="No description" canEdit={this.props.canEdit} text={img.description} update={this.props.updateDescription} textarea={true}/>
        </div>
      </div>
    );
  }
}

export default ImageImage;

