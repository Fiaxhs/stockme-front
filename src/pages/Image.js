import React, { Component } from 'react';
import { query } from '../utils/api';

import ImageImage from '../components/ImageImage'
import ImageUrls from '../components/ImageUrls'
import '../css/image.css';

class Image extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null
    };
  }

  componentWillReceiveProps(props) {
    this.fetchImage(props.params.imageIdentifier);
  }

  componentDidMount() {
    this.fetchImage(this.props.params.imageIdentifier);
  }

  fetchImage(identifier) {
    query(`images/${identifier}`).then(image => {
      this.setState({image: image});
    }).catch( err => console.log(err) );
  }

  render () {
    if (!this.state.image) {
      return (<div></div>);
    }
    let img = this.state.image;
    return (
      <div className="image">
        <ImageImage image={img} />
        <aside className="image-album">
          SALUT
        </aside>
        <ImageUrls image={img} />
      </div>
    );
  }
}

export default Image;

