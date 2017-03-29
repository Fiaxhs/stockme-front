import React, { Component } from 'react';
import Nl2br from './Nl2br';

class EditInPlace extends Component {

  constructor(props) {
    super(props);
    this.state = {
      editing: false
    };
    this.input = null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.editing) {
      this.input.focus();
    }
  }

  render () {
    let center;
    if (this.state.editing) {
      if (this.props.textarea) {
        center = <textarea ref={(input) => { this.input = input; }} defaultValue={this.props.text || ''}></textarea>;
      } else {
        center = <input onKeyUp={this.handleKeyUp} ref={(input) => { this.input = input; }} type="text" defaultValue={this.props.text || ''}/>;
      }
    } else {
      if (this.props.textarea) {
        center = <div>
          <Nl2br text={this.props.text || (this.props.canEdit && this.props.defaultText)} />
        </div>;
      } else {
        center = <div>{this.props.text || (this.props.canEdit && this.props.defaultText)}</div>;
      }
    }

    return (
      <div className="globalStyle-editinplace">
        {this.props.canEdit && <i onClick={this.toggleEdit} className="material-icons globalStyle-editinplacePen">{this.state.editing ? 'save' : 'mode_edit'}</i>}
        {center}
      </div>
    );
  }

  toggleEdit = () => {
    if (this.state.editing) {
      this.props.update(this.input.value);
    }
    this.setState({editing: !this.state.editing});
  }

  handleKeyUp = (event) => {
    // Enter
    if (event.keyCode && event.keyCode === 13) {
      this.toggleEdit();
    }
  }
}

export default EditInPlace;
