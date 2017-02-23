import React, { Component } from 'react';
import UploaderImagePreview from './UploaderImagePreview';

class UploaderModal extends Component {

  render() {
    if (!this.props.isUploadOpen) {
      return(<div></div>);
    }
    let images = [];
    // Images
    this.props.images.forEach(image => {
      images.push(<UploaderImagePreview file={image} />);
    });

    return (
      <div className="upload-background" onClick={this.handleBackgroundClick}>
        <div className="upload-modal">
          <h3>Drop your files below, or click the zone to select files</h3>
          <div className="upload-dropzone">
          </div>
          <div className="upload-imagePreviews pure-g">
            {images}
          </div>
        </div>
      </div>
    );
  }

  handleBackgroundClick = (event) => {
    if (event.target.className !== 'upload-background') {
      return;
    }
    this.props.hideUpload();
  }
}

export default UploaderModal;

