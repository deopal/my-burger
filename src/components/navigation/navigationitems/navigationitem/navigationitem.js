import React from 'react';
import './navigationitem.css';
import {NavLink} from 'react-router-dom';

const navigationitem=(props)=>(
    <li className="Navigationitem">
        <NavLink 
        to={props.link}
        exact={props.exact}
        activeClassName="active">{props.children}</NavLink>
    </li>
);

export default navigationitem;