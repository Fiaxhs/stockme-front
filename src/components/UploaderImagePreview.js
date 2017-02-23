import React, { Component } from 'react';

class UploaderImagePreview extends Component {

  componentDidMount() {
    let reader = new FileReader();
    reader.onload = e => this.img.src = e.target.result;
    reader.readAsDataURL(this.props.file);
  }

  render() {
    return (
      <img alt="" ref={(img) => { this.img = img; }} src="" />
    );
  }
}

export default UploaderImagePreview;
