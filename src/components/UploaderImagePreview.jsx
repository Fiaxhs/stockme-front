import React, { Component } from "react";
import { useTranslation } from "react-i18next";

class UploaderImagePreview extends Component {
  constructor(props) {
    super(props);
    this.statuses = ["hourglass_empty", "done", "error"];
  }

  componentDidMount() {
    let reader = new FileReader();
    reader.onload = e => (this.img.src = e.target.result);
    reader.readAsDataURL(this.props.file.file);
  }

  render() {
    const { t } = useTranslation();
    return (
      <div className="pure-u-1-2 pure-u-xl-1-5 pure-u-md-1-4 pure-u-sm-1-3 upload-imageContainer">
        <i
          className="upload-status material-icons"
          title={this.props.file.status === 2 ? t("An error occured") : ""}
        >
          {this.statuses[this.props.file.status]}
        </i>
        <img
          className="upload-imagePreview"
          alt=""
          ref={img => {
            this.img = img;
          }}
          src=""
        />
      </div>
    );
  }
}

export default UploaderImagePreview;
