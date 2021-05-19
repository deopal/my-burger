import React ,{Component} from 'react';
import './layout.css';
import Toolbar from '../navigation/toolbar/toolbar';
import Sidedrawer from '../navigation/sidedrawer/sidedrawer';
import {connect} from 'react-redux';


class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState( { showSideDrawer: false } );
    }

    sideDrawerToggleHandler = () => {
        this.setState( ( prevState ) => {
            return { showSideDrawer: !prevState.showSideDrawer };
        } );
    }

    render () {
        return (
            <React.Fragment>
                <Toolbar 
                isAuth={this.props.isAuth}
                drawerToggleClicked={this.sideDrawerToggleHandler} />
                <Sidedrawer
                    isAuth={this.props.isAuth}
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler} />
                <main className="Content">
                    {this.props.children}
                </main>
                </React.Fragment>
        )
    }
}

const mapStateToProps =state =>{
    return{
        isAuth:state.auth.token!==null
    }
}

export default connect(mapStateToProps)(Layout);
