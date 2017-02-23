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
      <div className="header-modalBackground" onClick={this.handleBackgroundClick}>
        <div className="header-modalUpload">
          <h3>Drop your files below, or click the zone to select files</h3>
          <div className="header-modalDropzone">
          </div>
          <div>
            {images}
          </div>
        </div>
      </div>
    );
  }

  handleBackgroundClick = (event) => {
    if (event.target.className !== 'header-modalBackground') {
      return;
    }
    this.props.hideUpload();
  }
}

export default UploaderModal;
