import React from 'react';
import './App.css';
import Sidebar from './Components/Sidebar';
import Content from './Components/Content';
import Header from './Components/Header';
import Overlay from './Components/Overlay';

import api from './api';

import DataContext from './DataContext';

class App extends React.Component {
  state = {
    notes: [],
    folders: [],
    dialogOpen: false,
    addMode: ""
  }

  handleAddClick = (type="") => {
    let currentState = {
      ...this.state,
      dialogOpen: type ? true : false,
      addMode: type
    };

    this.setState(currentState);
  }

  handleAddNoteSubmit = note => {
    let currentState = { ...this.state };

    currentState.notes.push(note);
    currentState.addMode = "";
    currentState.dialogOpen = false;

    this.setState(currentState);
  }

  handleAddFolderSubmit = folder => {
    let currentState = { ...this.state };

    currentState.folders.push(folder);
    currentState.addMode = "";
    currentState.dialogOpen = false;

    this.setState(currentState);
  }

  handleDeleteNote = noteId => {
    let currentState = { ...this.state };
    let note = currentState.notes.find(n => n.id === noteId);
    let index = currentState.notes.indexOf(note);
    currentState.notes.splice(index, 1);

    this.setState(currentState);
  }

  componentDidMount() {
    api.getFolders()
      .then(data => {
        this.setState({ folders: data });
        api.getNotes()
        .then(data => {
          this.setState({ notes: data });
        })
      })
      .catch(err => {
        console.error(err);
      })
  }

  render() {
    const contextValue = {
      data: this.state,
      addClick: this.handleAddClick,
      addNoteSubmit: this.handleAddNoteSubmit,
      addFolderSubmit: this.handleAddFolderSubmit,
      deleteNote: this.handleDeleteNote
    }

    return (
      <DataContext.Provider value={contextValue}>
        <div className="app">
          <Header />
          <main>
            <Sidebar />
            <Content />
          </main>
          { this.state.dialogOpen ? (<Overlay />) : '' }
        </div>
      </DataContext.Provider>
    );
  }

}





export default App;
