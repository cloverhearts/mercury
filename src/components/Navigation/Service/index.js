import React from 'react';
import {NavLink} from 'react-router-dom';

export default (props) => {
  return (
    <div>
      <NavLink to="/" exact activeClassName="active">
        Home
      </NavLink>
      <NavLink to="/informations" activeClassName="active">
        Informations
      </NavLink>
    </div>
  );
}
