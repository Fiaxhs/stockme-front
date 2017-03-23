import React, { Component } from 'react';
import Cookies from 'js-cookie';
import '../css/image.css';

import EditInPlace from './EditInPlace';
class ImageImage extends Component {

  constructor(props) {
   super(props);
   this.state = {canEdit: false};
  }

  componentDidMount() {
    this.setState({canEdit: this.userOwnsImage()});
  }

  render () {
    let img = this.props.image;
    return (
      <div className="image-container">
        <h1 className="image-title">
          <EditInPlace canEdit={this.state.canEdit} text={img.title} update={this.props.updateTitle}/>
        </h1>
        <img className="image-image" src={img.small_url} alt={img.title} />
        <div className="image-description">
          <EditInPlace canEdit={this.state.canEdit} text={img.description} update={this.props.updateDescription} textarea={true}/>
        </div>
      </div>
    );
  }

  userOwnsImage () {
    let images = (Cookies.get('images') || '').split(',');
    return images.includes(this.props.image.identifier);
  }
}

export default ImageImage;

