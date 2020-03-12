import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Folder extends React.Component {
  render(){
    return (
      <li className={this.props.active ? 'active' : ''}>
        <Link to={"/folder/" + this.props.id}>{this.props.name}</Link>
      </li>
    );
  }
}

Folder.propTypes = {
  active: PropTypes.bool,
  id: PropTypes.string,
  name: PropTypes.string
}

export default Folder;