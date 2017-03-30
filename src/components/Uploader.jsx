import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import Cookies from 'js-cookie';
import { translate } from 'react-i18next';

import UploaderModal from './UploaderModal';
import { query } from '../utils/api';

class Uploader extends Component {

  constructor(props) {
    super(props);

    this.status_pending = 0;
    this.status_ok = 1;
    this.status_fail = 2;

    this.state = {
      isUploadOpen: false,
      images: new Map()
    };
  }

  componentDidMount() {
    document.body.addEventListener('dragover', this.handleDragoverEvent.bind(this), false);
    document.body.addEventListener('dragleave', this.handleDragoverEvent.bind(this), false);
    document.body.addEventListener('drop', this.handleDropEvent.bind(this), false);
  }

  render () {
    const { t } = this.props;
    return (
      <div className="upload">
        <span className="upload-button" onClick={this.showUpload}><i className="material-icons">cloud_upload</i> {t('Upload')}</span>
        <UploaderModal
          createAlbum={this.createAlbum}
          handleFiles={this.handleFiles}
          images={this.state.images}
          isUploadOpen={this.state.isUploadOpen}
          hideUpload={this.hideUpload}/>
      </div>
    );
  }

  // File dropped
  handleDropEvent (e) {
    e.stopPropagation();
    e.preventDefault();

    if (e.target.className !== 'upload-dropzone') {
      this.hideUpload();
      return;
    }
    this.handleFiles(e.dataTransfer.files);
  }

  // File dragged
  handleDragoverEvent (e) {
    e.stopPropagation();
    e.preventDefault();
    // Prevent drag from within the browser
    if (e.dataTransfer.types.indexOf('Files') !== -1){
      this.showUpload();
    }
  }

  // Deal with dropped files
  handleFiles = files => {
    const imageTypes = ['image/png', 'image/jpg', 'image/jpeg'];
    let tempMap = new Map();

    files = Array.from(files);
    files.forEach( file => {
      if (!imageTypes.includes(file.type)) {
        return;
      }
      let index = Math.random().toString(36).substring(2);
      tempMap.set(index, {file, status: this.status_pending});
    });

      // Add images to state, with status "started"
    this.setState({images: new Map([...this.state.images, ...tempMap])},
      // Upload
      () => {
        for (let index of tempMap.keys()) {
          this.uploadFile(index);
        }
      }
    );
  }

  // Send file to api
  uploadFile = (index) => {
    let image = this.state.images.get(index);

    let data = new FormData();
    data.append('image[image]', image.file);

    query('images', {
      method: 'POST',
      body: data
    }).then(response => {
      // Save secret and image.
      this.setSecret(response.secret);
      this.addImageToCookies(response.identifier);

      if (this.state.images.size === 1) {
        // Go to image
        browserHistory.push(`/i/${response.identifier}`);
        this.resetState();
      } else {
        // Add to temp album
        this.setState({
          images: new Map([
            ...this.state.images,
            [index, Object.assign({}, image, {
              identifier: response.identifier,
              status: this.status_ok
            })]
          ])
        });
      }
    }).catch(e => {
      this.setState({images: new Map([...this.state.images, [index, Object.assign({}, image, {status: this.status_fail})]])});
    })
  }

  resetState () {
    this.hideUpload();
    this.setState({images:new Map()});
  }

  // Album creation
  createAlbum = () => {
    let body = new FormData();
    this.state.images.forEach( (image, index) => {
      if (image.identifier) {
        body.append('album[images_ids][]', image.identifier);
      }
    });

    query('albums', { method: 'POST', body }).then( (response) => {
      this.addAlbumToCookies(response.identifier);
      browserHistory.push(`/a/${response.identifier}`);
      this.resetState();
    });
  }

  // Secret key to update/delete pics
  getSecret = () => Cookies.get('secret')

  setSecret = (secret, force = false) => {
    if (force || !this.getSecret()) {
      Cookies.set('secret', secret, {expires: 30});
      Cookies.set('images', '', {expires: 30})
    }
  }

  addImageToCookies = (id) => this.addToCookies(id, 'images')
  addAlbumToCookies = (id) => this.addToCookies(id, 'albums')

  addToCookies = (id, kind) => {
    let thingies = Cookies.get(kind);
    thingies = thingies ? thingies.split(',') : [];
    thingies.push(id);
    Cookies.set(kind, thingies.join(','), {expires: 30});
  }

  // Functions for submodules
  showUpload = () => this.setState({isUploadOpen: true});
  hideUpload = () => this.setState({isUploadOpen: false});
}

export default translate()(Uploader);
