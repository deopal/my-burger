import React from 'react';

import Burger from '../../burger/burger';
import Button from '../../../ui/button/button';
import './CheckoutSummary.css';

const CheckoutSummary=(props)=>{
    return(
        <div className="CheckoutSummary">
            <h1>We hope it tastes well!</h1>
            <div
                style={{width:'100%',height:'100%',margin:'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button clicked={props.checkoutcancel} btnType="Danger">CANCEL</Button>
            <Button clicked={props.checkoutcontinue} btnType="succes">CONTINUE</Button>
        </div>
    );
};
export default CheckoutSummary;