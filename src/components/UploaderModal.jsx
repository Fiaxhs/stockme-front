import React, { Component } from 'react';
import UploaderImagePreview from './UploaderImagePreview';

class UploaderModal extends Component {

  render() {
    if (!this.props.isUploadOpen) {
      return(<div></div>);
    }
    let images = [];
    // Images
    this.props.images.forEach((image, index) => {
      images.push(<UploaderImagePreview file={image} key={index} />);
    });

    return (
      <div className="upload-background" onClick={this.handleBackgroundClick}>
        <div className="upload-modal">
          <form action="" method="put">
            <h3>Drop your files below, or click the zone to select files</h3>
            <div className="upload-dropzone" onClick={this.clickInput}>
            </div>
            <input type="file" name="image" onChange={this.handleFileSelected} className="upload-input" ref={(input) => { this.input = input; }}/>
            <div className="upload-imagePreviews pure-g">
              {images}
            </div>
          </form>
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

  clickInput = (event) => {
    this.input.click();
  }

  handleFileSelected = (event) => {
    this.props.handleFiles(event.target.files)
  }
}

export default UploaderModal;

