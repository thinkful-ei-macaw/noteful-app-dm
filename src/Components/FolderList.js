import React from 'react';
import Folder from './Folder';

import DataContext from '../DataContext';

class FolderList extends React.Component {
  static contextType = DataContext;

  render() {

    const id = this.props.match.params.id || null;

    const folders = this.context.data.folders.map(folder => (
      <Folder key={folder.id} id={folder.id} active={folder.id === id} name={folder.name} />
    ))

    return (
      <ul>
        {folders}
        <li><button onClick={() => this.context.addClick('folder')}>Add Folder</button></li>
      </ul>
    )
  }
}

export default FolderList;