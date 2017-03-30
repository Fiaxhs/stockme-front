import React, { Component } from 'react';
import { translate } from 'react-i18next';

import ConfirmButton from './ConfirmButton';

class ImageAdmin extends Component {
  render() {
    const { t } = this.props;
    return (
      <div className="image-admin">
        <h3>Admin</h3>
        <div className="image-adminWrapper">
          <ConfirmButton className="image-adminButton" confirm={this.props.deleteImage} icon="delete" text={t('Delete')} />
          {this.props.image.private ? (
            <span className="image-adminButton" onClick={this.props.updatePrivate}>
              <i className="material-icons">lock_open</i> {t('Make it public')}
            </span>
          ) : (
            <span className="image-adminButton" onClick={this.props.updatePrivate}>
              <i className="material-icons">lock_outline</i> {t('Make it private')}
            </span>
          )}
        </div>
      </div>
    );
  }
}

export default translate()(ImageAdmin);
