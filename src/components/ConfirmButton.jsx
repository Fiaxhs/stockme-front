import React, { Component } from "react";
import ReactDOM from "react-dom";
import { useTranslation } from "react-i18next";

class ConfirmButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirming: false,
      width: 0
    };
  }

  render() {
    const { t } = useTranslation();
    return (
      <span
        ref="span"
        style={{ minWidth: this.state.width }}
        className={this.props.className}
        onClick={this.confirm}
      >
        <i className="material-icons">{this.props.icon}</i>
        {this.state.confirming ? t("Sure?") : this.props.text}
      </span>
    );
  }

  confirm = () => {
    if (this.state.confirming) {
      this.props.confirm();
      this.reset();
    } else {
      this.setState({
        width: ReactDOM.findDOMNode(this.refs.span).getBoundingClientRect()
          .width
      });
      this.bindCancel();
      this.setState({ confirming: true });
    }
  };

  bindCancel = () => {
    document.body.addEventListener("click", this.handleCancel, false);
  };

  handleCancel = event => {
    let span = ReactDOM.findDOMNode(this.refs.span);
    if (this.state.confirming) {
      if (event.target !== span && event.target.parentNode !== span) {
        event.stopPropagation();
        event.preventDefault();
        this.reset();
      }
    }
  };

  reset = () => {
    document.body.removeEventListener("click", this.handleCancel);
    this.setState({ confirming: false });
  };
}

export default ConfirmButton;
