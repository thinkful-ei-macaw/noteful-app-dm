import React from 'react';
import Note from './Note'
import SelectedNote from './SelectedNote';
import DataContext from '../DataContext';

import api from '../api';

class NoteList extends React.Component {
  static contextType = DataContext;

  handleDelete = id => {

    api.deleteNote(id)
      .then(() => {

        if (this.props.view === 'note') {
          this.props.history.goBack();
        }
    
        this.context.deleteNote(id);

      });
  }
    
  render() {
    const id = this.props.match.params.id || null;
    let notes = this.context.data.notes;
    let noteContent = "";

    if (id) {
      if (this.props.view === 'folder') {
        notes = this.context.data.notes.filter(note => note.folderId === id)
      } else {
        let n = this.context.data.notes.filter(note => note.id === id);
        notes = n;
        noteContent = n.length ? n[0].content : '';
      }
    }
    

    let noteComponents = notes.map(note => (
      <Note
        key={note.id}
        id={note.id}
        name={note.name}
        modified={note.modified}
        onDelete={this.handleDelete}/>
    ))

    return (
      <ul>
        {noteComponents}
        {this.props.view !== "note" ? (
          <li className="add"><button onClick={() => this.context.addClick('note')}>Add Note</button></li>
        ) : (
          <SelectedNote content={noteContent} />
        )}
      </ul>
        
    )
  }
}

export default NoteList;