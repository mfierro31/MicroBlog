import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavCard.css';

const NavCard = () => {
  return (
    <div className="card bg-light text-left py-5 mb-5">
      <div className="card-body">
        <h3 className="display-3">Microblog</h3>
        <p className="lead">Get in the Rithm of blogging!</p>
        <NavLink activeClassName="NavCard-link-active" exact to="/">Blog</NavLink>
        <NavLink activeClassName="NavCard-link-active" exact to="/new">Add a new post</NavLink>
      </div>
    </div>
  )
}

export default NavCard;