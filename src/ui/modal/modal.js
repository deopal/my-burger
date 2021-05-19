import React from 'react';
import './modal.css';
import Backdrop from '../backdrop/backdrop';

class Modal extends React.Component {
shouldComponentUpdate(nextProps, nextState){
    return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
}

    render(){
        return(
            <React.Fragment>
     <Backdrop show={this.props.show} clicked={this.props.modalclosed}/>
    <div style={{transform : this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: this.props.show ? 1 :0}}
    className="Modal">
        {this.props.children}
    </div>
    </React.Fragment>
        )
    }
}

export default Modal;