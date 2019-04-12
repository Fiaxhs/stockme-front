import React, { Component } from "react";
import "../css/image.css";
import { useTranslation } from "react-i18next";

import EditInPlace from "./EditInPlace";
class ImageImage extends Component {
  constructor(props) {
    super(props);
    this.state = { canEdit: false };
  }

  render() {
    const { t } = useTranslation();
    const img = this.props.image;

    return (
      <div className="image-container">
        <h1 className="image-title">
          <EditInPlace
            defaultText={t("No title")}
            canEdit={this.props.canEdit}
            text={img.title}
            update={this.props.updateTitle}
          />
        </h1>
        <a href={img.url}>
          <img className="image-image" src={img.small_url} alt={img.title} />
        </a>
        <div className="image-description">
          <EditInPlace
            defaultText={t("No description")}
            canEdit={this.props.canEdit}
            text={img.description}
            update={this.props.updateDescription}
            textarea={true}
          />
        </div>
      </div>
    );
  }
}

export default ImageImage;
