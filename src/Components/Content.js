import React from 'react';
import NoteList from './NoteList'
import {Route, Switch} from 'react-router-dom';

import './Content.css';

class Content extends React.Component {
  render() {
    return (
      <section className='content'>            
        <Switch>
          <Route path="/note/:id" component={props => (
            <NoteList {...props} view="note"/>
          )}/>

          <Route path="/folder/:id" component={props => (
            <NoteList {...props} view="folder"/>
          )} />

          <Route component={NoteList} />
        </Switch>
      </section>
    )
  }
}

export default Content;