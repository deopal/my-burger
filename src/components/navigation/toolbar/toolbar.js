import React from 'react';
import './toolbar.css';
import Logo from '../../logo/logo';
import Navigationitems from '../navigationitems/navigationitems';
import DrawerToggle from '../sidedrawer/drawertoggle/drawertoggle';

const toolbar=(props)=>(
    <header className="Toolbar">
        <DrawerToggle clicked={props.drawerToggleClicked} />
        <div className="tlogo">
        <Logo/>
        </div>
        <nav className="DesktopOnly">
            <Navigationitems isAuth={props.isAuth} />
        </nav>
    </header>
);

export default toolbar;