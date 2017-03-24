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
        <ImageImage image={img} updateDescription={this.updateDescription} updateTitle={this.updateTitle} />
        <aside className="image-album"></aside>
        <ImageUrls image={img} />
      </div>
    );
  }

  updateImage = (field, value) => {
    let body = new FormData();
    body.append(`image[${field}]`, value);

    query(`images/${this.state.image.identifier}`, {
      'method': 'PATCH',
      body
    }).then(response => {
      this.setState({image: response});
    }).catch(() => {});
  }

  updateTitle = (text) => {
    this.updateImage('title', text);
  }

  updateDescription = (text) => {
    this.updateImage('description', text);
  }
}

export default Image;

