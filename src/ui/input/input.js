import React from 'react';

import './input.css';

const input=(props)=>{
    let inputElement=null;
    const inputclass=["Inputelement"];

    if(props.invalid && props.shouldvalidate && props.touched){
        inputclass.push("Invalid");
    }

    let validationError = null;
if (props.invalid && props.touched) {
    validationError = <strong><p style={{color:'red'}}>***Please enter a valid input!</p></strong>;
}

    switch(props.elementType){
        case ('input'):
            inputElement=<input 
            className={inputclass.join(' ')}
            {...props.elementConfig} 
            value={props.value} onChange={props.changed}/>
            break;
        case ('textarea'):
            inputElement=<textarea 
            className={inputclass.join('')} 
            {...props.elementConfig} 
            value={props.value} 
            onChange={props.changed}/>
            break;
        case('select'):
            inputElement= (
               <select className={inputclass.join('')} 
               value={props.value} 
               onChange={props.changed}>
                {props.elementConfig.options.map(option=>(
                    <option key={option.value} value={option.value}>
                        {option.displayValue} </option>
                ))}
                </select>
            );
            break;
        default:
            inputElement=<input 
            className={inputclass.join('')}
            {...props.elementConfig} 
            value={props.value} 
            onChange={props.changed}/>;
    }
    return(
    <div className="Input">
        <label className="Label">{props.label}</label>
        {inputElement}
        {validationError}
    </div>
    );
};

export default input;

