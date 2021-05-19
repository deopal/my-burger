import React from 'react';
import './buildcontrols.css';
import Buildcontrol from './buildcontrol/buildcontrol.js';

const controls=[
    {label:'Salad' , type:'salad'},
    {label:'Bacon' , type:'bacon'},
    {label:'Cheese' ,type:'cheese'},
    {label:'Meat' ,  type:'meat'}
];

const buildcontrols=(props)=>{
    return (
    <div className="BuildControls">
        <p>Current price : <strong>$ {props.totalprice.toFixed(2)}</strong></p>
        {controls.map(ctrl=>(
            <Buildcontrol key={ctrl.label} label={ctrl.label} added={()=>props.ingredientadded(ctrl.type)} 
            removed={()=>props.ingredientremoved(ctrl.type)}
            disable={props.disabled[ctrl.type]}/>
        )
        )}
        
        <button onClick={props.ordered} className="OrderButton" disabled={!props.purchasable}>{props.isAuth ? 'ORDER NOW' : 'SIGN IN TO ORDER' }</button>
    </div>
    );
}

export default buildcontrols;
