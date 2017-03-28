import React from 'react';
// import Cookies from 'js-cookie';
import { query } from '../utils/api';
import { Link } from 'react-router'

import Image from './Image'
import ImageImage from '../components/ImageImage'
import ImageAdmin from '../components/ImageAdmin'
import ImageUrls from '../components/ImageUrls'
import '../css/image.css';

class Album extends Image {

  componentDidMount() {
    this.fetchAlbum(this.props.params.albumIdentifier);
  }

  fetchAlbum(identifier) {
    query(`albums/${identifier}`).then(album => {
      this.setState({album: album}, () => {this.fetchImage(this.state.album.images[0].identifier);});
    }).catch( err => console.log(err) );
  }

  render () {
    if (!this.state.image) {
      return (<div></div>);
    }
    let albumImages = [];
    this.state.album.images.forEach((image, key) => {
      albumImages.push(
        <Link to={`/a/${this.props.params.albumIdentifier}/${image.identifier}`}>
          <img width="100" src={image.small_url} key={key} />
        </Link>
        );
    });
    let img = this.state.image;
    return (
      <div className="image">
        <ImageImage canEdit={this.state.canEdit} image={img} updateDescription={this.updateDescription} updateTitle={this.updateTitle} />
        <aside className="image-album">{albumImages}</aside>
        <aside className="image-urls">
          <ImageUrls image={img} />
          {this.state.canEdit && <ImageAdmin updatePrivate={this.updatePrivate} image={img} />}
        </aside>
      </div>
    );
  }
}

export default Album;

