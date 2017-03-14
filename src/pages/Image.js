import React, { Component } from 'react';
import { query } from '../utils/api';

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
        <div className="image-container">
          <img className="image-image" src={img.small_url} alt={img.title} />
        </div>
        <aside className="image-album">
          SALUT
        </aside>
        <aside className="image-urls">
          <div className="image-urlsWrapper">
            <h3>Direct links</h3>
            <ul className="image-urlList">
              <li>
                This page
                <input className="image-urlInput" type="text" onClick={this.copyText} value={window.location}/>
              </li>
              <li>
                Image
                <input className="image-urlInput" type="text" onClick={this.copyText} value={img.url}/>
              </li>
            </ul>
            <h3>Forum (phpBB)</h3>
            <ul className="image-urlList">
              <li>
                Thumb
                <input className="image-urlInput" type="text" onClick={this.copyText} value={`[url=${window.location}][img]${img.thumb_url}[/img][/url]`}/>
              </li>
              <li>
                Medium
                <input className="image-urlInput" type="text" onClick={this.copyText} value={`[url=${window.location}][img]${img.small_url}[/img][/url]`}/>
              </li>
              <li>
                Large
                <input className="image-urlInput" type="text" onClick={this.copyText} value={`[url=${window.location}][img]${img.url}[/img][/url]`}/>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    );
  }

  copyText(event) {
    event.target.select();
    document.execCommand('copy');
  }
}

export default Image;

