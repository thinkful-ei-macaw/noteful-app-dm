import React from 'react';
import PropTypes from 'prop-types';

class SelectedNote extends React.Component {
  render() {
    return (
      <article><p>{this.props.content}</p></article>
    )
  }
}

SelectedNote.propTypes = {
  content: PropTypes.string
}

export default SelectedNote;