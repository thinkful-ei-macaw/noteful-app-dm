import React from 'react';
import DataContext from '../DataContext';

class SelectedFolder extends React.Component {
  static contextType = DataContext;

  render() {
    let note = this.context.data.notes.find(n => n.id === this.props.match.params.id) || {};
    let folder = this.context.data.folders.find(f => f.id === note.folderId) || {};

    return (
      <article>
        <button onClick={() => this.props.history.goBack()}>Go Back</button>
        <h3>{folder.name}</h3>
      </article>
    )
  }
}

export default SelectedFolder;