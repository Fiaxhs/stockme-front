import React, { Component } from 'react';
import Cookies from 'js-cookie';
import { browserHistory } from 'react-router';

import { query } from '../utils/api';
import ImageImage from '../components/ImageImage'
import ImageAdmin from '../components/ImageAdmin'
import ImageUrls from '../components/ImageUrls'
import '../css/image.css';

class Image extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      canEdit: false
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
      this.setState({canEdit: this.userOwnsImage(identifier)});
    }).catch( err => console.log(err) );
  }

  render () {
    if (!this.state.image) {
      return (<div></div>);
    }
    let img = this.state.image;
    return (
      <div className="image">
        <ImageImage canEdit={this.state.canEdit} image={img} updateDescription={this.updateDescription} updateTitle={this.updateTitle} />
        <aside className="image-album"></aside>
        <aside className="image-urls">
          <ImageUrls image={img} />
          {this.state.canEdit && <ImageAdmin deleteImage={this.deleteImage} updatePrivate={this.updatePrivate} image={img} />}
        </aside>
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
      window.flash('Image updated');
    }).catch(() => {});
  }

  updateTitle = (text) => {
    this.updateImage('title', text);
  }

  updateDescription = (text) => {
    this.updateImage('description', text);
  }

  updatePrivate = () => {
    this.updateImage('private', !this.state.image.private);
  }

  userOwnsImage (identifier) {
    let images = (Cookies.get('images') || '').split(',');
    return images.includes(identifier);
  }

  deleteImage = () => {
    query(`images/${this.state.image.identifier}`, {
      method: 'DELETE'
    }).then(() => {
      browserHistory.push(`/`);
      window.flash('Image deleted');
    });
  }
}

export default Image;

