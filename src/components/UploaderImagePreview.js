import React, { Component } from 'react';

class UploaderImagePreview extends Component {

  componentDidMount() {
    let reader = new FileReader();
    reader.onload = e => this.img.src = e.target.result;
    reader.readAsDataURL(this.props.file);
  }

  render() {
    return (
      <div className="pure-u-1-6 upload-imageContainer">
        <img className="upload-imagePreview" alt="" ref={(img) => { this.img = img; }} src="" />
      </div>
    );
  }
}

export default UploaderImagePreview;
