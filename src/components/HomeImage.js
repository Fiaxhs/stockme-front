import React, { Component } from 'react';
import { Link } from 'react-router';

class HomeImage extends Component {

  componentDidMount() {
    let reader = new FileReader();
    reader.onload = e => this.img.src = e.target.result;
    reader.readAsDataURL(this.props.file.file);
  }

  render() {
    return (
      <div className="home-imageContainer pure-u-1-2 pure-u-xl-1-6 pure-u-md-1-4 pure-u-sm-1-3">
        <Link to={`/i/${this.props.image.identifier}`}>
          <img className="home-image" alt={this.props.image.title} src={this.props.image.thumb_url} />
        </Link>
      </div>
    );
  }
}

export default HomeImage;
