import React, { Component } from 'react';
import UploaderModal from './UploaderModal';

class Uploader extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isUploadOpen: false,
      images: []
    };
  }

  componentDidMount() {
    document.body.addEventListener("dragover", this._onDragOver.bind(this), false);
    document.body.addEventListener("dragleave", this._onDragOver.bind(this), false);
    document.body.addEventListener("drop", this._onDrop.bind(this), false);
  }

  render () {
    return (
      <div className="upload">
        <span className="upload-button" onClick={this.showUpload}>⬆ Upload</span>
        <UploaderModal images={this.state.images} isUploadOpen={this.state.isUploadOpen} hideUpload={this.hideUpload}/>
      </div>
    );
  }

  _onDrop (e) {
    e.stopPropagation();
    e.preventDefault();

    if (e.target.className !== 'upload-dropzone') {
      this.hideUpload();
      return;
    }
    this.handleFiles(e.dataTransfer.files);
  }

  _onDragOver (e) {
    e.stopPropagation();
    e.preventDefault();
    this.showUpload();
  }

  handleFiles = files => {
    let imageTypes = ['image/png', 'image/jpg', 'image/jpeg'];
    files = Array.from(files);
    files.forEach( file => {
      if (!imageTypes.includes(file.type)) {
        return;
      }
      this.setState({images: this.state.images.concat([file])});
    });
  }

  showUpload = () => this.setState({isUploadOpen: true});
  hideUpload = () => this.setState({isUploadOpen: false});
}

export default Uploader;
