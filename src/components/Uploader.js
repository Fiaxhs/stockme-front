import React, { Component } from 'react';
import UploaderModal from './UploaderModal';
import { query } from '../utils/api';

class Uploader extends Component {

  constructor(props) {
    super(props);
    this.status_ok = 1;
    this.state = {
      isUploadOpen: false,
      images: new Map()
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
      let index = Math.random().toString(36).substring(2);
      let image = [ index, {file, status: 0} ];

      // Add images to state, with status "started"
      this.setState({images: new Map([...this.state.images, image])});
      // Upload
      this.uploadFile(index);
    });
  }

  // Send file to api
  uploadFile = (index) => {
    let data = new FormData();
    var image = this.state.images.get(index);
    debugger;
    data.append("image[image]", image.file);

    query("images", {
      method: 'POST',
      body: data
    }).then(response => {
      this.setState({images: new Map([...this.state.images, [index, Object.assign({}, image, {status: 1})]])});
    }).catch(e => {
      this.setState({images: new Map([...this.state.images, [index, Object.assign({}, image, {status: 2})]])});
    })
  }

  // Functions for submodules
  showUpload = () => this.setState({isUploadOpen: true});
  hideUpload = () => this.setState({isUploadOpen: false});
}

export default Uploader;
