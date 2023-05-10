import React from 'react';
import "../../css/button.css"

const Button = (props) => {
    return (
        <button onClick={props.func} className="custom-btn btn-8">{props.text}</button>
    );
};

export default Button;