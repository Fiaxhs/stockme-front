import React from 'react';
import { query } from '../utils/api';
import { browserHistory } from 'react-router';

import Image from './Image';
import ImageImage from '../components/ImageImage';
import ImageAlbum from '../components/ImageAlbum';
import ImageAdmin from '../components/ImageAdmin';
import ImageUrls from '../components/ImageUrls';
import '../css/image.css';

class Album extends Image {

  componentDidMount() {
    this.fetchAlbum(this.props.params.albumIdentifier);
  }

  fetchAlbum(identifier) {
    query(`albums/${identifier}`).then(album => {
      if (album.images.length === 0) {
        browserHistory.push(`/`);
      }
      this.setState({album: album}, () => {this.fetchImage(this.props.params.imageIdentifier || this.state.album.images[0].identifier);});
    }).catch( err => console.log(err) );
  }

  // Override to stay on album
  deleteImage = () => {
    query(`images/${this.state.image.identifier}`, {
      method: 'DELETE'
    }).then(() => {
      let album = Object.assign({}, this.state.album);
      const imageIndex = album.images.findIndex(image => image.identifier === this.state.image.identifier);
      album.images.splice(imageIndex, 1);
      if (album.images.length === 0) {
        browserHistory.push(`/`);
      } else {
        const nextId = album.images[Math.max(0, imageIndex - 1)].identifier;
        this.setState({album: album});
        browserHistory.push(`/a/${this.props.params.albumIdentifier}/${nextId}`);
      }
    });
  }

  render () {
    if (!this.state.image) {
      return (<div></div>);
    }
    let albumImages = [];
    this.state.album.images.forEach((image, key) => {
      console.log(this.state);
      albumImages.push(
        <ImageAlbum key={key} image={image} selected={this.state.image.identifier === image.identifier} to={`/a/${this.props.params.albumIdentifier}/${image.identifier}`}/>
      );
    });
    let img = this.state.image;
    return (
      <div className="image">
        <ImageImage canEdit={this.state.canEdit} image={img} updateDescription={this.updateDescription} updateTitle={this.updateTitle} />
        <aside className="image-album">
          <div className="album pure-g">
            {albumImages}
          </div>
        </aside>
        <aside className="image-urls">
          <ImageUrls image={img} />
          {this.state.canEdit && <ImageAdmin deleteImage={this.deleteImage} updatePrivate={this.updatePrivate} image={img} />}
        </aside>
      </div>
    );
  }
}

export default Album;

