import React from 'react';
import cuid from 'cuid';
import DataContext from '../DataContext';

import api from '../api';

class AddNote extends React.Component {
  static contextType = DataContext;
  state = {
    name: {
      value: '',
      touched: false
    },
    content: {
      value: '',
      touched: false
    },
    folderId: {
      value: '',
      touched: false
    },

    hasErrors(){
      let err = false;
      let touchCount = 0;
      let fieldCount = 0;
      Object.keys(this).forEach(key => {
        if (key === 'hasErrors') return false;
        touchCount += this[key].touched ? 1 : 0;
        fieldCount += 1;
        if (this[key].error && this[key].touched) err = true;
      });

      if (fieldCount > touchCount) err = true;

      return touchCount > 0 ? err : true;
    }
  }

  validate = e => {
    let input = e.target;
    this.setState({
      [input.name]: {
        value: input.value.trim(),
        touched: true,
        error: input.value.trim() === '' ? 'This field is required.' : null
      },
    });
  }
  
  handleSubmit = e => {
    e.preventDefault();
    let form = e.target;
    let note ={
      id: cuid(),
      name: form.name.value,
      modified: new Date().toISOString(),
      folderId: form.folderId.value,
      content: form.content.value
    }

    api.addNote(note)
      .then(() => {
        this.context.addNoteSubmit(note);
      });
  }

  render() {
    return (
      <form
        onChange={this.validate}
        onSubmit={this.handleSubmit}
        onClick={e => e.stopPropagation()}>
        <h2>Add Note</h2>
        <div>
          <label htmlFor="name">
            Name:
            <span>{this.state.name.error}</span>
          </label>
          <input autoComplete="off" type="text" name="name" id="name" placeholder="A Cool Name..."/>
        </div>
        <div>
          <label htmlFor="content">
            Content:
            <span>{this.state.content.error}</span>
          </label>
          <textarea name="content" id="content" placeholder="Your content goes here." cols="300" rows="4"></textarea>
        </div>
        <div>
          <label htmlFor="folderId">
            Folder:
            <span>{this.state.folderId.error}</span>
          </label>
          <select id="folderId" name="folderId">
            <option value="">Select a folder</option>
            {
              this.context.data.folders.map(folder => (
                <option key={folder.id} value={folder.id}>{folder.name}</option>
              ))
            }
          </select>
        </div>
        <button disabled={this.state.hasErrors()}>Submit</button>
      </form>
    )
  }
}

export default AddNote;