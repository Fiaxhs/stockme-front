import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import ConfirmButton from './ConfirmButton';
import { query } from '../utils/api';

class ImageAdmin extends Component {
  render() {
    return (
      <div className="image-admin">
        <h3>Admin</h3>
        <div className="image-adminWrapper">
          <ConfirmButton className="image-adminButton" confirm={this.deleteImage} icon="delete" text="Delete" />
          {this.props.image.private ? (
            <span className="image-adminButton" onClick={this.props.updatePrivate}>
              <i className="material-icons">lock_open</i> Make it public
            </span>
          ) : (
            <span className="image-adminButton" onClick={this.props.updatePrivate}>
              <i className="material-icons">lock_outline</i> Make it private
            </span>
          )}
        </div>
      </div>
    );
  }

  deleteImage = () => {
    query(`images/${this.props.image.identifier}`, {
      method: 'DELETE'
    }).then(() => {
      browserHistory.push(`/`);
    });
  }
}

export default ImageAdmin;