import React, { Component } from 'react';

class UploaderImagePreview extends Component {

  constructor(props) {
    super(props);
    this.statuses = ['pending', 'ok', 'fail'];
  }

  componentDidMount() {
    let reader = new FileReader();
    reader.onload = e => this.img.src = e.target.result;
    reader.readAsDataURL(this.props.file.file);
  }

  render() {
    return (
      <div className="pure-u-1-2 pure-u-xl-1-5 pure-u-md-1-4 pure-u-sm-1-3 upload-imageContainer">
          <span className={'upload-status' + this.statuses[this.props.file.status]}></span>
          <img className="upload-imagePreview" alt="" ref={(img) => { this.img = img; }} src="" />
      </div>
    );
  }
}

export default UploaderImagePreview;
