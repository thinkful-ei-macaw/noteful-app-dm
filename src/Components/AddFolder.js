import React from 'react';
import cuid from 'cuid';
import DataContext from '../DataContext';

import api from '../api';

class AddFolder extends React.Component {
  static contextType = DataContext;

  handleSubmit = e => {
    e.preventDefault();
    let form = e.target;
    let folder = {
      id: cuid(),
      name: form.name.value
    }

    api.addFolder(folder)
      .then(() => {
        this.context.addFolderSubmit(folder);
      });
  }

  render() {
    return (
      <form
        onSubmit={this.handleSubmit}
        onClick={e => e.stopPropagation()}>
        <h2>Add Folder</h2>
        <div>
          <label htmlFor="name">Name:</label>
          <input required autoComplete="off" type="text" name="name" id="name" placeholder="A Cool Name..."/>
        </div>
        <button>Submit</button>
      </form>
    )
  }
}

export default AddFolder;