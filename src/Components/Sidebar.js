import React from 'react';
import {Route, Switch} from 'react-router-dom';

import FolderList from './FolderList';
import SelectedFolder from './SelectedFolder';

import './Sidebar.css';

class Sidebar extends React.Component {

    render() {
        return (
            <section className='sidebar'>
                <Switch>
                    <Route path="/note/:id" component={props => (
                        <SelectedFolder {...props}/>
                    )}/>

                    <Route path="/folder/:id" component={props => (
                        <FolderList {...props}/>
                    )} />

                    <Route component={props => (
                        <FolderList {...props}/>
                    )} />
                </Switch>
            </section>
        )
    }
}

export default Sidebar;