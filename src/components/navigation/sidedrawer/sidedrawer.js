import React from 'react';

import Logo from '../../logo/logo';
import NavigationItems from '../navigationitems/navigationitems';
import './sidedrawer.css';
import Backdrop from '../../../ui/backdrop/backdrop';

const sidedrawer = ( props ) => {
    
    return (
        <React.Fragment>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={props.open ? "SideDrawer Open" : "SideDrawer Close"} onClick={props.closed}>
                    <div className="Logoo">
                    <Logo />
                    </div>
                <nav>
                    <NavigationItems isAuth={props.isAuth} />
                </nav>
            </div>
        </React.Fragment>
    );
};

export default sidedrawer;