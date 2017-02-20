import React, { Component } from 'react';
import UploaderModal from './UploaderModal';

class Uploader extends Component {

  constructor(props) {
    super(props);
    this.state = {showUpload: false};
  }

  componentDidMount() {
    document.body.addEventListener("dragover", this._onDragOver.bind(this), false);
    document.body.addEventListener("dragleave", this._onDragOver.bind(this), false);
    document.body.addEventListener("drop", this._onDrop.bind(this), false);
  }

  render () {
    return (
      <div className="header-uploader">
        ⬆ Upload
        <UploaderModal showUpload={this.state.showUpload}/>
      </div>
    );
  }

  _onDragLeave () {
    this.setState({what: '_onDragLeave'});
  }

  _onDrop (e) {
    e.stopPropagation();
    e.preventDefault();

    if (e.target.className !== 'header-modalDropzone') {
      this.setState({showUpload: false});
      return;
    }

  }

  _onDragOver (e) {
    e.stopPropagation();
    e.preventDefault();
    this.setState({showUpload: true})
  }
}

export default Uploader;
