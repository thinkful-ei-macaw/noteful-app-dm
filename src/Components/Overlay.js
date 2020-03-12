import React from 'react';
import './Overlay.css';

import AddFolder from './AddFolder';
import AddNote from './AddNote';

import DataContext from '../DataContext';

class Overlay extends React.Component {
  static contextType = DataContext;

  render() {
    return (
      <div className="overlay" onClick={() => this.context.addClick()}>
        {this.context.data.addMode === 'folder' ? (
          <AddFolder />
        ) : (
          <AddNote />
        )}
      </div>
    )
  }
}

export default Overlay;