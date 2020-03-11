import React from 'react';
import {Link} from 'react-router-dom';

import './Header.css';

class Header extends React.Component {
  render() {
    return (
      <header>
        <h1><Link to="/">Noteful</Link></h1>
      </header>
    )
  }
}

export default Header;