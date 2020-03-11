import React from 'react';
import NoteList from './NoteList'
import {Route, Switch} from 'react-router-dom';

import './Content.css';

class Content extends React.Component {
  render() {
    return (
      <section className='content'>            
        <Switch>
          <Route path="/note/:id" render={props => (
            <NoteList {...props} view="note" />
          )}/>

          <Route path="/folder/:id" render={props => (
            <NoteList {...props} view="folder"/>
          )} />

          <Route render={props => (
            <NoteList {...props}/>
          )} />
        </Switch>
      </section>
    )
  }
}

export default Content;