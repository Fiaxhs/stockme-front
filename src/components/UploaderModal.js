import React, { Component } from 'react';

class UploaderModal extends Component {
  render() {
    if (!this.props.showUpload) {
      return(<div></div>);
    }
    return (
      <div className="header-modalUpload">
        Drop the coconut down, now
        <div className="header-modalDropzone">
        </div>
      </div>
    );
  }
}

export default UploaderModal;
