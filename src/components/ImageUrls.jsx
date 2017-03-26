import React, { Component } from 'react';

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
      <div className="image-urlsWrapper">
        <h3>Links</h3>
        <ul className="image-urlList">
          <li>
            <span className="image-urlLabel">This page</span>
            <input readOnly="true" className="image-urlInput" type="text" onClick={this.copyText} value={window.location}/>
          </li>
          <li>
            <span className="image-urlLabel">Image</span>
            <input readOnly="true" className="image-urlInput" type="text" onClick={this.copyText} value={img.url}/>
          </li>
        </ul>
        <h3>Forum codes (phpBB)</h3>
        <ul className="image-urlList">
          <li>
            <span className="image-urlLabel">Thumb</span>
            <input readOnly="true" className="image-urlInput" type="text" onClick={this.copyText} value={`[url=${window.location}][img]${img.thumb_url}[/img][/url]`}/>
          </li>
          <li>
            <span className="image-urlLabel">Medium</span>
            <input readOnly="true" className="image-urlInput" type="text" onClick={this.copyText} value={`[url=${window.location}][img]${img.small_url}[/img][/url]`}/>
          </li>
          <li>
            <span className="image-urlLabel">Large</span>
            <input readOnly="true" className="image-urlInput" type="text" onClick={this.copyText} value={`[url=${window.location}][img]${img.url}[/img][/url]`}/>
          </li>
        </ul>
      </div>
    );
  }

  copyText(event) {
    event.target.select();
    document.execCommand('copy');
  }
}

export default Image;

