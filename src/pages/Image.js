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
    let img = null;
    if (this.state.image) {
      img = <img className="image-image" src={this.state.image.small_url} alt={this.state.image.title} />
    }
    return (
      <div className="image">
        <div className="image-container">
          {img}
        </div>
      </div>
    );
  }
}

export default Image;
