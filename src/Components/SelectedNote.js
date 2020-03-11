import React from 'react';

class SelectedNote extends React.Component {
  render() {
    return (
      <article><p>{this.props.content}</p></article>
    )
  }
}

export default SelectedNote;