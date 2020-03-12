import React from 'react';
import {Route, Switch} from 'react-router-dom';
import cuid from 'cuid';
import DataContext from '../DataContext';

import api from '../api';

class AddNote extends React.Component {
  static contextType = DataContext;
  state={name:"",content:"",folderId:""};

  validateAddNote = (form) => {
    let formValid = true;
    if(form.name.value===""){
      this.setState({name:"Name is required"});
      formValid = false;
    }
    if(form.content.value===""){
      this.setState({content:"Write something"});
      formValid = false;
    }
    if(form.folderId.value===""){
      this.setState({folderId:"Select a folder"});
      formValid = false;
    }

    return formValid;
  }

  

  handleSubmit = e => {
    e.preventDefault();
    let form = e.target;
    if(!this.validateAddNote(form))return false;
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
        onSubmit={this.handleSubmit}
        onClick={e => e.stopPropagation()}>
        <h2>Add Note</h2>
        <div>
          <label htmlFor="name">Name:</label>
          <input autoComplete="off" type="text" name="name" id="name" placeholder="A Cool Name..."/>
          <p>{this.state.name}</p>
        </div>
        <div>
          <label htmlFor="content">Content:</label>
          <textarea name="content" id="content" placeholder="Your content goes here." cols="300" rows="4"></textarea>
          <p>{this.state.content}</p>
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
              <select id="folderId" name="folderId">
                <option value="">Select a folder</option>
                {
                  this.context.data.folders.map(folder => (
                    <option key={folder.id} value={folder.id}>{folder.name}</option>
                  ))
                }
              </select>
            )}/>
          </Switch>
          <p>{this.state.folderId}</p>
        </div>
        <button>Submit</button>
      </form>
    )
  }
}

export default AddNote;