import React from 'react';
import './logo.css';
import logoimg from '../../assets/images/burger-logo.png';

const logo=(props)=>(
    <div className="Logo" >
        <img src={logoimg} alt="Burger-King" />
    </div>
);

export default logo;