import React from 'react';
import './Overlay.css';

import FolderForm from './FolderForm';
import NoteForm from './NoteForm';

import DataContext from '../DataContext';

class Overlay extends React.Component {
  static contextType = DataContext;

  render() {
    return (
      <div className="overlay" onClick={() => this.context.addClick()}>
        {this.context.data.addMode === 'folder' ? (
          <FolderForm />
        ) : (
          <NoteForm />
        )}
      </div>
    )
  }
}

export default Overlay;