import React from 'react';

import './order.css';

const order =(props)=>{
    const ingredients=[];

    for(let ingre in props.ingredients){
        ingredients.push({
            name:ingre,
            amount:props.ingredients[ingre]
        }
        );
    }

    const ingreoutput=ingredients.map(ig=>{
        return ( <span 
        key={ig.name}
        className="ingre"> 
            {ig.name} ({ig.amount}) 
        </span> );
    })

    return (
    <div className="Order">
        <p>Ingredients: {ingreoutput} </p>
        <p>Price: <strong>$ {Number.parseFloat(props.price).toFixed(2)}</strong></p>
    </div>
    );
};



export default order;