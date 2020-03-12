import React from 'react';
import {Route, Switch} from 'react-router-dom';
import cuid from 'cuid';
import DataContext from '../DataContext';

import api from '../api';

class AddNote extends React.Component {
  static contextType = DataContext;

  handleSubmit = e => {
    e.preventDefault();
    let form = e.target;
    let note = {
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
        onSubmit={this.handleSubmit}
        onClick={e => e.stopPropagation()}>
        <h2>Add Note</h2>
        <div>
          <label htmlFor="name">Name:</label>
          <input required autoComplete="off" type="text" name="name" id="name" placeholder="A Cool Name..."/>
        </div>
        <div>
          <label htmlFor="content">Content:</label>
          <textarea required name="content" id="content" placeholder="Your content goes here." cols="300" rows="4"></textarea>
        </div>
        <div>
          <label htmlFor="folderId">Folder:</label>
          <Switch>
            <Route exact path="/folder/:id" render={props => {
              const id = props.match.params.id;
              return (
                <select disabled id="folderId" name="folderId" value={id}>
                  <option value={id}>{
                    this.context.data.folders.find(folder => folder.id === id).name
                  }</option>
                </select>
              )
            }}/>
            <Route render={() => (
              <select id="folderId" required name="folderId">
                <option value="">Select a folder</option>
                {
                  this.context.data.folders.map(folder => (
                    <option key={folder.id} value={folder.id}>{folder.name}</option>
                  ))
                }
              </select>
            )}/>
          </Switch>
        </div>
        <button>Submit</button>
      </form>
    )
  }
}

export default AddNote;