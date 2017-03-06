import React, { Component } from 'react';
import UploaderModal from './UploaderModal';
import { query } from '../utils/api';

class Uploader extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isUploadOpen: false,
      images: []
    };
  }

  componentDidMount() {
    document.body.addEventListener("dragover", this.handleDragoverEvent.bind(this), false);
    document.body.addEventListener("dragleave", this.handleDragoverEvent.bind(this), false);
    document.body.addEventListener("drop", this.handleDropEvent.bind(this), false);
  }

  render () {
    return (
      <div className="upload">
        <span className="upload-button" onClick={this.showUpload}>⬆ Upload</span>
        <UploaderModal handleFiles={this.handleFiles} images={this.state.images} isUploadOpen={this.state.isUploadOpen} hideUpload={this.hideUpload}/>
      </div>
    );
  }

  handleDropEvent (e) {
    e.stopPropagation();
    e.preventDefault();

    if (e.target.className !== 'upload-dropzone') {
      this.hideUpload();
      return;
    }
    this.handleFiles(e.dataTransfer.files);
  }

  handleDragoverEvent (e) {
    e.stopPropagation();
    e.preventDefault();
    // Prevent drag from within the browser
    if (e.dataTransfer.types.indexOf("Files") !== -1){
      this.showUpload();
    }
  }

  // Deal with dropped files
  handleFiles = files => {
    let imageTypes = ['image/png', 'image/jpg', 'image/jpeg'];
    files = Array.from(files);
    files.forEach( file => {
      if (!imageTypes.includes(file.type)) {
        return;
      }
      // Add images to state, with status "started"
      this.setState({images: this.state.images.concat([{
        file,
        status: 0
      }])});
      // Upload
      this.uploadFile([...this.state.images].pop());
    });
  }

  // Send file to api
  uploadFile = (file) => {
    let data = new FormData();
    data.append("image[image]", file.file);

    query("images", {
      method: 'POST',
      body: data
    }).then(response => {
      alert("OK")
    }).catch(e => {
      alert(e);
    })
  }

  // Functions for submodules
  showUpload = () => this.setState({isUploadOpen: true});
  hideUpload = () => this.setState({isUploadOpen: false});
}

export default Uploader;
