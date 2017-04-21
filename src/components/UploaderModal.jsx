import React, { Component } from 'react';
import UploaderImagePreview from './UploaderImagePreview';
import { translate } from 'react-i18next';

class UploaderModal extends Component {

  constructor(props) {
    super(props);

    this.handleSubmitUrl = this.handleSubmitUrl.bind(this);
    this.handleSubmitKeyUp = this.handleSubmitKeyUp.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    this.urlInput && this.urlInput.focus();
  }

  render() {
    const { t } = this.props;
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
          <h3>{t('Drop your files below, or click the zone to select files')}</h3>
          <div className="upload-dropzone" onClick={this.clickInput}>
          </div>
          <input type="file" name="image" onChange={this.handleFileSelected} multiple="true" className="upload-input" ref={(input) => { this.input = input; }}/>
          <div className="upload-imagePreviews pure-g">
            {images}
          </div>
          {!this.canSeeAlbum() &&
            <div>
              <h3>{t('Alternatively, you can paste an image url below')}</h3>
              <div className="upload-flexiflex">
                <input className="upload-url" name="remote_image_url" onKeyUp={this.handleSubmitKeyUp} ref={input => {this.urlInput = input;}} />
                <i ref={submit => {this.submit = submit}}  className="material-icons upload-submitUrl" onClick={this.handleSubmitUrl}>file_upload</i>
              </div>
            </div>
          }
          {this.canSeeAlbum() &&
            <div className="upload-album">
              <div className="upload-albumButton" onClick={this.props.createAlbum}>{t('See album')}</div>
            </div>
          }
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

  handleSubmitUrl() {
    this.props.uploadUrl(this.urlInput.value)
    .catch(error => {
      this.urlInput.focus();
      this.urlInput.classList.add('upload-urlError');
      this.submit.innerText = 'error';
    })
  }

  handleSubmitKeyUp(event) {
    // Enter
    if (event.keyCode && event.keyCode === 13) {
      this.handleSubmitUrl();
    }
    this.urlInput.classList.remove('upload-urlError');
    this.submit.innerText = 'file_upload';
  }

  // No images pending and more than one image
  canSeeAlbum = () => {
    if (this.props.images.size > 1) {
      for (let image of this.props.images.values()) {
        if (image.status === 0) {
          return false;
        }
      }
      return true;
    }
    return false;
  }
}

export default translate()(UploaderModal);

