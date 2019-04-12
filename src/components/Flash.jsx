import React, { Component } from "react";
import { useTranslation } from "react-i18next";

class Flash extends Component {
  render() {
    const { t } = useTranslation();
    let messages = [];
    this.props.messages.forEach((message, idx) => {
      messages.push(
        <div className="flash-message flash-message-animation" key={idx}>
          {t(message)}
        </div>
      );
    });
    return <div className="flash">{messages}</div>;
  }
}

export default Flash;
