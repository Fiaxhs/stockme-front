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

  render () {
    let img = this.props.image;
    if (!img) {
      return (<aside></aside>);
    }
    return (
      <aside className="image-urls">
        <div className="image-urlsWrapper">
          <h3>Direct links</h3>
          <ul className="image-urlList">
            <li>
              <span className="image-urlLabel">This page</span>
              <input className="image-urlInput" type="text" onClick={this.copyText} value={window.location}/>
            </li>
            <li>
              <span className="image-urlLabel">Image</span>
              <input className="image-urlInput" type="text" onClick={this.copyText} value={img.url}/>
            </li>
          </ul>
          <h3>Forum (phpBB)</h3>
          <ul className="image-urlList">
            <li>
              <span className="image-urlLabel">Thumb</span>
              <input className="image-urlInput" type="text" onClick={this.copyText} value={`[url=${window.location}][img]${img.thumb_url}[/img][/url]`}/>
            </li>
            <li>
              <span className="image-urlLabel">Medium</span>
              <input className="image-urlInput" type="text" onClick={this.copyText} value={`[url=${window.location}][img]${img.small_url}[/img][/url]`}/>
            </li>
            <li>
              <span className="image-urlLabel">Large</span>
              <input className="image-urlInput" type="text" onClick={this.copyText} value={`[url=${window.location}][img]${img.url}[/img][/url]`}/>
            </li>
          </ul>
        </div>
      </aside>
    );
  }

  copyText(event) {
    event.target.select();
    document.execCommand('copy');
  }
}

export default Image;

