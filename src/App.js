import React from 'react';
import './App.css';
import Sidebar from './Components/Sidebar';
import Content from './Components/Content';
import Header from './Components/Header';
import Overlay from './Components/Overlay';
import ErrorBoundary from './Components/ErrorBoundary';

import DataContext from './DataContext';
import api from './api';

class App extends React.Component {
  state = {
    notes: [],
    folders: [],
    dialogOpen: false,
    addMode: "",
    error: null
  }

  handleAddClick = (type='') => {
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

  componentWillMount() {
    api.getFolders()
      .then(data => {
        this.setState({ folders: data });
        api.getNotes()
        .then(data => {
          this.setState({ notes: data });
        })
      })
      .catch(err => {
        this.setState({
          error: err
        })
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
          <ErrorBoundary appError={this.state.error}>
            <Header />
            <main>
              <Sidebar />
              <Content />
            </main>
            { this.state.dialogOpen ? (<Overlay />) : '' }
          </ErrorBoundary>
        </div>
      </DataContext.Provider>
    );
  }

}

export default App;
