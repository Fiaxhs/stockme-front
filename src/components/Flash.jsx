import React, { Component } from 'react';
import { translate } from 'react-i18next';

class Flash extends Component {

  componentWillReceiveProps(nextProps) {
    if (nextProps.message) {
      this.div.classList.add("flash-message-animation");
      window.setTimeout(() => {
        this.div.classList.remove("flash-message-animation");
      }, 3000);
    }
  }

  render() {
    const { t } = this.props;
    return (
      <div className="flash">
        <div className="flash-message" ref={(div) => {this.div = div}}>
          {t(this.props.message)}
        </div>
      </div>
    );
  }
}

export default translate()(Flash);
