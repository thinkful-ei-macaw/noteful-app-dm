import React from 'react';
import cuid from 'cuid';
import DataContext from '../DataContext';

import api from '../api';

class AddFolder extends React.Component {
  static contextType = DataContext;
  state={name:""}

  validateAddFolder = (form) => {
    let formValid = true;
    if(form.name.value===""){
      this.setState({name:"Name is required"});
      formValid = false;
    }
 

    return formValid;
  }

  

  handleSubmit = e => {
    e.preventDefault();
    let form = e.target;
    if(!this.validateAddFolder(form))return false;
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
          <input autoComplete="off" type="text" name="name" id="name" placeholder="A Cool Name..."/>
          <p>{this.state.name}</p>
        </div>
        <button>Submit</button>
      </form>
    )
  }
}

export default AddFolder;