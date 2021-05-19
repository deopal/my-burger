import React from 'react';
import './navigationitems.css';
import Navigationitem from './navigationitem/navigationitem';

const navigationitems=(props)=>(
    <ul className="Navigationitems">
        <Navigationitem link="/" exact>Burger builder</Navigationitem>
        {props.isAuth ? <Navigationitem link="/orders">My orders</Navigationitem> : null}

        {!props.isAuth ? 
        <Navigationitem link="/auth">SIGN IN</Navigationitem> :
        <Navigationitem link="/logout">Logout</Navigationitem> }

    </ul>
);

export default navigationitems;