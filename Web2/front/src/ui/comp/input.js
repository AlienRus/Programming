import React from 'react';
import '../../css/input.css'

const Input = (props) => {

    return (
            <input value={props.value} placeholder={props.text} type={props.type} onChange={props.onChange}/>
    );
};

export default Input;