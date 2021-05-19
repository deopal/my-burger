import React from 'react';
import './buildcontrol.css';

const buildcontrol =(props)=>{
    return (
    <div className="BuildControl">
        <div className="Label">{props.label}</div>
        <button disabled={props.disable} onClick={props.removed} className="Less">Remove</button>
        <button onClick={props.added} className="More">Add</button>

    </div>
    );
};

export default buildcontrol;