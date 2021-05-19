import React from 'react';
import Button from '../../../ui/button/button';

const ordersummary=(props)=>{
    const summary=Object.keys(props.ingredients).map(
        igkey=>{
            return (
                <li key={igkey}>
                    <span style={{textTransform:'capitalize'}}>{igkey}: </span> {props.ingredients[igkey]}
                </li>
            );
        }
    );

return (
    <React.Fragment>
        <p>Your order</p>
        <p>A delicious burger with following ingredients:</p>
        <ul>
            {summary}
        </ul>
        <p><strong>TOTAL PRICE: $ {props.price}</strong></p>
        <p>Continue to checkout?</p>
        <Button btntype="Danger" clicked={props.cancelpurchase}>CANCEL</Button>
        <Button btntype="Success" clicked={props.confirmpurchase}>CONTINUE</Button>
    </React.Fragment>
);
}

export default ordersummary;